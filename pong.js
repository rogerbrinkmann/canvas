class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class GameObject {
    constructor(x = 0, y = 0) {
        this.startPos = new Vec(x, y);
        this.pos = new Vec(x, y);
        this.vel = new Vec(0, 0);
        this.size = new Vec(20, 100);
    }

    get right() {
        return this.pos.x + this.size.x / 2;
    }

    get left() {
        return this.pos.x - this.size.x / 2;
    }
    get top() {
        return this.pos.y - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y / 2;
    }

    reset() {
        this.vel.x = 0;
        this.vel.y = 0;
        this.pos.x = this.startPos.x;
        this.pos.y = this.startPos.y;
    }
}

class Ball extends GameObject {
    constructor(x = 0, y = 0) {
        super(x, y);
        this.radius = 10;
        this.size = new Vec(20, 20)
        this.startVel = 500;
    }

    update(dt, canvas) {
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        if (this.vel.y < 0 && this.top < 0) {
            this.pos.y = this.size.y / 2;
            this.vel.y = -this.vel.y;
        }
        if (this.vel.y > 0 && this.bottom > canvas.height) {
            this.pos.y = canvas.height - this.size.y / 2;
            this.vel.y = -this.vel.y;
        }
    }

    draw(context) {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

class Player extends GameObject {
    constructor(x = 0, y = 0) {
        super(x, y);
        this.speed = 200;
        this.score = 0;
    }

    update(dt) {
        this.pos.y += this.vel.y * dt;
    }

    draw(context) {
        context.fillStyle = '#ffffff';
        context.fillRect(this.left, this.top, this.size.x, this.size.y);
    }

    moveUp() {
        this.vel.y = -this.speed;
    }

    moveDown() {
        this.vel.y = this.speed;
    }

    stop() {
        this.vel.y = 0;
    }
}

class Game {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d');
        this._setCanvasFullScreen();

        this.ball = new Ball(this._canvas.width / 2, this._canvas.height / 2);
        this.players = [
            new Player(40, this._canvas.height / 2),
            new Player(this._canvas.width - 40, this._canvas.height / 2)
        ]


        let lastTime = null;
        this._frameCallback = (millis) => {
            if (lastTime !== null) {
                const diff = millis - lastTime;
                this.update(diff / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(this._frameCallback);
        };
    }

    clear() {
        this._context.fillStyle = '#000000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    draw() {
        this.clear();
        this.players.forEach(player => {
            player.draw(this._context);
        })
        this.ball.draw(this._context);
    }

    update(dt) {
        this.ball.update(dt, this._canvas);
        this.players.forEach(player => {
            player.update(dt);

        })
        this.collision(this.players[0], this.players[1], this.ball);
        this.checkGoal();
        this.draw();
    }

    start() {
        requestAnimationFrame(this._frameCallback);
    }

    reset() {
        this.players.forEach(player => {
            player.reset();
        })
        this.ball.reset();
    }

    play() {
        this.ball.vel.x = this.ball.startVel * (Math.random() - 0.5) * 2;
        this.ball.vel.y = this.ball.startVel * (Math.random() - 0.5) * 0.5;
    }

    collision(leftPlayer, rightPlayer, ball) {
        if (ball.vel.x > 0 &&
            ball.right > rightPlayer.left &&
            ball.top > rightPlayer.top &&
            ball.bottom < rightPlayer.bottom) {
            ball.pos.x = rightPlayer.left - ball.size.x / 2;
            ball.vel.x = -ball.vel.x * 1.1;
            ball.vel.y += rightPlayer.vel.y;
        }
        if (ball.vel.x < 0 &&
            ball.left < leftPlayer.right &&
            ball.top > leftPlayer.top &&
            ball.bottom < leftPlayer.bottom) {
            ball.pos.x = leftPlayer.right + ball.size.x / 2;
            ball.vel.x = -ball.vel.x * 1.1;
            ball.vel.y += leftPlayer.vel.y;
        }
    }

    checkGoal() {
        if (this.ball.left < 0) {
            this.players[1].score++;
            document.getElementById("right").innerHTML = this.players[1].score.toString();
            this.reset();
        }
        if (this.ball.right > this._canvas.width) {
            this.players[0].score++;
            document.getElementById("left").innerHTML = this.players[0].score.toString();
            this.reset();
        }

    }

    controlls(e) {
        if (e.type == 'keydown') {
            if (e.code == 'KeyQ') {
                this.players[0].moveUp();
            }
            if (e.code == 'KeyA') {
                this.players[0].moveDown();
            }
            if (e.code == 'KeyP') {
                this.players[1].moveUp();
            }
            if (e.code == 'KeyL') {
                this.players[1].moveDown();
            }
            if (e.code == 'Space') {
                this.play();
            }
        }
        else if (e.type == 'keyup') {
            if ((e.code == 'KeyQ') || (e.code == 'KeyA')) {
                this.players[0].stop();
            }
            if ((e.code == 'KeyP') || (e.code == 'KeyL')) {
                this.players[1].stop();
            }
        }
    }

    _setCanvasFullScreen() {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        document.getElementById("left").style = "left:" + (this._canvas.width / 2 - 50).toString() + "px";
        document.getElementById("center").style = "left:" + (this._canvas.width / 2).toString() + "px";
        document.getElementById("right").style = "left:" + (this._canvas.width / 2 + 40).toString() + "px";
    }
}

// get canvas element from html page by id
const canvas = document.getElementById('pong');

// instantiate pong game
const pong = new Game(canvas);
pong.start();

// register events
window.addEventListener('resize', () => pong._setCanvasFullScreen());
window.addEventListener('keydown', (e) => pong.controlls(e));
window.addEventListener('keyup', (e) => pong.controlls(e));


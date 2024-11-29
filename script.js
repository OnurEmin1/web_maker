// Kreiraj efekat snega na stranici
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function Snowflake(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.direction = Math.random() * 2 * Math.PI;
    this.xSpeed = Math.sin(this.direction) * this.speed;
    this.ySpeed = Math.cos(this.direction) * this.speed;

    this.update = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
    };
}

function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        let radius = Math.random() * 4 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speed = Math.random() * 2 + 0.2;
        snowflakes.push(new Snowflake(x, y, radius, speed));
    }
}

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animateSnow);
}

createSnowflakes();
animateSnow();

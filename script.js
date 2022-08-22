const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let items = [];

let randomNum = (max, min) => {return Math.floor(Math.random() * (max - min + 1)) + min};

let ground = {
    x: 0,
    y: canvas.height-100,
    width: canvas.width,
    height: 2
};

class Item {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.yVelocity = 1;
    }
    move(){
        this.y += this.yVelocity;
    }
    draw(){
        c.fillStyle = "red";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

function update(){
    refrech();
    for (let i = 0; i < items.length; i++) {
        items[i].move();
        items[i].draw();
    }
    c.fillStyle = "black";
    c.fillRect(ground.x, ground.y, ground.width, ground.height);

    requestAnimationFrame(update);
}
update();

function start(){
    for (let i = 0; i < 3; i++) {
        items.push(new Item(randomNum(0, canvas.width), randomNum(0, -canvas.height), randomNum(30, 100), randomNum(30, 100)));
    }
}
start();
setInterval(start, 2000);

function refrech(){
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let startPos = 0;

let items = [];

let randomNum = (max, min) => {return Math.floor(Math.random() * (max - min + 1)) + min};

let ground = {
    x: 0,
    y: canvas.height-100,
    width: canvas.width,
    height: 2
};
let mouse = {
    x: 0,
    y: 0
};

class Item {
    constructor(x, y, width, height, angel){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.yVelocity = 1;

        this.angel = angel;
        this.mass = this.width;
        this.gravity = 0.05;
        this.dy = Math.sin(angel) * 3;
        this.elasticity = 0.25 * (75/this.width);

    }
    move(){
        if(this.y +this.gravity < ground.y){
            this.dy += this.gravity;
        }
        this.y += this.dy;

        // if(this.yVelocity < 2){
        //     this.yVelocity += 1 * this.gravityScale;
        // }
        // this.y += this.yVelocity * this.gravityScale;

        if(this.y + this.height >= ground.y){
            this.dy *= -1; 
            this.dy = (this.dy * this.elasticity);

            this.y = ground.y - this.height;
        }
        
        
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
    checkCollisions(items);

    c.fillStyle = "black";
    c.fillRect(ground.x, ground.y, ground.width, ground.height);

    requestAnimationFrame(update);
}
update();


function start(){
    startPos -= 200;
    for (let i = 0; i < 20; i++) {
        items.push(new Item(randomNum(0, canvas.width), startPos, randomNum(30, 100), randomNum(30, 100), -80));
    }
    
}

for (let i = 0; i < 5; i++) {
    start();    
}
// setInterval(start, 1000);

function refrech(){
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function checkCollisions(arr){
    for(let i = 0; i < arr.length; i++){
        for(let z = i+1; z < arr.length; z++){
            //x touching:
            if(arr[i].x + arr[i].width >= arr[z].x && arr[i].x <= arr[z].x + arr[z].width){
                //y touching:
                if(arr[i].y + arr[i].height >= arr[z].y && arr[i].y <= arr[z].y + arr[z].height){
                    // arr[z].yVelocity *= -1
                    // arr[z].y = arr[i].y - arr[z].height;

                    // arr[z].y = canvas.height - ground.y - arr[z].height;
                    arr[z].dy *= -1; 
                    arr[z].dy = (arr[z].dy * arr[z].elasticity);
                    arr[z].y = arr[i].y - arr[z].height;

                    if(arr[i].y + arr[i].height >= arr[z].y){
                        
                        arr[z].dy = (arr[z].dy * arr[z].elasticity/10);
                    }

                }
            }
            
        }
    }
    
}
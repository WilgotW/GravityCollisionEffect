const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const src = document.querySelector('body');
let clientX;
let clientY;

let startPos = 0;
let isHoldingDown = false;
let color = 0;
let hsl = 'hsl('+color+',100%,50%)';

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
        this.color = hsl;
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
        c.fillStyle = this.color;
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
    mouseHandler();
    c.fillStyle = "black";
    c.fillRect(ground.x, ground.y, ground.width, ground.height);

    color++;
    hsl = 'hsl('+color+',100%,50%)';

    console.log(clientX);
    console.log(clientY);

    requestAnimationFrame(update);
}
update();


function start(){
    startPos -= 200;
    for (let i = 0; i < 1; i++) {
        items.push(new Item(randomNum(0, canvas.width), startPos, 100, 100, -80));
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
function mouseHandler(){
    console.log(isHoldingDown);
    if(isHoldingDown){

        

        for (let i = 0; i < items.length; i++) {
            //X touching
            if(items[i].x + items[i].width >= mouse.x && items[i].x <= mouse.x){
                //Y touching
                if(items[i].y + items[i].height >= mouse.y && items[i].y <= mouse.y){
                    
                    holdingObject = items[i];

                    items[i].y = mouse.y - items[i].height/2;
                    items[i].x = mouse.x - items[i].width/2;
                    if(items[i].xVelocity == 1){
                        items[i].x = mouse.x - items[i].width/2;
                    }
                    items[i].dy = 0;
                    
                }
            }
        }

        for (let i = 0; i < items.length; i++) {
            if(holdingObject != null && holdingObject != items[i]){
                if(items[i].y + items[i].height >= holdingObject.y && items[i].y <= holdingObject.y + holdingObject.height){
                    if(items[i] != holdingObject){
                        if(holdingObject.x < items[i].x + items[i].width && holdingObject.x > items[i].x + items[i].width/3){
                            items[i].x = holdingObject.x - items[i].width;
                        }
                        if(holdingObject.x + holdingObject.width > items[i].x && holdingObject.x < items[i].x + items[i].width/3){
                            items[i].x = holdingObject.x + holdingObject.width;
                        }
    
                        
                    }
                    
                }
                
                
                
                // if(holdingObject.x + holdingObject.width > items[i].x && holdingObject.x < items[i].x + items[i].width){
                //     if(holdingObject.y + holdingObject.height + 10 > items[i].y){
                //         holdingObject.y = items[i].y - holdingObject.height;
                //         isHoldingDown = false;
                //         holdingObject = null;
                //         cooldown = true;
                //         setTimeout(function(){
                //             cooldown = false;
                //         }, 2000);
                //     }
    
                // }
                
            }
            
        }

    }else{
        holdingObject = null;
    }
}
let cooldown = false;

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
if(!cooldown){
    window.addEventListener('mousedown', function(e){
        isHoldingDown = true;
    });
    window.addEventListener('mouseup', function(e){
        isHoldingDown = false;
    });

    // window.addEventListener('touchstart', function(e){
    //     isHoldingDown = true;
    // });
    // window.addEventListener('touchend', function(e){
    //     isHoldingDown = false;
    // });
}




src.addEventListener('touchmove', (e) => {
    isHoldingDown = true;
    // Cache the client X/Y coordinates
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;

    mouse.x = clientX;
    mouse.y = clientY;
}, false);

window.addEventListener('touchend', function(e){
        isHoldingDown = false;
});

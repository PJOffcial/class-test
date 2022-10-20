var canvas = document.getElementById("canvas1");
var draw = canvas.getContext("2d");
console.log(draw);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particlesArray = [];
let hue = 0;

// window.addEventListener("resize", function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     draw.fillStyle = "white";
//     draw.fillRect(50, 20, 70, 70);
// });

// draw.fillStyle = "white";
// draw.fillRect(50, 20, 70, 70);

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCircle();
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("click", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle();
    for(let i = 0; i<5;i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle();
    for(let i = 0; i<2;i++){
        particlesArray.push(new Particle());
    }
});

// function drawCircle(){
//     draw.fillStyle = "cyan";
//     draw.strokeStyle = "yellow";
//     draw.lineWidth = 8;
//     draw.beginPath();
//     draw.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
//     draw.fill();
//     draw.stroke();
// }

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 7 + 1;
        this.speedX = Math.random() * 9 - 1.5;
        //this.speedY = Math.random() * 3 - 1.5;
        this.speedY = 3;
        this.color = "hsl(" + hue + ", 90%, 50%)";
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.3) this.size -= 0.01;
    }
    draw(){
        draw.fillStyle = this.color;
        draw.lineWidth = 0.5;
        draw.strokeStyle = "black";
        draw.beginPath();
        draw.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        draw.fill();
        //draw.stroke();
    }
}

// function init(){
//     for(let i = 0; i<200; i++){
//         particlesArray.push(new Particle());
//     }
// }
// init();

function handleParticles(){
    for(let i = 0; i<particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for(let j = i; j<particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 70){
                draw.beginPath();
                draw.strokeStyle = particlesArray[i].color;
                draw.lineWidth = 0.2;
                draw.moveTo(particlesArray[i].x, particlesArray[i].y);
                draw.lineTo(particlesArray[j].x, particlesArray[j].y);
                draw.stroke();
                draw.closePath();
            }
        }
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    draw.clearRect(0, 0, canvas.width, canvas.height);
    //draw.fillStyle = "rgba(0,0,0, 0.05)"
    //draw.fillRect(0, 0, canvas.width, canvas.height);
    //drawCircle();
    handleParticles();
    hue+=0.5;
    requestAnimationFrame(animate);
}
animate();



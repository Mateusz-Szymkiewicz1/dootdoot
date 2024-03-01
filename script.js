var c = document.querySelector('canvas')

let ilosc_kropek = window.prompt("Podaj liczbę kropek:","");
let dots = [];
while(dots.length < ilosc_kropek){
    let obj = { 
        x: Math.floor(Math.random() * (c.width)) + 1,
        y: Math.floor(Math.random() * (c.height)) + 1
    }
    if(dots.find(({ x,y }) => x == obj.x && y == obj.y)){
        continue;
    }
    dots[dots.length] = obj; 
}

var ctx = c.getContext("2d");

let a = dots[Math.floor(Math.random() * dots.length)];
let b = dots[Math.floor(Math.random() * dots.length)];
a.a = true;
b.b = true;

dots.forEach(el => {
    ctx.strokeStyle = "Purple";
    console.log(el)
    if(el.a || el.b){
        ctx.strokeStyle = "Green";
    }
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x, el.y+1);
    ctx.stroke();
})

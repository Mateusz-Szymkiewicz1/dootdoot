const c = document.querySelector('canvas')
const ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "10px serif";

let ilosc_kropek = window.prompt("Podaj liczbę kropek:","");
let dots = [];

while(dots.length < ilosc_kropek){ // Losowanie kropek
    let obj = { 
        x: Math.floor(Math.random() * (c.width)) + 1,
        y: Math.floor(Math.random() * (c.height)) + 1
    }
    if(dots.find(({ x,y }) => x == obj.x && y == obj.y)){
        continue;
    }
    dots[dots.length] = obj; 
}

// Losowanie punktów A i B
let a = dots[Math.floor(Math.random() * dots.length)];
let b = dots[Math.floor(Math.random() * dots.length)];
while(a.x == b.x || a.y == b.y){ // Zapobiega wybraniu tego samego punktu dla A i B
    b = dots[Math.floor(Math.random() * dots.length)];
}
a.a = true;
b.b = true;

dots.forEach(el => { // Rysowanie punktów
    ctx.strokeStyle = "Red";
    if(el.a || el.b){
        ctx.strokeStyle = "Green";
    }
    ctx.beginPath();
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x, el.y+1);
    ctx.stroke();
    ctx.closePath();
})

ctx.fillStyle = "#fff"; // Dodanie literek "A" i "B"
ctx.fillText("A", a.x, a.y)
ctx.fillText("B", b.x, b.y)

function distance(a,b){ // Zwraca dystans między dwoma punktami
   if(b && a){
    return Math.sqrt(Math.pow((b.x-a.x), 2)+Math.pow((b.y-a.y),2))
   }
}

// Pozbywa się wszystkich punktów które nie są pomiędzy A i B, które nigdy nie będą użyte
const distance_from_a_to_b = distance(a,b) 
dots = dots.filter(function(el) {
    return distance(a , el) <= distance_from_a_to_b && !el.a
}).filter(function(el) {
    return distance(b , el) <= distance_from_a_to_b
})

dots.forEach(el => { // Rysowanie punktów
    ctx.strokeStyle = "White";
    ctx.beginPath();
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x, el.y+1);
    ctx.stroke();
    ctx.closePath();
})

let current_point = { x: a.x, y: a.y}
ctx.strokeStyle = "Green";

// Wyliczanie drogi
while(current_point.x != b.x && current_point.y != b.y){
    dots.sort(function(d1, d2){
        return distance(current_point, d1)-distance(current_point, d2)
    })
    console.log([...dots])
    ctx.beginPath();
    ctx.moveTo(current_point.x, current_point.y);
    ctx.lineTo(dots[0].x, dots[0].y);
    ctx.stroke();
    ctx.closePath();
    current_point = dots[0]
    dots.shift();
}

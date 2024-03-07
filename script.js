const timer = document.querySelector('.timer')
const main = document.querySelector('.main')
const c = document.querySelector('canvas')
const ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "10px serif";

let ilosc_kropek = window.prompt("Podaj liczbę kropek:", "") || 50;
let dots = [];

const start = Date.now(); // Liczenie czasu

while (dots.length < ilosc_kropek) { // Losowanie kropek
    let obj = {
        x: Math.floor(Math.random() * (c.width-20)) + 10,
        y: Math.floor(Math.random() * (c.height-20)) + 10
    }
    if (dots.find(({x,y}) => x == obj.x && y == obj.y)) {
        continue;
    }
    dots[dots.length] = obj;
}

// Losowanie punktów A i B
const a = dots[Math.floor(Math.random() * dots.length)];
let b = dots[Math.floor(Math.random() * dots.length)];
while (a.x == b.x && a.y == b.y) { // Zapobiega wybraniu tego samego punktu dla A i B
    b = dots[Math.floor(Math.random() * dots.length)];
}
a.a = true;
b.b = true;

dots.forEach(el => { // Rysowanie punktów
    ctx.strokeStyle = "Grey";
    if (el.a || el.b) {
        ctx.strokeStyle = "Green";
    }
    ctx.beginPath();
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x, el.y + 1);
    ctx.stroke();
    ctx.closePath();
})

ctx.fillStyle = "#fff"; // Dodanie literek "A" i "B"
ctx.fillText("A", a.x, a.y)
ctx.fillText("B", b.x, b.y)

function distance(a, b) { // Zwraca dystans między dwoma punktami
    if (b && a) {
        return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2))
    }
}

// Pozbywa się wszystkich punktów oddalających od B
function delete_unused_points(point) {
    const distance_from_point_to_b = distance(point, b)
    dots = dots.filter(function (el) {
        return distance(b, el) <= distance_from_point_to_b
    })
}

const distance_from_a_to_b = distance(a, b)
delete_unused_points(a)
dots = dots.filter(function (el) {
    return distance(a, el) <= distance_from_a_to_b && !el.a
})

dots.forEach(el => { // Rysowanie możliwych do wykorzystania punktów
    ctx.strokeStyle = "Red";
    ctx.beginPath();
    ctx.moveTo(el.x, el.y);
    ctx.lineTo(el.x, el.y + 1);
    ctx.stroke();
    ctx.closePath();
})

let current_point = { x: a.x, y: a.y }
ctx.strokeStyle = "Green";

// Wyliczanie drogi
while (current_point.x != b.x || current_point.y != b.y) {
    delete_unused_points(current_point) // Pozbywamy się punktów oddalających od B
    dots.sort(function (d1, d2) { // Sortujemy wszystkie punkty od najbliższego do najdalszego
        return distance(current_point, d1) - distance(current_point, d2)
    })
    ctx.beginPath(); // Rysujemy linie do najbliższego punktu
    ctx.moveTo(current_point.x, current_point.y);
    ctx.lineTo(dots[0].x, dots[0].y);
    ctx.stroke();
    ctx.closePath();
    current_point = dots[0]
    dots.shift();
}

const end = Date.now(); // Koniec liczenia czasu
const time = (end - start) / 1000 + "s";
timer.innerText = time;


// Kod do przewijania diva myszką
let pos = { top: 0, left: 0, x: 0, y: 0 };
const mouseMoveHandler = function (e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    c.style.top = pos.top + dy + "px";
    c.style.left = pos.left + dx + "px";
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

main.addEventListener('mousedown', function (e) {
    pos = {
        left: parseInt(c.style.left.slice(0, -2)),
        top: parseInt(c.style.top.slice(0, -2)),
        x: e.clientX,
        y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

// Zmiana skali przy scrollowaniu B)
main.addEventListener('wheel', function (e) { 
    const direction = e.deltaY > 0 ? -1 : 1; 
    const current_scale = parseFloat(c.style.transform.split('(')[1].split(')')[0]);
    if(direction == 1){
        c.style.transform = `scale(${current_scale+0.1})`;
    }else if(current_scale >= 0.2){
        c.style.transform = `scale(${current_scale-0.1})`;
    }
});

// let quote = document.querySelector('.quote');

// window.addEventListener('load', function(){
//     this.setTimeout({
//         quote.style.opacity = "1";
//     }, 2000)
// })
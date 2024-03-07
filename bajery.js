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

const dialogues = [
  "me perdonas?",
  "kocham pizze :D",
  "hur hur hur hur hur",
  "ฅ^•ﻌ•^ฅ",
  "*** ******* **** ***",
  "meow",
  "El que quiera perder su tiempo",
  "salsa y picante 🌶️🌶️🌶️",
  "graj za darmo na czolgista.pl",
  "𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆 𓀇 𓀈 𓀉 𓀊 𓀋 𓀌 𓀍 𓀎 𓀏 𓀐 𓀑 𓀒 𓀓 𓀔 𓀕 𓀖 𓀗 𓀘 𓀙 𓀚 𓀛 𓀜 𓀝 𓀞 𓀟 𓀠 𓀡 𓀢 𓀣 𓀤 𓀥 𓀦 𓀧 𓀨 𓀩 𓀪 𓀫 𓀬 𓀭 𓀲 𓀳 𓀴 𓀵 𓀶 𓀷 𓀸 𓀹 𓀺 𓀻 𓀼 𓀽 𓀾 𓀿 𓁀 𓁁 𓁂 𓁃 𓁄 𓁅 𓁆 𓁇 𓁈 𓁉 𓁊 𓁋 𓁍 𓁎 𓁏 𓁐 𓁑",
  "koniec projektu, pora na runsescape B)",
  `And I always find, yeah, I always find somethin' wrong
  You been puttin' up wit' my shit just way too long
  I'm so gifted at findin' what I don't like the most`,
  "They dont know me son"
]

function hamster_say(){
  document.querySelector('.quote').style.display = 'block';
  const line = dialogues[Math.floor(Math.random() * dialogues.length)];
  document.querySelector('.quote').innerText = line;
}

setInterval(function(){
  hamster_say();
}, 1000)
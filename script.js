let ilosc_kropek = window.prompt("Podaj liczbę kropek:","");
let dots = [];
for(let i = 0;i<ilosc_kropek;i++){
    dots[i] = Math.floor(Math.random() * (1000)) + 1;
}
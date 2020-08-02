// In Zusammenarbeit mit Sade Babatunde und Sara Voigt
let order = []; // speichert zufällig generierte Töne, die PC abspielt 
let playerOrder = []; // speichert die vom Spieler geklickten Töne - wird jede Runde neu gefüllt
let flash; // speichert wie viele Töne gespielt wurden - in jeweiliger Runde
let turn; // speichert in welcher Runde wir sind
let good; // true: wenn der Spieler die richtigen Töne wiederholt - false: falsche Abfolge
let compTurn; // true: PC spielt Töne ab, false = Spieler darf Töne abspielen
let intervalId; // für spätere Funktion (setInterval)
let noise = true; // Gibt an, ob ein Ton gemacht werden soll // wahr: spielt Ton ab - falsch: spielt keinen Ton ab
let on = true; // läuft das Spiel
let win; // true: Spieler hat gewonnen - false: Spieler hat nicht gewonnen (?)
let level; // Anzahl der Töne, die zu wiederholen sind
let startPressed = 0; // wie oft wurde startbutton geklickt?
let playing = false; // ???
const turnCounter = document.querySelector("#turn"); // hier wird später reingeschrieben in welchem Spielzug der Spieler ist
const boo = document.querySelector("#boobutton"); // wir speichern alle buttons als Konstante (später für die playSampe Funktion)
const laugh = document.querySelector("#laughbutton");
const duck = document.querySelector("#duckbutton");
const boing = document.querySelector("#boingbutton");
const applause = document.querySelector("#applausebutton");
const startButton = document.querySelector("#start");
const levelOne = document.querySelector("#levelone");
const levelTwo = document.querySelector("#leveltwo");
const levelThree = document.querySelector("#levelthree");
const levelFour = document.querySelector("#levelfour");
const soundButtons = [boo, laugh, duck, boing, applause]; // eine Konstante für alle Töne (später für removeClass Funktion)
const levelButtons = [levelOne, levelTwo, levelThree, levelFour]; //  ???
function addLevelListeners(one, two, three, four) {
    one.addEventListener('click', function () {
        level = 5;
    }); // Wenn man level1 Button klickt bekommt die let level Variable den Wert 5 - es gibt 5 Töne, die zu wiederholen sind
    two.addEventListener('click', function () {
        level = 15;
    }); // Wenn man level2 Button klickt bekommt die let level Variable den Wert 15 - es gibt 15 Töne, die zu wiederholen sind
    three.addEventListener('click', function () {
        level = 25;
    }); // Wenn man level3 Button klickt bekommt die let level Variable den Wert 25 - es gibt 25 Töne, die zu wiederholen sind
    four.addEventListener('click', function () {
        level = 35;
    }); // Wenn man level4 Button klickt bekommt die let level Variable den Wert 35 - es gibt 35 Töne, die zu wiederholen sind
}
addLevelListeners(levelOne, levelTwo, levelThree, levelFour);
startButton.addEventListener('click', function () {
    if (!level) {
        alert("please click your level first."); // Spieler wird gebeten vorher ein Level anzuklicken bevor das Spiel beginnt
        return;
    }
    if (on || win) { // Wenn on variable = true oder der Spieler gewonnen hat --- ansonsten passiert nichts beim clicken des startbuttons ???
        if (startPressed == 0) { // prüfen, ob der Startbutton schon einmal benutzt wurde, ansonsten würde die Konsole einen Fehler werfen, da die buttons schon weg sind ???
            removeElement("#levelone"); // klickt Spieler den PlayButton werden Level Button nicht mehr angezeigt
            removeElement("#leveltwo");
            removeElement("#levelthree");
            removeElement("#levelfour");
            removeElement("#Schwierigkeitsgrad");
        }
        startPressed++;
        play();
    }
});
function play() {
    playing = true;
    win = false; // win Variable = false, da der spieler zu beginn noch nicht gewonnen hat???
    order = []; // order Array = speichert Töne, die der PC abspielt --> wird immer geleert, damit Töne aus vorherigen Runden entfernt werden
    playerOrder = []; // playerOrder Array = speichert Töne, die der Spieler klickt --> wird geleert, da Spieler noch keine ausgewählt hat
    flash = 0; // Anzahl abgespielter Töne
    intervalId = 0; // ???
    turn = 1; // turn Variable = 1 --> 1. Runde
    turnCounter.innerHTML = "" + 1; // Counter zählt mit in welcher Runde wir uns befinden
    for (var i = 0; i < level; i++) { // for Schleife: wiederholt nachfolgenden code so lange, bis i nicht mehr kleiner ist als 50. i ist zu beginn 0, wird nach jeder wiederholung um eins erhöht. Der nachfolgende Code wird also 50 mal ausgeführt
        order.push(Math.floor(Math.random() * 5) + 1); // order.push: erzeugt Zufallszahlen zwischen 1 und 5, die in das order Array (speichert Töne, die der PC abspielt) gepusht werden
    }
    compTurn = true; // compTurn Variable = true (PC spielt Töne ab)
    intervalId = setInterval(gameTurn, 800); // setInterval --> alle 800 Milisekunden wird gameTurn aufgerufen, bis clearInterval(intervalId)
}
function gameTurn() {
    on = false; // während der PC Töne abspielt kann Spieler keine eigenen Töne abspielen
    if (flash == turn) { // Entspricht flash Variable (Wie viel Töne gespielt wurden) = turn Variable (der jetzigen Runde) --> um herauszufinden, ob der Zug des PCs vorbei ist (hat der PC für diese Runde alle vorgegebenen Sounds abgespielt)
        clearInterval(intervalId); // lässt den PC aufhören weiter Sounds abzuspielen
        compTurn = false; // Spieler ist jetzt an der Reihe
        on = true; // ermöglicht dem Spieler Töne abzuspielen
    }
    if (compTurn) { // Prüft, ob PC am Zug ist. Falls ja:              // Diese Bedinung ist immer wahr, wenn flash == turn falsch ist
        setTimeout(function () {
            if (order[flash] == 1)
                one(); // prüft, ob das Element aus dem order Array (speichert die vorgegebenen Sounds) eine 1 ist (one = boo) --> wenn ja: ruft die Funktion one auf (spielt boo Ton)
            if (order[flash] == 2)
                two(); // usw.
            if (order[flash] == 3)
                three();
            if (order[flash] == 4)
                four();
            if (order[flash] == 5)
                five();
            flash++; // Eine der oberen Bedingungen wird erfült sein --> Zähler (wie viele Töne wurden gespielt) um eine Ganzzahl erhöhen
        }, 500); // // dies wird ausgeführt nachdem 500 ms gewartet wurde
    }
}
function one() {
    if (noise) { // Prüft, ob überhaupt ein Ton gespielt werden soll
        playSample(1); // Spielt den Ton ab
    }
    noise = true; // Gibt an, ob ein Ton gemacht werden soll - true: spielt Ton ab
}
function two() {
    playSample(2);
}
noise = true;
function three() {
    if (noise) {
        playSample(3);
    }
    noise = true;
}
function four() {
    if (noise) {
        playSample(4);
    }
    noise = true;
}
function five() {
    if (noise) {
        playSample(5);
    }
    noise = true;
}
boo.addEventListener('click', function () {
    if (on && playing) { // prüft, ob die on Variable = true (ob der Spieler die Töne klicken kann), falls ja:
        playerOrder.push(1); // fügt dem playerOrder Array ( speichert die Töne, die der Spieler geklickt hat) eine 1 hinzu = boo Ton
        check(); // prüft, ob die gewählten Töne korrekt sind und ob das Spiel gewonnen wurde
        one(); // spielt boo Ton ab
        if (!win) { // prüft, ob Spiel gewonnen ist, falls nicht:
            setTimeout(() => {
            }, 300);
        }
    }
});
laugh.addEventListener('click', function () {
    if (on && playing) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
            }, 300);
        }
    }
});
duck.addEventListener('click', function () {
    if (on && playing) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
            }, 300);
        }
    }
});
boing.addEventListener('click', function () {
    if (on && playing) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
            }, 300);
        }
    }
});
applause.addEventListener('click', function () {
    if (on && playing) {
        playerOrder.push(5);
        check();
        five();
        if (!win) {
            setTimeout(() => {
            }, 300);
        }
    }
});
function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) { // prüft, ob der letzte vom Spieler gewählt Ton korrekt ist--> wir vergleichen die Arrays (vorgegebene und gespielte Töne)
        good = false; // good Variable = false (hat Spieler richtig geklickt) 
    }
    else {
        good = true;
    }
    if (playerOrder.length == level && good) { // prüft, ob das die letzte Runde war (Länge des arrays = Länge level Variable) // &&: ob der Spieler alles richtig gemacht, hat falls ja:
        winGame(); //wingame methode aufrufen --> Spiel wurde gewonnen!
    }
    if (good == false) { // falls Spieler nicht alles richtig wiederholt hat
        turnCounter.innerHTML = "NO!"; //in turncounter Variable wird "NO"! angezeigt
        playSample(6); // lose.mp3 wird abgespielt, wenn Spieler verloren hat
        alert("try again!"); // Meldung: "try again"
        clearInterval(intervalId);
        noise = false; // kein Ton soll gespielt werden, wenn Spieler etwas Falsches klickt
        addElement();
    }
    if (turn == playerOrder.length && good && !win) { // prüft, ob turn Variable der Länge des playerOrder Arrays entspricht und ob Spieler alles richtig geclickt und noch nicht gewonnen hat, falls ja:
        turn++; // turn Variable um eins erhöhen --> Zug ist vorbei
        playerOrder = []; // playerOrder Array leeren
        compTurn = true; // --> Neue Reunde = PC muss Ton abspielen
        flash = 0; // Anzahl abgespielter Töne: neue Runde = noch kein Ton wurde gespielt 
        turnCounter.innerHTML = "" + turn; // turnCounter wird aktualisiert 
        intervalId = setInterval(gameTurn, 800); // gameTurn alle 800 ms aufrufen. Das ganze in einer Variable speichern, damit man die Wiederholungen mit der clearInterval Methode stoppen kann, hier starten wir praktisch die neue rnde
    }
}
function winGame() {
    turnCounter.innerHTML = "YES!"; // statt der Runden wird "YES!" angezeigt
    on = false; // Spieler soll jetzt keine Buttons mehr klicken
    win = true; // Spieler hat gewonnen
    alert("you did it!"); // Meldung: "you did it!"
    addElement();
}
function playSample(number) {
    var sound; // Ton, der zum Schluss abgespielt werden soll
    if (noise) { // prüft, ob überhaupt ein Sound gespielt werden soll
        switch (number) { // switch statement: bekommt die Nummer als Argument, die die playSample Funktion als Argument bekommen --> je nach übergebener Nummer wird unterschiedlicher Code ausgeführt
            case 1: // falls wir die 1 übergeben bekommen:
                boo.classList.add("highlight"); // ???
                sound = new Audio("sound_kids_booo.mp3"); // boo Ton in der Variable speichern
                break;
            case 2: // falls wir die 2 übergeben bekommen:
                laugh.classList.add("highlight");
                sound = new Audio("sound_laugh.mp3"); // laugh Ton in der Variable speichern
                break;
            case 3: // falls wir die 3 übergeben bekommen:
                duck.classList.add("highlight");
                sound = new Audio("sound_squeaking.mp3"); // duck Ton in der Variable speichern
            case 4: // falls wir die 4 übergeben bekommen:
                boing.classList.add("highlight");
                sound = new Audio("sound_boing.mp3"); // boing Ton in der Variable speichern
                break; // ??? warum kein case 5 ?
                applause.classList.add("highlight");
                sound = new Audio("sound_yeah.mp3"); // yeah Ton in der Variable speichern
                break;
            case 6:
                sound = new Audio("lose.mp3");
                break;
        }
    }
    sound.play(); // spielt den Ton ab
    setTimeout(removeClass, 200);
}
function removeElement(elementId) {
    var element = document.querySelector(elementId); //speichert das HTML Element in die Variable element
    element.parentNode.removeChild(element); // löscht das HTML Element
}
function addElement() {
    var one = document.createElement("img");
    var two = document.createElement("img");
    var three = document.createElement("img");
    var four = document.createElement("img");
    one.id = "levelone";
    two.id = "leveltwo";
    three.id = "levelthree";
    four.id = "levelfour";
    one.classList.add("button");
    two.classList.add("button");
    three.classList.add("button");
    four.classList.add("button");
    one.src = "1.png";
    two.src = "2.png";
    three.src = "3.png";
    four.src = "4.png";
    document.querySelector("#levelbuttons").appendChild(one);
    document.querySelector("#levelbuttons").appendChild(two);
    document.querySelector("#levelbuttons").appendChild(three);
    document.querySelector("#levelbuttons").appendChild(four);
    addLevelListeners(one, two, three, four);
}
function removeClass() {
    soundButtons.forEach(element => {
        element.classList.remove("highlight");
    });
}
//# sourceMappingURL=scriptkopie.js.map
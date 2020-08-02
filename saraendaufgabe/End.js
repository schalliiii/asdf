let order = []; // Array, in dem die zufällig generierten Töne gespeichert werden, die der PC abspielt
let playerOrder = []; // Array, in dem die vom Nutzer ausgewählten Töne gespeichert werden (wird jede Runde neu gefüllt)
let flash; // Speichert wie viele Sounds gespielt wurden (in der jeweiligen Runde)
let turn; // Speichert in welchem Zug / welcher Runde wir uns befinden
let good; // boolean Wert, true wenn der User die richtigen Töne wiederholt hat, false wenn nicht
let compTurn; // boolean Wert, speichert wer dran ist mit Töne spielen (true = computer, false = user)
let intervalId; // Hier wird eine Funktion gespeichert
let noise = true; // Gibt an. ob ein Sound gemacht werden soll (boolean)
let on = true; // ist Programm an?
let win; // hat der User schon gewonnen?
let level; // gibt die Anzahl der Sounds an, die wiederholt werden müssen zum Gewinnen
let startPressed = 0; //anzahl wie oft der startbutton benutzt wurde
let playing = false;
const turnCounter = document.querySelector("#turn"); //speichert das HTML Element mit der id turn, hier schreiben wir später rein, in welchem Zug wir uns befinden
const bell = document.querySelector("#button1"); // speichert den boobutton
const sirene = document.querySelector("#button2"); // speichert den laughbutton
const laugh = document.querySelector("#button3"); // speichert den duckbutton
const snare = document.querySelector("#button4"); // speichert den boingbutton
const hihat = document.querySelector("#button5"); // speichert den applausebutton
const onButton = document.querySelector("#on"); // speichert den on Button
const startButton = document.querySelector("#start"); // speichert den Startbutton
const levelOne = document.querySelector("#levelone"); // speichert den level 1 button
const levelTwo = document.querySelector("#leveltwo"); // speichert den level 2 button
const levelThree = document.querySelector("#levelthree"); // speichert den level 3 button
const levelFour = document.querySelector("#levelfour"); // speichert den level 4 button
const soundButtons = [bell, sirene, laugh, snare, hihat];
const levelButtons = [levelOne, levelTwo, levelThree, levelFour];
function addLevelListeners() {
    levelOne.addEventListener('click', (event) => {
        level = 5;
    }); // Auf das click event des level one buttons wird eine anonyme Funktion registriert, die die Level Variable auf 5 setzt, d.h. dass jedes mal wenn jemand auf denen level 1 button drückt, die level Variable auf 5 gesetzt wird. Erinnerung: Die level Variable speichert, wie viele Sounds der User wiederholen muss, damit er gewinnt
    levelTwo.addEventListener('click', (event) => {
        level = 15;
    }); // Auf das click event des level one buttons wird eine anonyme Funktion registriert, die die Level Variable auf 10 setzt, d.h. dass jedes mal wenn jemand auf denen level 2 button drückt, die level Variable auf 10 gesetzt wird. Erinnerung: Die level Variable speichert, wie viele Sounds der User wiederholen muss, damit er gewinnt
    levelThree.addEventListener('click', (event) => {
        level = 25;
    }); // Auf das click event des level one buttons wird eine anonyme Funktion registriert, die die Level Variable auf 15 setzt, d.h. dass jedes mal wenn jemand auf denen level 3 button drückt, die level Variable auf 15 gesetzt wird. Erinnerung: Die level Variable speichert, wie viele Sounds der User wiederholen muss, damit er gewinnt
    levelFour.addEventListener('click', (event) => {
        level = 35;
    }); // Auf das click event des level one buttons wird eine anonyme Funktion registriert, die die Level Variable auf 25 setzt, d.h. dass jedes mal wenn jemand auf denen level 4 button drückt, die level Variable auf 25 gesetzt wird. Erinnerung: Die level Variable speichert, wie viele Sounds der User wiederholen muss, damit er gewinnt
}
addLevelListeners();
startButton.addEventListener('click', (event) => {
    if (!level) {
        alert("Bitte Level auswählen");
        return;
    }
    if (on || win) { // prüfen, ob die on variable auf true ist, also die on checkbox ausgewählt, oder der benutzer gewonnen hat --- ansonsten passiert nichts beim clicken des startbuttons
        if (startPressed == 0) { // prüfen, ob der Startbutton schon einmal benutzt wurde, ansonsten würde die Konsole einen Fehler werfen, da die buttons schon weg sind --- Das ist nicht sehr elegant gelöst, der fehler ist mir eben erst aufgefallen, das kann ich noch ändern // startet das Spiel, funktion wird später erläutert
            removeElement("#levelone"); // Entfernt den den Button zur Auswahl des level 1, funktionsweise wird später erklärt
            removeElement("#leveltwo"); // Entfernt den den Button zur Auswahl des level 2, funktionsweise wird später erklärt
            removeElement("#levelthree"); // Entfernt den den Button zur Auswahl des level 3, funktionsweise wird später erklärt
            removeElement("#levelfour"); // Entfernt den den Button zur Auswahl des level 4, funktionsweise wird später erklärt
        }
        startPressed++;
        play();
    }
});
function play() {
    playing = true;
    win = false; // setzt win variable (boolean) auf false, da der spieler zu beginn noch nicht gewonnen hat
    order = []; // Erinnerung: der order Array speichert die sounds, die der pc vorgibt. Dieser wird zu Beginn geleert, damit sounds aus vorherigen Runden entfernt werden
    playerOrder = []; // Erinnerung: der playerOrder Array speichert die sounds, die der spieler auswählt. Wird geleert, da user noch keine ausgewählt hat
    flash = 0; // Anzahl abgespielter sounds
    intervalId = 0; //
    turn = 1; // Setzt die turn variable auf 1, da beim Starten des spiels die erste runde startet
    turnCounter.innerHTML = "" + 1; // Setzt den Text des html elements, das in der turnCounter Variable gespeichert ist auf 1, Zunächst wird ein leerer String genommen, auf den 1 addiert wird. Sinn: Als Wert muss ein String übergeben werden, der Wert muss sich aber hochzählen lassen, wofür eine nummer benötigt wird. "" + 1 hat den Effekt, dass der Wert als String in das html element gegeben wird, der wert sich aber hochzählen lässt
    for (var i = 0; i < level; i++) { // for Schleife: wiederholt nachfolgenden code so lange, bis i nicht mehr kleiner ist als 50. i ist zu beginn 0, wird nach jeder wiederholung um eins erhöht. Der nachfolgende Code wird also 50 mal ausgeführt
        order.push(Math.floor(Math.random() * 5) + 1); // order.push: fügt dem order Array (Erinnerung: Speichert die sounds die der pc vorgibt) das element in den Klammern hinzu. Die Formel in den Klammern: Erzeugt eine Zufallszahl zwischen 1 und 5. 1 ist der boo sound, 2 der laugh sound, usw. Genaue erklärung zur formel: math.random gibt eine zufällige kommazahl zwischen 0 und 1 (0 inklusiv, 1 aber nicht, also das höchste ist 0,99999999999999) zurück, also z.B. 0,809. Dieser Wert wird mit 5 (höchste zahl die rauskommen können soll) multipliziert. dann wird 1 addiert. Der höchste Wert nach der Rechnung ist also 5 * 0.999 + 1 = 5,995 , der niedrigste 5 * 0 + 1 = 1. Math.floor rundet das Ergebnis auf die nächste ganze Zahl ab, also z.b. 5,995 wird zu 5. Somit erhält man insgesamt einen Wert zwischen 1 und 5
    }
    compTurn = true; // Setzte Compturn Variable (Erinnerung: speichert, ob der PC am Zug ist) auf True, da zu Beginn des Spiels der PC einen sound abspielt
    intervalId = setInterval(gameTurn, 800); // In der Variable intervalId wird die Funktion setInterval, die mit den Argumenten gameTurn (das ist eine Funktion, wird später erklärt) und 800 aufgerufen wird. setInterval ist eine vordefinierte Funktion von TypeScript. Sie erwartet zwei Argumente: 1. eine Funktion oder code der ausgeführt werden soll und einen Zeitabstand. Die Funktion wiederholt den Code oder die Funktion, die sie als erstes Argument bekommt, in dem Zeitabstand, den sie als zweites Argument bekommt. In unserem Fall wird also alle 800 Milisekunden die Funktion gameTurn aufgerufen. Dies geschieht so lange, bis die Funktion clearInterval mit dem Argument intervalId aufgerufen wird. (siehe oben/unten)
}
function gameTurn() {
    on = false; // Setze on Variable (boolean) auf false. Dies heißt in diesem Fall nicht, dass das Spiel ausgeschaltet wird, sondern dient dazu, dass der Spieler während der PC Sounds abspielt keine eigenen Sounds dazwischen spielen kann 
    if (flash == turn) { // Überprüft, der Wert der flash Variable dem Wert der turn Variable entspricht. Also ob die Anzahl der gespielten Sounds dem Wert des aktuellen Zugs entspricht. Die Überprufung dient also dazu, um herauszufinden ob der Zug des PCs vorbei ist, also dass er für diese Runde alle vorgegebenen Sounds abgespielt hat
        clearInterval(intervalId); // Erklärung der Funktionsweise siehe vorherige Verwendung, lässt den PC aufhören weiter Sounds abzuspielen
        compTurn = false; // Setze compTurn Variable (boolean) auf false, wir sagen also, dass der Spieler jetzt am Zug ist
        on = true; // setze on variable (boolean) auf true, ermöglicht dem Spieler Sounds abzuspielen
    }
    if (compTurn) { // Prüfen, ob der PC am Zug ist. Falls ja:              Anmerkung: Diese Bedinung ist immer wahr, wenn die Prüfung oben drüber falsch ist
        setTimeout(() => {
            if (order[flash] == 1)
                one(); // prüft, ob das Element aus dem Order array(Erinnerung: speichert die vorgegebenen Sounds) eine 1 ist  (erinnerung: 1 ist der boo sound) Falls ja: ruft die Funktion one auf (diese spielt den boo sound, genaue funktionsweise wird später erklärt) falls nein: es geschieht nichts 
            if (order[flash] == 2)
                two(); //analog
            if (order[flash] == 3)
                three(); //analog
            if (order[flash] == 4)
                four(); //analog
            if (order[flash] == 5)
                five(); //analog
            flash++; // Erinnerung: die flash variable ist der Zähler, wie viele Sounds abgespielt wurden. Diesen erhöhen wir nun um 1, da eine der obigen 5 Bedinungen erfüllt sein wird und somit ein Sound abgespielt wurde
        }, 500); // Die 500 ist das zweite Argument der setTimeout Funktion, der obige Code wird also nach 500 ms ausgeführt
    }
}
function one() {
    if (noise) { // Prüfen ob ein Sound gespielt werden soll
        playSample(1); // Spielt den Sound ab, genau erklärung in der Funktion
    }
    noise = true; //Variable auf true setzen
}
function two() {
    if (noise) {
        playSample(2);
    }
    noise = true;
}
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
boo.addEventListener('click', (event) => {
    if (on && playing) { // prüfen, ob die variable on auf true ist (Erinnerung: die on Variable gibt hier an, ob der User derzeit buttons betätigen kann), falls ja:
        playerOrder.push(1); // fügt dem playerOrder Array (dieser speichert die Sounds, die der Spieler ausgewählt hat) eine 1 hinzu (Diese steht für den boo sound)
        check(); // prüfen, ob die gewählten sounds korrekt sind und ob das spiel gewonnen wurde, genaue Funktionsweise später
        one(); // spielt den boo sound ab
        if (!win) { // prüft ob das Spiel gewonnen ist, falls nicht:
            setTimeout(() => {
            }, 300);
        }
    }
});
laugh.addEventListener('click', (event) => {
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
duck.addEventListener('click', (event) => {
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
boing.addEventListener('click', (event) => {
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
applause.addEventListener('click', (event) => {
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
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) { // prüft, ob der letzte vom User gewählt Sound korrekt ist, d.h. wir vergleichen die Arrays (vorgegebene und gespielte Sounds) Erklärung: playerOrder heißt der Array, playerOrder.length gibt uns die Länge des Arrays zurück, - 1, da arrays bei 0 anfangen zu zählen. Die Länge minus 1 gibt also das letzte element des Arrays zurück. Falls die letzten beiden Elemente UNGLEICH sind:
        good = false; //setze good variable auf false (Erinnerung: good speichert, ob der user richtig ausgewählt hat) 
    }
    else {
        good = true;
    }
    if (playerOrder.length == level && good) { // prüft, ob das die letzte runde war und der user alles richtig gemacht hat: die länge des arrays beinhaltet genau dann so viele elemente wie die level variable, also zb bei level 1 enthält der array genau 5 elemente, die level variable hat ebenfalls den wert 5 (Erinnerung: level variable speichert, wie viele Runden gespielt werden müssen zum Gewinnen). && fügt eine weitere Bedinung hinzu: nämlich ob alles richtig gewählt wurde. falls ja:
        winGame(); //wingame methode aufrufen, da das spiel gewonnen wurde. genaue funktionsweise später
    }
    if (good == false) { // falls der spieler nicht alles richtig wiederholt hat
        turnCounter.innerHTML = "NO!"; //in das html element der turncounter variable wird NO! geschrieben
        playSample(6);
        alert("Verloren!");
        /*setTimeout(() => { // setTimeout wird vorher schon erklärt, der nachfolgende code wird nach 800 ms ausgeführt
          turnCounter.innerHTML = "" + turn; //in das html element der turncounter variable wird wieder die nummer der aktuellen runde geschrieben --- somit wird auch das NO! entfernt
          compTurn = true; // compturn variable auf true setzen, d.h. der computer spielt wieder sounds ab
          flash = 0; // flash variable auf 0 setzen, da der user nun alle Sounds wiederholen muss (Erinnerung: flash variable speichert anzahl der wiederholten sounds)
          playerOrder = []; // den playerOrder Array leeren, da wir hier die Sounds speichern, die der User wiederholt hat
          good = true; // good variable auf true setzen, da noch nichts falsch ist, da die runde erst neu gestartet wird
          intervalId = setInterval(gameTurn, 800); // die Funktion setIntervall mit den Argumenten gameTurn und 800 aufrufen, d.h. gameTurn alles 800 ms aufrufen. Das ganze in einer Variable speichern, damit man die Wiederholungen mit der clearInterval Methode stoppen kann
          
        }, 800);*/
        clearInterval(intervalId);
        noise = false; // noise Variable auf false setzen, da kein Sound gespielt werden soll, wenn der User etwas falsches auswählt
        addElement();
    }
    if (turn == playerOrder.length && good && !win) { // prüfen, ob die turn variable der länge des playerOrder Arrays entspricht(speichert die vom Spieler wiederholten sounds) und ob er alles richtig gemacht hat( das haben wir zuvor in der good variable gespeichert) und ob der spieler noch nicht gewonnen hat
        turn++; // turn variable um eins erhöhen, da der zug vorbei ist, falls die obige bedingung erfüllt ist
        playerOrder = []; // playerOrder Array (speichert vom User wiederholte Sounds) leeren, da der Zug vorbei ist und im nächsten die sounds erneut gespeichert werden müssen
        compTurn = true; // compTurn variable (speichert, ob der computer am Zug ist) auf true setzen, da zu beginn einer neuen runde der pc sounds spielen muss
        flash = 0; // flash variable (speichert, wie viele sounds diese runde gespielt wurden) zurück auf 0 setzen, da wir eine neue Runde starten und noch keine sounds gespielt wurden
        turnCounter.innerHTML = "" + turn; // der inhalt das html elements(wo wir die Rundenanzahl anzeigen) wird aktualisiert, wieder mit "" + turn, da das html element einen String braucht, die turn variable aber eine zahl ist
        intervalId = setInterval(gameTurn, 800); // die Funktion setIntervall mit den Argumenten gameTurn und 800 aufrufen, d.h. gameTurn alles 800 ms aufrufen. Das ganze in einer Variable speichern, damit man die Wiederholungen mit der clearInterval Methode stoppen kann, hier starten wir praktisch die neue rnde
    }
}
function winGame() {
    turnCounter.innerHTML = "WIN!"; // anstatt der runden zeigen wir jetzt "WIN!" an
    on = false; // die on variable auf false setzen, da der user jetzt keine buttons mehr pressen soll
    win = true; // die win variable auf true setzen, da der Spieler jetzt gewonnen hat
    alert("Gewonnen");
    addElement();
}
function playSample(number) {
    var sound; // hier speichern wir den sound, der zum schluss abgespielt werden soll
    if (noise) { // prüfen, ob überhaupt ein Sound gespielt werden soll. Diese Prüfung ist eigentlich überflüssig, da wir diese Funktion nur aufrufen falls das der fall ist, dient nur zur korrektheit
        switch (number) { // switch statement, bekommt die nummer, die die funktion als argument bekommen hat ebenfalls als argument. je nach übergebener nummer wird unterschiedlicher code ausgeführt. bekommt die funktion also zb die 1 als argument, wird der code bei case 1 ausgeführt.
            case 1: // falls wir die 1 übergeben bekommen:
                bell.classList.add("highlight");
                sound = new Audio("bell.mp3"); // den boo sound in der variable speichern
                break; // bricht das switch statement ab, ist notwendig, da ansonsten der nachfolgende code ebenfalls ausgeführt wird, auch wenn der fall überhaupt nicht zutrifft
            case 2: // analog
                sirene.classList.add("highlight");
                sound = new Audio("polizeisirene.mp3"); // analog
                break; // analog
            case 3: // analog
                laugh.classList.add("highlight");
                sound = new Audio("laugh-1.mp3"); // analog
                break; // analog
            case 4: // analog
                snare.classList.add("highlight");
                sound = new Audio("snare.mp3"); // analog
                break; // analog
            case 5: // analog
                hihat.classList.add("highlight");
                sound = new Audio("hihat.mp3"); // analog
                break; // analog
            case 6:
                sound = new Audio("lose.mp3");
                break;
        } // zusätzliche Anmerkung zu dem switch statement: Das switch statement könnte man ebenfalls durch 5 if-else-statements ersetzen, dies würde allerdings sehr unübersichtlich werden und würde es erschweren den code zu interpretieren. da das switch statement meiner meinung nach nicht so schwer zu verstehen ist, habe ich das switch statement zur besseren übersichtlichkeit benutzt
    }
    sound.play(); // spielt den sound ab
    setTimeout(removeClass, 200);
}
function removeElement(elementId) {
    var element = document.querySelector(elementId); //speichert das html element in die variable
    element.parentNode.removeChild(element); // löscht das html element.
}
function addElement() {
    if (!levelOne && !levelTwo && !levelThree && !levelFour) {
        var one = document.createElement("img");
        var two = document.createElement("img");
        var three = document.createElement("img");
        var four = document.createElement("img");
        one.id = "levelone";
        two.id = "leveltwo";
        three.id = "levelthree";
        four.id = "levelfour";
        one.classList.add("button1");
        two.classList.add("button2");
        three.classList.add("button3");
        four.classList.add("button4");
        one.src = "1.png";
        two.src = "2.png";
        three.src = "3.png";
        four.src = "4.png";
        document.querySelector("#levelbuttons").appendChild(one);
        document.querySelector("#levelbuttons").appendChild(two);
        document.querySelector("#levelbuttons").appendChild(three);
        document.querySelector("#levelbuttons").appendChild(four);
        addLevelListeners();
    }
}
// zusätzliche Anmerkung: In dem Code ist vieles redundant und einiges würde sich in extra Funktionen auslagern lassen, da dies aber wahrscheinlich den code zum verstehen erschweren würde, wurde dies bewusst nicht getan.
// im typescript code wird noch ein fehler angezeigt, der so eigentlich nicht existieren sollte, da er von der logik her korrekt ist und der fehler auch vielen typescript entwicklern bekannt ist, dieser allerdings noch nicht behoben wurde vom W3 Konsortium (die sind dafür zuständig)
// der fehler hält den compiler noch davon ab, die datei in javascript zu übersetzen, allerdings funktioniert die datei wie gewollt wenn man sie direkt als javascript datei benutzt.
// hier ist noch nichts typisiert, das mache ich noch
function removeClass() {
    soundButtons.forEach(element => {
        element.classList.remove("highlight");
    });
}
//# sourceMappingURL=End.js.map
//Mit Hilfe von Jasmine Basler gelöst. 
// Aufgabe 7 mit playSample
window.addEventListener('load', function () {
    document.querySelector("#button1").addEventListener('click', function () {
        playSample("A.mp3");
    });
    document.querySelector("#button2").addEventListener('click', function () {
        playSample("C.mp3");
    });
    document.querySelector("#button3").addEventListener('click', function () {
        playSample("F.mp3");
    });
    document.querySelector("#button4").addEventListener('click', function () {
        playSample("G.mp3");
    });
    document.querySelector("#button5").addEventListener('click', function () {
        playSample("hihat.mp3");
    });
    document.querySelector("#button6").addEventListener('click', function () {
        playSample("kick.mp3");
    });
    document.querySelector("#button7").addEventListener('click', function () {
        playSample("laugh-1.mp3");
    });
    document.querySelector("#button8").addEventListener('click', function () {
        playSample("laugh-2.mp3");
    });
    document.querySelector("#button9").addEventListener('click', function () {
        playSample("snare.mp3");
    });
    // Aufgabe 8 - playbutton + recordbutton 
    document.querySelector("#playbutton").addEventListener('click', playstop);
    document.querySelector("#recordbutton").addEventListener('click', recording);
    // intervall - finalbeat loop
    var finalbeat = ["kick.mp3", "snare.mp3", "hihat.mp3"];
    var x = 0;
    var kicksnarehihat;
    function playFinalBeat() {
        kicksnarehihat = setInterval(function () {
            playSample(finalbeat[x]);
            x++;
            if (x >= finalbeat.length) {
                x = 0;
            }
        }, 500);
    }
    //play bzw stopbutton switchen
    function playstop() {
        var playstop = document.querySelector("#playbutton");
        if (playstop.getAttribute("class") == "fas fa-play") {
            playstop.setAttribute("class", "fas fa-stop");
            playFinalBeat();
        }
        else {
            playstop.setAttribute("class", "fas fa-play");
            stopFinalBeat();
        }
    }
    // FinalBeat stop
    function stopFinalBeat() {
        clearInterval(kicksnarehihat);
    }
    // record funktion
    var rec = false;
    function recording() {
        if (rec) {
            rec = false;
        }
        else {
            rec = true;
        }
    }
    function playSample(mp3) {
        if (rec) {
            finalbeat.push(mp3);
        }
        const sound = new Audio(mp3);
        sound.play();
    }
    //trashbutton + trashfunktion
    document.getElementById("trashbutton").addEventListener('click', function () {
        finalbeat = [];
    });
});
//# sourceMappingURL=script8.js.map
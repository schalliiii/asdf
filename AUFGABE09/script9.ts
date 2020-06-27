// Aufgabe 09 - Hilfe von Herr Rausch und Moritz Labza

// Array erstellen

let todoListe = ["Medienanalyse Präsentation ", "EIA Hausaufgaben ", "Medienpsychologie ", "Medientechnik Präsentation"];

// 

window.addEventListener("load", function () {

    // Ausgabe der Array-Elemente + Anzeige des Papierkorbs
    

    function drawList() {
        Liste2.innerHTML = "";
        for (var index = 0; index < todoListe.length; index++) {
            Liste2.innerHTML += "<div>" + "<input type='checkbox'>" + todoListe[index] + "<i class='fas fa-trash-alt'id=delete></i>" + "</div>";
        }
    
        // "in total" Anzeige passt sich an
    
        var total = document.querySelector("#mySpan");
        total.innerHTML = todoListe.length;
    }

    var Liste2 = document.querySelector(".addlist");
    drawList();

    // Klick auf add-button1 pusht neues Element hinzu

    var input = document.querySelector("#newAdd");
    console.log(input);

    var addNewElement = document.querySelector("#button1");
    addNewElement.addEventListener("click", function () {
        todoListe.push(input.value);
        drawList();
        input.value = "";
        console.log(todoListe);
    });

});



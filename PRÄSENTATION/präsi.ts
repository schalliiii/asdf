


interface Student {
    name: string;
    matriculationID: number;
}

var students: Student[] = [
    {
        name: "Lorem Ipsum",
        matriculationID: 17241
    },
    {
        name: "Dolor Sed",
        matriculationID: 42492
    }
];

function createListOfStudents(): void {
    let outputList: HTMLElement = document.querySelector(".listWrapper");
    outputList.innerHTML = "<ul>";

    for (let i: number = 0; i < students.length; i++) {
        var cssClasses = "student";
        // was genau es macht ist egal, nur die Grundbausteine erklären.
        if (students[i].matriculationID >= 4000) {
            cssClasses += " matriculationP2"
        }
        outputList.innerHTML += "<li class=" + cssClasses + ">" + students[i].name + "</li>";
    }

    outputList.innerHTML += "</ul>";
}

// 3-5 Grundbausteine des Codes erklären
// Condition, For schleife - if
// Bsp: Objekte - Interfaces, Variablen, If-Schleifen
// Bsp Anwendungsfall: mit If-Schleifen Listen in Console ausgeben lassen

// Präsi - nicht mehr als 5 wörter pro Folie
// eigene Code Snippets


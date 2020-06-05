window.addEventListener('load', function() {

document.querySelector(".europe").addEventListener('click', EuropeFunction);
document.querySelector(".africa").addEventListener('click', AfricaFunction);
document.querySelector(".northamerica").addEventListener('click', NorthAmericaFunction);
document.querySelector(".southamerica").addEventListener('click', SouthAmericaFunction);
document.querySelector(".asia").addEventListener('click', AsiaFunction);
document.querySelector(".australia").addEventListener('click', AustraliaFunction);

function EuropeFunction () {
    document.getElementById("Emissionswert1").innerHTML = "4209.3";
    document.getElementById("titleRegion").innerHTML = "Europe";
    document.getElementById("Emissionswert2").innerHTML = "14.5%";
    document.getElementById("Emissionswert3").innerHTML = "-0.15%";
    document.getElementById("Emissionswert4").innerHTML = "-756.45";
    document.getElementById("Text1").innerHTML = "Europe";
    document.querySelector(".chartWrapper .chart").setAttribute("style", "height: 14.5%");
}

function AfricaFunction () {
    document.getElementById("Emissionswert1").innerHTML = "1235.5";
    document.getElementById("titleRegion").innerHTML = "Africa";
    document.getElementById("Emissionswert2").innerHTML = "4.26%";
    document.getElementById("Emissionswert3").innerHTML = "0.2%";
    document.getElementById("Emissionswert4").innerHTML = "+207.5";
    document.getElementById("Text1").innerHTML = "Africa";
    document.querySelector(".chartWrapper .chart").setAttribute("style", "height: 4.26%");
}

function NorthAmericaFunction () {
    document.getElementById("Emissionswert1").innerHTML = "6035.6";
    document.getElementById("titleRegion").innerHTML = "North America ";
    document.getElementById("Emissionswert2").innerHTML = "20.8%";
    document.getElementById("Emissionswert3").innerHTML = "0.09%";
    document.getElementById("Emissionswert4").innerHTML = "-564.8";
    document.getElementById("Text1").innerHTML = "North America";
    document.querySelector(".chartWrapper .chart").setAttribute("style", "height: 20.8%");
}

function SouthAmericaFunction () {
    document.getElementById("Emissionswert1").innerHTML = "1261.5";
    document.getElementById("titleRegion").innerHTML = "South America";
    document.getElementById("Emissionswert2").innerHTML = "4.35%";
    document.getElementById("Emissionswert3").innerHTML = "0.11%";
    document.getElementById("Emissionswert4").innerHTML = "+128.9";
    document.getElementById("Text1").innerHTML = "South America";
    document.querySelector(".chartWrapper .chart").setAttribute("style", "height: 4.35%");
}

function AsiaFunction () {
    document.getElementById("Emissionswert1").innerHTML = "16274.1";
    document.getElementById("titleRegion").innerHTML = "Asia";
    document.getElementById("Emissionswert2").innerHTML = "50.09%";
    document.getElementById("Emissionswert3").innerHTML = "0.26%";
    document.getElementById("Emissionswert4").innerHTML = "+3319.4";
    document.getElementById("Text1").innerHTML = "Asia";
    document.querySelector(".chartWrapper .chart").setAttribute("style", "height: 50.09%");
}

function AustraliaFunction () {
    document.getElementById("Emissionswert1").innerHTML = "2100.5";
    document.getElementById("titleRegion").innerHTML = "Australia";
    document.getElementById("Emissionswert2").innerHTML = "6.75%";
    document.getElementById("Emissionswert3").innerHTML = "5.39%";
    document.getElementById("Emissionswert4").innerHTML = "+107.5";
    document.getElementById("Text1").innerHTML = "Australia";
    document.querySelector(".chartWrapper .chart").setAttribute("style", "height: 6.75%");
}

})

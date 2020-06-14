
function allSounds2 (mp3:string) {
    var allSounds:HTMLAudioElement = new Audio (mp3);
    allSounds.play();
}

window.addEventListener('load', function() {
    document.querySelector("#button1").addEventListener("click", function(){
        allSounds2 ("A.mp3")});
    document.querySelector("#button2").addEventListener("click", function(){
        allSounds2 ("C.mp3")});
    document.querySelector("#button3").addEventListener("click", function(){
        allSounds2 ("F.mp3")});
    document.querySelector("#button4").addEventListener("click", function(){
        allSounds2 ("G.mp3")});
    document.querySelector("#button5").addEventListener("click", function(){
        allSounds2 ("hihat.mp3")});
    document.querySelector("#button6").addEventListener("click", function(){
        allSounds2 ("kick.mp3")});
    document.querySelector("#button7").addEventListener("click", function(){
        allSounds2 ("laugh-1.mp3")});
    document.querySelector("#button8").addEventListener("click", function(){
        allSounds2 ("laugh-2.mp3")});
    document.querySelector("#button9").addEventListener("click", function(){
        allSounds2 ("snare.mp3")});
}

var finalbeat : string [] = ["kick.mp3", "snare.mp3", "hihat.mp3"];
var a : number = 1			
function playbutton (play) {
	var ksh : HTMLAudioElement = new Audio(finalbeat[play]
	ksh.playbutton();
} 
	
document.querySelector("#playbutton").addEventListener("click", function() {
	setInterval(function() {
	playbutton(a - 1);
	a = a;
	a = a +1;
	}, 400);
});


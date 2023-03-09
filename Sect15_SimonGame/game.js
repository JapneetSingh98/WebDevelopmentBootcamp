const buttonColors = ["green","red","yellow","blue"];
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence() {
    level += 1;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let newColor =  buttonColors[randomNumber];
    gamePattern.push(newColor);
    setTimeout(function() {
        $("#"+newColor).fadeOut(100).fadeIn(100);
        playAudio(newColor);
        
    }, 500);
}

function playAudio(color) {
    let audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function playGame() {
    nextSequence();
    $(".btn").click(function(event) {
        $(event.target).addClass("pressed");
        userPattern.push(event.target.id);
        playAudio(event.target.id);
        setTimeout(function() {
            $(event.target).removeClass("pressed");
        }, 150);
    });
}

$(document).keypress(function() {
    console.log("hello");
    if (!gameStarted) {
        console.log("hi");
        gameStarted = true;
        gamePattern = [];
        userPattern = [];
        level = 0;
        nextSequence();
    }
})
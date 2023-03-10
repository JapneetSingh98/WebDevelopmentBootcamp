const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence() {
    userPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let newColor = buttonColors[randomNumber];
    gamePattern.push(newColor);
    setTimeout(function () {
        $("#" + newColor)
            .fadeOut(100)
            .fadeIn(100);
        playAudio("sounds/" + newColor + ".mp3");
    }, 500);
}

$(".btn").click(function (event) {
    if (gameStarted) {
        $(event.target).addClass("pressed");
        userPattern.push(event.target.id);
        setTimeout(function () {
            $(event.target).removeClass("pressed");
        }, 150);

        if (    userPattern.length == gamePattern.length &&
                userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {  // won level
            console.log("correct");
            playAudio("sounds/" + event.target.id + ".mp3");
            setTimeout(nextSequence, 500);

        } else if(  userPattern.length < gamePattern.length &&
                    userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {
            console.log("correct");
            playAudio("sounds/" + event.target.id + ".mp3");
        
        } else {
            console.log("incorrect");
            gameOver();
        }
    }
});

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playAudio("sounds/wrong.mp3");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 150);
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userPattern = [];
}

function playAudio(filePath) {
    let audio = new Audio(filePath);
    audio.play();
}


$(document).keypress(function () {
    if (!gameStarted) {
        gameStarted = true;
        gamePattern = [];
        userPattern = [];
        level = 0;
        nextSequence();
    }
});
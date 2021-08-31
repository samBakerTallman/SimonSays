// Pattern arrays
var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

// Game Status Values
var started = false;

var level = 0;

// Keypress Start and sentinel boolean
$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
});

// Next Sequence Generator
function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level " + level++)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};


// Button Click Event Listener And Handler Function
$(".btn").on("click", function () {
    var userChosenColour = this.id; // alt $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// Refactored Audio Player Function
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play(name);
}

// Button Animation
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// Validation tree
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        };
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").attr("class", "game-over")
        setTimeout(function() {$("body").removeClass("game-over");}, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    };
}

// Reset function
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
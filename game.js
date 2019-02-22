const buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; // used to indicate the start of a game

$(document).keypress(function() {
  if(level === 0) { nextSequence();}
});

$(".btn").click(function() {
  animatePress(this.id);
  userClickedPattern.push(this.id);
  checkAnswer(userClickedPattern.length - 1);
});


// *****************************************************************************
// Functions

function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //random number between 0 and 3
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).animate({ opacity: 0 });
  // this is to play audio sounds
  playSound(randomChosenColour);
  // when you have this.id inside a function within a function, it becomes undefined
   // due to scope & function binding
  setTimeout(function() {
    $("#" + randomChosenColour).animate({ opacity: 1 });
  }, 10);
};

function playSound(name) {
  let soundAudio = new Audio("sounds/" + name + ".mp3");
  soundAudio.play();
};

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  playSound(currentColor);
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  } else if(userClickedPattern.length == gamePattern.length) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
};

function startOver() {
  playSound("wrong");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

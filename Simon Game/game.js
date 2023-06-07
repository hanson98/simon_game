var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  level++;
  $("#level-title").text("Level " + level);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").on("click", function () {
  var userColorChosen = $(this).attr("id");
  userClickPattern.push(userColorChosen);
  playSound(userColorChosen);
  animatePress(userColorChosen);
  console.log(userClickPattern);
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("suceess");
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    console.log("wrong");
  }
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

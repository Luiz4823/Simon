buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
playerPattern = [];
let playerChosen;
let level = 0;
let gameStart = false;

$("body").on("keypress", function(){
    if (gameStart != true){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
});

$(".btn").on("click", function(event){
    let playerChosen = event.target.id;
    playerPattern.push(playerChosen);
    console.log(playerChosen);
    playSound(playerChosen);
    animatePress(playerChosen);
    compareResults(playerPattern.length-1);
});

function nextSequence() {
    playerPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
        for (let i = 0; i < gamePattern.length; i++){
            setTimeout(function(){
                animateButton(gamePattern[i]);
                playSound(gamePattern[i]);
            },1000 * i);
            
        }
    }
function compareResults (currentLevel){
    if (gamePattern[currentLevel] === playerPattern[currentLevel]){
        
        if (playerPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        gameReset();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").text("Game over, press any key to start again");
    }

}

function playSound(name){
    let sound = new Audio("Sounds/" + name + ".mp3");
    sound.play();
}
function animateButton(color){
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function animatePress(pressed){
    $("#" + pressed).addClass("pressed");
    setTimeout(function (){
        $("#" + pressed).removeClass("pressed");
    }, 100);
}
function gameReset (){
    level = 0;
    gamePattern = [];
    gameStart = false;
}




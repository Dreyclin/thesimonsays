var btns = ["green", "red", "yellow", "blue"];
var levels = [];
var gameIsStarted = false;
var itterator = 0;
var lvlNum = 1;

$(document).on("keypress", function () {
    if(!gameIsStarted){
        gameIsStarted = true;
        startGame();
    }
 })

 $(document).on("touchstart", function () {
    if(!gameIsStarted){
        gameIsStarted = true;
        startGame();
    }
 })

function startGame () {
    $("h1").html("Level <span>1</span>");
    randomButton();
}

function randomButton () {
    var random = randomGenerator();
    
    $("." + btns[random]).animate({opacity: 0.5}).animate({opacity: 1});
    
    levels.push(btns[random]);
    
    playAudio(btns[random]);

}

function playAudio (soundName) {
    var audio = new Audio ("sounds/" + soundName + ".mp3");
    audio.play();
}

function randomGenerator () {
    return Math.floor(Math.random() * 4);
}

$(".btn").on("click", function (event) {
    if(gameIsStarted){
        $(event.target).addClass("pressed");
    
        setTimeout(() => {
            $(event.target).removeClass("pressed");
        }, 100);
    
        colorChecker(event.target);
    }
})

function nextLevel() {
    setTimeout(() => {
        $("span").html(lvlNum.toString()); 
        randomButton();
    }, 1000);
}

function colorChecker (target) {
    if($(target).hasClass(levels[itterator])){
        
        playAudio(levels[itterator]);
        
        itterator++;

        if(itterator === levels.length){
            lvlNum++;
            itterator = 0;
            nextLevel();
        }

    } else
        gameOver();
}

function gameOver () {
    restoreData();
    
    playAudio("wrong");
    
    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");
}

function restoreData () {
    gameIsStarted = false;
    lvlNum = 1;
    itterator = 0;
    levels = [];
}
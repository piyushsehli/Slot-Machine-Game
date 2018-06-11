/// <reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var img1 = 0;
var img2 = 0;
var img3 = 0;
var img4 = 0;
var img5 = 0;
var img6 = 0;
/*var sevens = 0;*/
var blanks = 0;

 var i, sound, reel ,result;
 var queue;
 var stage;
//array of images
var imgData = [
        {id:"img1", src:"img/reel-icon-1.png"},
        {id:"img2", src:"img/reel-icon-2.png"},
        {id:"img3", src:"img/reel-icon-3.png"},
        {id:"img4", src:"img/reel-icon-4.png"},
        {id:"img5", src:"img/reel-icon-5.png"},
        {id:"img6", src:"img/reel-icon-6.png"}
    ];

//init function
function init() {
    console.log("init");
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", loadComplete);
    queue.loadManifest([   
        {id:"woosh", src:"sounds/coin.mp3"} 
    ]);
}

function loadComplete() {
    console.log("loadcomplete");
   setupStage();
}

function setupStage() {
    console.log("setupStage");
    stage = new createjs.Stage(document.getElementById('canvas'));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function(){
        stage.update();
    });
}
 /*function handleTick(e) {
        stage.update();
    }
*/
/*function reelComplete(){
    stage.removeChild(this);
    if(!stage.getNumChildren()){
        
    }
}*/
function handleTick(e) {
    stage.update();
}

/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    img1 = 0;
    img2 = 0;
    img3 = 0;
    img4 = 0;
    img5 = 0;
    img6 = 0;
}
function quit(){
    
}
/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [];
    var outCome = [0, 0, 0];
   
    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);

        console.log(outCome[spin]);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = imgData[0];
                img1++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = imgData[1];
                img2++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = imgData[2];
                img3++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = imgData[3];
                img4++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = imgData[4];
                img5++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = imgData[5];
                img6++;
                break;
            default: 
                betLine[spin] = imgData[5];
                img6++;
                break;    
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks === 0)
    {
        if (img1 == 3) {
            winnings = playerBet * 10;
        }
        else if(img2 == 3) {
            winnings = playerBet * 20;
        }
        else if (img3 == 3) {
            winnings = playerBet * 30;
        }
        else if (img4 == 3) {
            winnings = playerBet * 40;
        }
        else if (img5 == 3) {
            winnings = playerBet * 50;
        }
        else if (img6 == 3) {
            winnings = playerBet * 75;
        }
       
        else if (img1 == 2) {
            winnings = playerBet * 2;
        }
        else if (img2 == 2) {
            winnings = playerBet * 2;
        }
        else if (img3 == 2) {
            winnings = playerBet * 3;
        }
        else if (img4 == 2) {
            winnings = playerBet * 4;
        }
        else if (img5 == 2) {
            winnings = playerBet * 5;
        }
        else if (img6 == 2) {
            winnings = playerBet * 10;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}
function spinButton(){
 console.log("click");
     //setupStage();
    setupStage();
    playerBet = $("div#betEntry>input").val();

    if (playerMoney === 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
         for (i = 0; i < 3; i++) {
            reel = new createjs.Bitmap(spinResult[i].src);
            reel.x = i * 190;
            stage.addChild(reel);  
        }
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        //$("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
}

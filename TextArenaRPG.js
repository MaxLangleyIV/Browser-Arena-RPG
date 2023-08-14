//Max Langley
// Browser Arena RPG 2018

/*DEFINED VARIABLES-------------------*/
//Fetch page elements with jQuery
var body = $("#body");
var main = $("#main");
var exit = $("#exit");
var tutBut = $("#tutorial");
var startBut = $("#startGame");
var aboutBut = $("#about");
var intro = $("#intro");
var intro2 = $("#intro2");
var nameInput = $("#nameInput");
var pStats = $("#pStats");
var tutorial = $("#tutorial");
var startBattleDiv = $("#startBattleDiv");
var startBattleP = $("#startBattleP");
var eContainer = $("#eContainer");
var enemyName = $("#enemyName");
var enemyStats = $("#enemyStats");
var enemyDiv = $("#enemy");
var enemyP = $("#enemyP");
var playerOptions = $("#playerOptions");
var eHealth = $(".eHealth");
var eAttack = $(".eAttack");
var eDefense = $(".eDefense");
var descriptor = $("#descriptorP");
var aboutDiv = $("#aboutDiv");
var magicOptionsDiv = $("#magicOptionsDiv");
var pField = $("#pField");
var theKingdom = $("#theKingdom");
var theShop = $("#theShop");
var itemListDiv = $("#itemListDiv");
var itemInfoDiv = $("#itemInfoDiv");
var itemListTable = $("#itemListTable");
var shopMessage = $("#shopMessage");
var shopOptions = $("#shopOptions");
var shopBuy = $("#shopBuy");
var shopSell = $("#shopSell");
var itemStatsList = $("#itemStatsList");
var itemInfoKeys = ["Id","Name","Type","Attack","Defense","Cost","Value",];
var itemKey;
//buttons
var tossBTN = $("#toss");
var atkBTN = $("#atkBTN");
var dfndBTN = $("#dfndBTN");
var magicBTN = $("#magicBTN");
var healBTN = $("#healBTN");
var flamesBTN = $("#flamesBTN");
var retreatBTN = $("#retreatBTN");
var moreInfoBTN = $("#moreInfo");
var enemyIMG = $("#enemyImg");
var enemyPageBTN = $("#enemyPageBTN");
var enterArenaBTN = $("#enterArenaBTN");
var shopBTN = $("#shopBTN");
var learnMagicBTN = $("#learnMagicBTN");
//victory / defeat divs
var defeat = $("#defeat");
var victory = $("#victory");
//character page
var charPage = $("#characterPage");
var pName = $("#playerName");
var playerPageName = $(".playerName");
var pHealth = $(".pHealth");
var pAttack = $(".pAttack");
var pDefense = $(".pDefense");
var pGold =$(".yourGold");
var defenseUpSpan = $(".defenseUpSpan");
var charWins = $(".wins");
var charLoses = $(".loses");
var pCrit = $(".pCrit");
var totalNumberOfCrits = $(".numberOfCrits");
var highestCrit = $(".highestCrit");
var numberOfAttacks = $(".numberOfAttacks");
var totalDamageDone = $(".totalDamageDone");
var averageAttack = $(".averageAttack");
var attacksMissedSpan = $(".attacksMissed");
var characterRestore = new playerCharBasic();
//lock outs_______________________________-
//shopBTN.prop("disabled", true);
learnMagicBTN.prop("disabled", true);
//dfndBTN.prop("disabled", true);
//magicBTN.prop("disabled", true);
//retreatBTN.prop("disabled", true);
enemyPageBTN.prop("disabled", true);
healBTN.prop("disabled", true);
flamesBTN.prop("disabled", true);
//end lock outs_________________________
//defined variables
var playerName;
var gameOn = false;
var battleOn = false;
var numOfRolls = 0;
var roll;
var rollTotal;
var attackRoll;
var attackDMG;
var player;
var currentEnemy;
var playerTurn = false;
var enemyTurn = false;
var totalTurns;
var coinFlip;
var defenseRoll;
var hitRoll;
var critStrike;
var battleOn = false;
var enemyListener;
var gameListener;
var retreatNow;
var defeated = false;
var victorious = false;
var inTavern = false;
var inArenaLobby = false;
var inShop = false;
var i = 0;
var mainBackground = ["images/castleday.jpg","images/castlesunset.jpg","images/castlenight.jpg"];


function gameStart() {
  player = new playerCharBasic();
  currentEnemy = new enemyBasic();
  nameInput = $("#nameInput").val();
  player.name = nameInput;
  playerName = player.name;
  pName.text(playerName);
  intro2.fadeOut(400,
    function() {
      main.fadeIn(400);
      theKingdom.fadeIn(400);
      pStats.fadeIn(400);
      enemyStats.fadeIn(400);
      inTavern = true;
    }); 
}


/* CONSTRUCTORS---------------------------- */
//character constructor - 
function playerCharBasic() { //creates a player object
  this.name = playerName;
  this.health = 150;
  this.attack = 50;
  this.defense = 50;
  this.defenseUp = 0;
  this.crit = 49;
  this.gameStats = {
    wins: 0,
    loses: 0,
    totalBattles: 0,
    numberOfAttacks: 0,
    damageDone: 0,
    numberOfCrits: 0,
    highestCrit: 0,
    attacksMissed: 0,
  };
  this.gold = 0;
  this.inventory = [shopItems[0]];
  this.equipped = {
    "weaponEquipped": false,
    "armorEquipped": false,
    "pHelmet":"none",
    "pChestpiece":"none",
    "pPants":"none",
    "gloves":"none",
    "pWeapon":"none",
    "pShield":"none",
    "totalAttack": 0,
    "totalDefense": 0,
  };
}

//Enemy constructor - 
function enemyBasic() { //makes basic enemy
  this.name = "Orc Warrior";
  this.health = 125;
  this.attack = 40;
  this.defense = 40;
  this.defenseUp = 0;
  this.crit = 40;
}
/* END CONSTRUCTORS--------------------- */

/*ESSENTIALS -------------------------*/

//-----BASIC ENEMY AI----------
function eDecision() { //just checks if it is the enemy turn then attacks.
  if (enemyTurn) {
    attack(enemyTurn, currentEnemy, player);
  }
}

//---GAME LISTENERS -----------
function listen() { //runs during battle and constantly checks player vs enemy health.
  if (player.health <= 0 || defeated) { //DEFEAT
    clearInterval(enemyListener);
    clearInterval(gameListener);
    battleOn = false;
    playerOptions.fadeOut(400);
    enemyP.fadeOut(300);
    descriptor.fadeOut(400);
    tossBTN.fadeOut(400);
    //eContainer.fadeOut(400);
    //startBattleDiv.fadeIn(400);
    victory.fadeOut(200);
    player.gameStats.loses += 1;
    defeat.fadeIn(400);
  } else if (currentEnemy.health <= 0) { //VICTORY
    playEnemyDeath(); //function from text-rpg-animations.js
    player.gold += 15;
    clearInterval(enemyListener);
    clearInterval(gameListener);
    battleOn = false;
    defeat.fadeOut(200);
    enemyP.fadeOut(300);
    descriptor.fadeOut(400);
    tossBTN.fadeOut(400);
    playerOptions.fadeOut(400);
    startBattleDiv.fadeIn(400);
    player.gameStats.wins += 1;
    victory.fadeIn(400);
  }
  updateStats();
}

// Update player and enemy stats
function updateStats(all) { 
  pHealth.html(player.health);
  eHealth.html(currentEnemy.health);
  if (all) {
    pAttack.html(player.attack);
    pDefense.html(player.defense);
    enemyName.html(currentEnemy.name);
    eAttack.html(currentEnemy.attack);
    eDefense.html(currentEnemy.defense);
  }
}


function listeners() { //setInterval's that are called during battle
  enemyListener = setInterval(eDecision, 3000);
  gameListener = setInterval(listen, 200);
}


//exit game
function exitGame() { //Mostly working as far as I can tell.
  var confirmExit = confirm("Are you sure you want to exit the game? All data will be lost.");
  if (confirmExit) {
    clearInterval(enemyListener);
    clearInterval(gameListener);
    defeat.fadeOut(300);
    victory.fadeOut(300);
    pStats.fadeOut(300);
    enemyStats.fadeOut(300);
    gameOn = false;
    battleOn= false;
    defeated = false;
    victorious = false;
    intro2.fadeOut(400);
    eContainer.fadeOut(400);
    enemyDiv.fadeOut(400);
    playerOptions.fadeOut(400);
    intro.fadeIn(400);

  }
}

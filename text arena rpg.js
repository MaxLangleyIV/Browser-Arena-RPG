//Welcome to the core file of my little game!
//There's a lot going on here and it got a little messy
//In the future I would divide this file into multiple .js files to make it cleaner
//I consider all of this code open source so feel free to use it in your own projects
//If you do use my code send me a link I would love to see it in action!
//This game was writtin in the Sublime Text editor, I highly recommend you check it out!
//Cheers!

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
//was gonna make a day / night cycle with mainBackground but didn't get around to it.
/*END DEFINED VARIABLES-------------------*/

/*BASICS--------------------------------*/
//Basic Roll function
function rollDice(dieSize, numOfDice) {//rolls up to dieSize and has the option of rolling multiple times
  numOfRolls = 0;
  if (numOfDice == 1) {
    roll = Math.floor(Math.random() * dieSize) + 1;
    rollTotal = roll;
    numOfRolls++;
  } else {
    while (numOfRolls < numOfDice) {
      roll = Math.floor(Math.random() * dieSize) + 1;
      rollTotal += roll;
      numOfRolls++;
    }
  }
}
//COIN TOSS FOR FIRST TURN
function coinToss() { // simulates a coin flip for first turn
  coinFlip = Math.floor(Math.random() * 2);
  if (coinFlip == 1) {
    playerTurn = true;
    descriptor.text("It is your turn.");
  } else {
    playerTurn = false;
    enemyTurn = true;
    descriptor.text("It is the enemy's turn.");
  }
  tossBTN.fadeOut(300);
  descriptor.fadeIn(300);
  battleOn = true; //used to keep track of if you are in battle
}

//SWITCH TURNS FUNCTION
function switchTurns() { //called when you make a decision in battle
  if (playerTurn) {
    playerTurn = false;
    enemyTurn = true;
    descriptor.text("It's the enemie's turn!");
  } else {
    enemyTurn = false;
    playerTurn = true;
    descriptor.text("It's your turn!");
  }
}

//SHOP SETTINGS

/*END BASICS-----------------------------*/

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
//CHARACTER PAGE FUNCTIONS__________________________________________________________________________________________________
function showCharPage() { //check what you are doing and hides that div to display the char' page
	if (battleOn){
    pField.toggle(400);
  }
  if (inTavern){
  	theKingdom.toggle(400);
  }
  if (inArenaLobby){
  	pField.toggle(400);
  }
  if (inShop){
    theShop.toggle(400);
  }
  $('#pInventory').fadeOut(400);
  $("#pItemStatsWrapper").fadeOut(200);
  charPage.toggle(400);
  playerPageName.html(player.name);
  pHealth.html(player.health);
  pAttack.html(player.attack);
  pDefense.html(player.defense);
  pCrit.html(player.crit);
  pGold.html(player.gold);
  charWins.html(player.gameStats.wins);
  charLoses.html(player.gameStats.loses);
  totalNumberOfCrits.html(player.gameStats.numberOfCrits);
  highestCrit.html(player.gameStats.highestCrit);
  numberOfAttacks.html(player.gameStats.numberOfAttacks);
  totalDamageDone.html(player.gameStats.damageDone);
  averageAttack.html((player.gameStats.damageDone / (player.gameStats.numberOfAttacks - player.gameStats.attacksMissed)));
  attacksMissedSpan.html(player.gameStats.attacksMissed);
}

function showEquipped(){
  $('#pEquipped').toggle(400);
}

function showInventory(){ //checks what items you have and adds them to the inventory div
  pItemStatsDiv.fadeOut(50);
  $("#pItemStatsWrapper").fadeOut(50);
  $('#pInventory').toggle(400);
  $("#pInventoryDiv").html("");
  if (player.inventory.length > 0){
    i = 0;
    $('#pInventoryMessage').html("");
    while (i < player.inventory.length){
      $('#pInventoryDiv').append('<li class="pItemP" onclick="pItemStats('+i+')">'+player.inventory[i].Name+'</li>');
      i++;
    }   
  } else {
    $('#pInventoryMessage').html("Empty");
  }
}
$('#pInventory').on("mouseenter", ".pItemP", function() { //changes color when you mouse over it
      $(this).css("color", "white");
      
    });

$('#pInventory').on("mouseleave", ".pItemP", function() { //changes color back when mouse leaves the item
  $(this).css("color", "black");
      
    });
var pItemStatsDiv = $("#pItemStats");
function pItemStats(id){
  pItemStatsDiv.html("");
  $("#pItemStatsWrapper").fadeOut(200); //stopped defining all my jQuery and started using the "$("#elementID")..."
  $("#itemStatsIMG").attr("src", player.inventory[id].img);//checks what you clicked and shows the image for it
  $("#pItemStatsWrapper").fadeIn(400);
  pItemStatsDiv.fadeOut(200);
  pItemStatsDiv.fadeIn(400);
  //pItemStatsDiv.html("");
  thisItem = player.inventory[id];
  //alert(thisItem);
  i = 1;
  while (i < (itemInfoKeys.length - 2)){
    itemKey = itemInfoKeys[i];
    //alert(thisItem[itemKey]);
    pItemStatsDiv.append('<p>'+itemKey+': '+thisItem[itemKey]+'</p>');
    //alert("should have appended");
    i++;
  }
}

function equipItem(){
    $('#'+thisItem.slot).html(thisItem.Name);
    pEquipped[thisItem.slot] = thisItem;
    if (thisItem.slot == "pWeapon"){
      player.equipped.weaponEquipped = true;
      player.equipped.totalAttack += thisItem.Attack;
      player.attack += player.equipped.totalAttack;
    }
    else if (thisItem.slot == "pChestpiece"||"pPants"||"pShield"||"pGloves"){
      player.equipped.armorEquipped = true;
      player.equipped.totalDefense += thisItem.Defense;
      player.defense += player.equipped.totalDefense;
    }
    updateStats(true);
    alert('Successfully equipped '+pEquipped[thisItem.slot].Name+'!');
}
$('#pEquipped').on("mouseenter", "span", function() {//same as above hover function, changes text color
      $(this).css("color", "white");
      
    });

$('#pEquipped').on("mouseleave", "span", function() {
  $(this).css("color", "black");
      
    });
function closePItemStats(){
  $("#pItemStatsWrapper").fadeOut(400);
}
function showGameStats(){
  $('#gameStats').toggle(400);
}
//________________________________________________________________________________________________
//TOGGLE WINDOWS______________________________________________________________________________________________________
//The following is a bunch of functions that open and close different divs
function openTutorial(open, close) {
  tutorial.toggle(400);
  if (close && battleOn) {
    playerOptions.fadeIn(400);
  } else if (open && battleOn) {
    playerOptions.fadeOut(400);
  }
}

function moreInfo() {
  moreInfoBTN.toggle(400);
  if (battleOn) {
    //playerOptions.toggle(400);
  }
}

function openAbout() {
  aboutDiv.toggle(400);
}

function openMagicDiv() {
  magicOptionsDiv.toggle(400);
}

//Intro function
function startIntro() {
  if (gameOn == false) {
    intro.fadeOut(400);
    intro2.fadeIn(600);
    gameOn = true;
  }
}

//Game screen / not a loop lol, didnt rename it because I was lazy...
function gameLoop() {
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

function enterArena(){
	inTavern = false;
	defeated = false;
  inArenaLobby = true;
	victory.fadeOut(200);
	defeat.fadeOut(200);
  enemyIMG.fadeOut(200);
	theKingdom.fadeOut(400);
	pField.fadeIn(400);
  startBattleDiv.fadeIn(300);
  startBattleP.fadeIn(300);
}

function backToTavern(){
  theShop.fadeOut(400);
	pField.fadeOut(400);
  eContainer.fadeOut(400);
  theKingdom.fadeIn(400);
  inShop = false;
  inArenaLobby = false;
  battleOn = false;
  inTavern = true;
}
//________________________________________________________________________________________________
//SHOP FUNCTIONS_____________________________________________________________________________________________
function openShop(){
  inTavern = false;
  inShop = true;
  theKingdom.fadeOut(400);
  theShop.fadeIn(400);
  shopMessage.fadeIn(400);
  shopOptions.fadeIn(400);
}
function buyStuff(open, close){ //needs clean up
  if  (open){
    shopOptions.fadeOut(400);
    shopBuy.fadeIn(400);
    i = 0
    itemListTable.html("");
    while (i < shopItems.length){
      itemListTable.append('<tr><td class="shopItem" onclick="itemInfo('+shopItems[i].id+')">' + shopItems[i].Name + '</td></tr>');
      i++;
    }
    
    var shopItem = $(".shopItem");
    itemListTable.on("mouseenter", "td", function() {
      $(this).css("color", "gray");
      
    });

    itemListTable.on("mouseleave", "td", function() {
      $(this).css("color", "white");
      
    });
  }
  else if (close) {
    shopBuy.fadeOut(400);
    itemInfoDiv.fadeOut(400);
    shopOptions.fadeIn(400);
  }
  
}
function sellStuff(){ // cant sell stuff yet, sorry!
  shopOptions.toggle(400);
  shopSell.toggle(400);
}
var thisItem;
function itemInfo(id){ //shows you the object info of the item you clicked on
  $("#itemIMG").attr("src", "")
  $("#itemIMG").attr("src", shopItems[id].img)
  itemStatsList.html("");
  pGold.html(player.gold);//shows how much gold you currently have
  thisItem = shopItems[id];
  i = 1;
  while (i < (itemInfoKeys.length - 1)){// uses .length - 1 so that it doesnt list every key and value just the ones i want
    itemKey = itemInfoKeys[i];
    //alert(thisItem[itemKey]);
    itemStatsList.append('<p>'+itemKey+': '+thisItem[itemKey]+'</p>');
    i++;
  }

  itemInfoDiv.fadeIn(400);
  itemStatsList.fadeIn(400); 
  
}
var confirmBuy;
function purchase(){ //confirms then adds to your inventory (player.inventory)
    confirmBuy = confirm("Do you wish to purchase "+ thisItem.Name + "?");
    if (confirmBuy){
      //alert("in buy loop");
      if (player.gold >= thisItem.Buy){
        //alert("in second buy loop");
      player.gold -= thisItem.Buy;
      player.inventory.push(thisItem);
      pGold.html(player.gold);
      alert(thisItem.Name + " has been added to your inventory!");
    } else {
      alert("I'm sorry, you don't have enough gold.");
    }
    }
      }
//__________________________________________________________________________________________________________
//START BATTLE________________________________________________________________________________________________ - 
function battle() { //a lot of fading things in and out, also starts the game listeners (setInterval's)
  listeners();
  updateStats(true);
  inArenaLobby = false;
  battleOn = true;
  playerTurn = false;
  enemyTurn = false;
  defeated = false;
  victorious = false;
  player.gameStats.totalBattles += 1;
  enemyIMG.fadeOut(300);
  victory.fadeOut(300);
  defeat.fadeOut(300);
  descriptor.fadeOut(300);
  tossBTN.fadeIn(300);
  player.health = characterRestore.health;
  currentEnemy.health = 125;
  updateStats(true);
  enemyP.text("A bloodthirsty orc enters the arena!");
  enemyP.fadeIn(300);
  startBattleDiv.fadeOut(500);
  startBattleP.fadeOut(500);
  enemyDiv.fadeIn(1000);
  enemyIMG.attr('src', troll1AttackArray[0]);
  enemyIMG.css("padding-top", "0px");
  enemyIMG.height('100%');
  enemyIMG.fadeIn(1000);
  playerOptions.fadeIn(400);
  eContainer.fadeIn(400);
}

//-----BASIC ENEMY AI----------______________________________________________________________________
function eDecision() { //just checks if it is the enemy turn then attacks.
  if (enemyTurn) {
    attack(enemyTurn, currentEnemy, player);
  }
}

//---GAME LISTENERS -----------____________________________________________________________________________
function listen() { //runs durring battle and constantly checks player vs enemy health.
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

function updateStats(all) { //Basic function to update player and enemy stats
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

function listeners() { //setInterval's that are called durring battle
  enemyListener = setInterval(eDecision, 3000);
  gameListener = setInterval(listen, 200);
}

//_____________________________________________________________________________________________________

/* COMBAT FUNCTIONS---------------------------________________________________________________________________*/
//this is the main attack function
//it requires the arguments of whos turn it is, who is attacking and who they are targeting
//calling the function would look like "attack(playerTurn, player, currentEnemy);"
function attack(checkTurn, character, target) { 
  if (checkTurn) { //only lets you attacking if it is your turn
  	if (character.defenseUp > 0) {//Clears any bonus defense points from the "Defend" button
        	character.defenseUp = 0;
      }
    defenseUpSpan.html(character.defenseUp);
  	critStrike = false;
    rollDice(character.attack, 1);//calls the rollDice with a dieSize of the character attack points.
    hitRoll = rollTotal;//In D&D you roll to see if you hit, then you roll for attack damage.
    if (hitRoll >= player.crit) { 
    	critStrike = true; //A critical strike is determined by the hit roll but makes your attack roll x2
    }
    if (hitRoll >= (target.defense + target.defenseUp) / 3) { //if your hit roll is < 1/3 the target defense you miss
      attackRoll = rollDice(character.attack, 1);
      if (critStrike){
      	rollTotal *= 2;
      }
      attackDMG = rollTotal;
      //alert(attackDMG);  
      //The following is logic for if the attack function is being used by the player or the enemy
      //In the future I would like to seperate this logic from the attack function somehow
      if (character == player) {
  			if (critStrike){
        player.gameStats.numberOfCrits += 1; }
        if (attackDMG > player.gameStats.highestCrit) {
          player.gameStats.highestCrit = attackDMG;
        }
        playEnemyDamaged();//plays animation
        enemyP.text("You attack the enemy for " + attackDMG + " damage!");
        currentEnemy.health -= attackDMG;
        player.gameStats.damageDone += attackDMG;
        player.gameStats.numberOfAttacks += 1;
      } else if (character == currentEnemy) {
        playEnemyAttack();//plays animation
        enemyP.text(currentEnemy.name + " attacks you for " + attackDMG + " damage!");
        player.health -= attackDMG;
      }

    } else if (hitRoll < (target.defense + target.defenseUp) / 3) { //code for if the attack missed
      if (character == player) {
        enemyP.html("Your attack missed the enemy!");
        player.gameStats.numberOfAttacks += 1;
        player.gameStats.attacksMissed += 1;
      } else if (character == currentEnemy) {
        playEnemyAttack();
        enemyP.html("The enemy's attack missed you!");
      }
    }

    switchTurns();

  } else {
    alert("It is not your turn yet.")
  }

}

function defend(checkTurn, character) { //This rolls the dice and temporarily increases your defense by that much
  if (checkTurn) {
    rollDice(character.defense, 1, character.crit);
    defenseRoll = rollTotal;
    character.defenseUp = defenseRoll;
    if (character == player) {
      enemyP.text("You raised your defense by " + defenseRoll + " points!");
      defenseUpSpan.html(character.defenseUp);

      switchTurns();
    }
  } else {
    alert("It's not your turn yet.");
  }
}

function magic() {}//Sorry, didn't get to it...

function retreat() {
	retreatNow = confirm("Are you sure you want to surrender? This will be counted as a defeat.");
  if (retreatNow){
  	defeated = true;//The listener sees this and triggers defeat
  }
}
//________________________________________________________________________________________________
/*END COMBAT FUNCTIONS---------------------------*/

//exit game - mostly working
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

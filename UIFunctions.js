//CHARACTER PAGE FUNCTIONS
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

  thisItem = player.inventory[id];
  
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



function startIntro() {
  if (gameOn == false) {
    intro.fadeOut(400);
    intro2.fadeIn(600);
    gameOn = true;
  }
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

// COMBAT FUNCTIONS
//this is the main attack function
//Parameters: Current turn, attacker, target
//"attack(playerTurn, player, currentEnemy);"

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
      //In the future I would like to separate this logic from the attack function somehow
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

//START BATTLE
function battle() { 
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
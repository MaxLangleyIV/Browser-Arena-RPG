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
    descriptor.text("It's the enemy's turn!");
  } else {
    enemyTurn = false;
    playerTurn = true;
    descriptor.text("It's your turn!");
  }
}

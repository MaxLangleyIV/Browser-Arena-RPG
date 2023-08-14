var animation; //Pre-defined to use with setInterval()
var i = 0; //Pre defined to use in loops
var enemyIMG = $("#enemyImg"); // fetch a DOM element with jQuery

var troll1AttackArray = [ //An array of image locations, to be used in a loop to make an animation
"images/Troll1/Attack_000.png",
"images/Troll1/Attack_001.png",
"images/Troll1/Attack_002.png",
"images/Troll1/Attack_003.png",
"images/Troll1/Attack_004.png",
"images/Troll1/Attack_005.png",
"images/Troll1/Attack_006.png",
"images/Troll1/Attack_007.png",
"images/Troll1/Attack_008.png",
"images/Troll1/Attack_009.png"];

var troll1DamagedArray = [ //An array of image locations, to be used in a loop to make an animation
"images/Troll1/Hurt_000.png",
"images/Troll1/Hurt_001.png",
"images/Troll1/Hurt_002.png",
"images/Troll1/Hurt_003.png",
"images/Troll1/Hurt_004.png",
"images/Troll1/Hurt_005.png",
"images/Troll1/Hurt_006.png",
"images/Troll1/Hurt_007.png",
"images/Troll1/Hurt_008.png",
"images/Troll1/Hurt_009.png"];

var troll1DeadArray = [ //An array of image locations, to be used in a loop to make an animation
"images/Troll1/Dead_000.png",
"images/Troll1/Dead_001.png",
"images/Troll1/Dead_002.png",
"images/Troll1/Dead_003.png",
"images/Troll1/Dead_004.png",
"images/Troll1/Dead_005.png",
"images/Troll1/Dead_006.png",
"images/Troll1/Dead_007.png",
"images/Troll1/Dead_008.png",
"images/Troll1/Dead_009.png"];

function playEnemyAttack(){
	clearInterval(animation); //Clears animation to avoid potential overlapping
	i = 0; //set i to 0 incase it has been changed somewhere
	animation = setInterval(function(){
		enemyIMG.attr('src', troll1AttackArray[i]);
		i++;
	if (i > 9){
		//alert("in clear loop"); //for troubleshooting
		enemyIMG.css("padding-top", "0px");
		enemyIMG.height('100%');
		enemyIMG.attr('src', troll1AttackArray[0]);
		clearInterval(animation); //ends animation once it's looped through all the images
	}
	}, 50); //end of setInterval function, runs 20x per second
}

function playEnemyDamaged(){ //same as above just different images used
	clearInterval(animation);
	i = 0;
	animation = setInterval(function(){
		enemyIMG.css("padding-top", "10%");//adjusting for image size differences
		enemyIMG.height('70%');//adjusted size because the images files dont all match
		enemyIMG.attr('src', troll1DamagedArray[i]);
		i++;
		//alert(i);
	if (i > 9){
		//alert("in clear loop");
		enemyIMG.css("padding-top", "0px");
		enemyIMG.height('100%');
		enemyIMG.attr('src', troll1AttackArray[0]);
		clearInterval(animation);
	}
	}, 50);
}

function playEnemyDeath(){ //same as above just different images used
	clearInterval(animation);
	i = 0;
	animation = setInterval(function(){
		enemyIMG.attr('src', troll1DeadArray[i]);
		i++;
		//alert(i);
	if (i > 9){
		clearInterval(animation);
	}
	}, 50);
}
	

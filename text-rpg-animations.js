var animation;
var i = 0;
var enemyIMG = $("#enemyImg");
var troll1AttackArray = [
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

var troll1DamagedArray = [
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

var troll1DeadArray = [
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
	clearInterval(animation);
	i = 0;
	animation = setInterval(function(){
		//enemyIMG.height('60%');
		enemyIMG.attr('src', troll1AttackArray[i]);
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

function playEnemyDamaged(){
	clearInterval(animation);
	i = 0;
	animation = setInterval(function(){
		enemyIMG.css("padding-top", "10%");
		enemyIMG.height('70%');
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

function playEnemyDeath(){
	clearInterval(animation);
	i = 0;
	animation = setInterval(function(){
		//enemyIMG.height('60%');
		enemyIMG.attr('src', troll1DeadArray[i]);
		i++;
		//alert(i);
	if (i > 9){
		//alert("in clear loop");
		//enemyIMG.height('60%');
		//enemyIMG.attr('src', troll1AttackArray[0]);
		clearInterval(animation);
	}
	}, 50);
}
	

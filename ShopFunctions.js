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
  while (i < (itemInfoKeys.length - 1)){// uses .length - 1 so that it doesn't list every key and value just the ones i want
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
      
      if (player.gold >= thisItem.Buy){
        
      player.gold -= thisItem.Buy;
      player.inventory.push(thisItem);
      pGold.html(player.gold);
      alert(thisItem.Name + " has been added to your inventory!");
    } else {
      alert("I'm sorry, you don't have enough gold.");
    }
  }
}


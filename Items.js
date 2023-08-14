var shopItems = [ //Array of objects that the shop uses to make its item list.
  {
    "id": 0,
    "Name": "Rusted Sword",
    "Type": "1-Hand Weapon",
    "Attack": 10,
    "Defense": 0,
    "Cost": 15+"g",
    "Value": 10+"g",
    "Buy": 15,
    "slot": "pWeapon",
    "img":"images/icon_sword_short1.png"
  },
  {
    "id": 1,
    "Name": "Chainmail Shirt",
    "Type": "Chestpiece",
    "Attack": 0,
    "Defense": 10,
    "Cost": 20+"g",
    "Value": 15+"g",
    "Buy": 20,
    "slot": "pChestpiece",
    "img": "images/armor.png"

  } ,
  {
    "id": 2,
    "Name": "Leather Pants",
    "Type": "Pants",
    "Attack": 0,
    "Defense": 5,
    "Cost": 15+"g",
    "Value": 10,
    "Buy": 15,
    "slot": "pPants",
    "img": "images/icon_cloth_pants1.png"
  },
  {
    "id": 3,
    "Name": "Wooden Shield",
    "Type": "Shield",
    "Attack": 0,
    "Defense": 10,
    "Cost": 20+"g",
    "Value": 15+"g",
    "Buy": 20,
    "slot": "pShield",
    "img": "images/shieldSmall.png"
  },
  {
    "id": 4,
    "Name": "Steel Sword",
    "Type": "1-Hand Weapon",
    "Attack": 20,
    "Defense": 0,
    "Cost": 150+"g",
    "Value": 125+"g",
    "Buy": 150,
    "slot": "pWeapon",
    "img": "images/icon_sword_long1.png"
  }

];

// was gonna make it so that there was a chance of items dropping on victory but didn't get to it
var dropItems = [ 
  { "id": 0,
    "Name": "Tattered Tunic",
    "Type": "Chestpiece",
    "Attack": 0,
    "Defense": 5,
    "Value": 5,
    "Buy": 5,
    "slot": "pChestpiece",

  },
  {
    "id": 1,
    "Name": "Tattered Pants",
    "Type": "Chestpiece",
    "Attack": 0,
    "Defense": 5,
    "Value": 5,
    "Buy": 20,
    "slot": "pPants",
  }
]
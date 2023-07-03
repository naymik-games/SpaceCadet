function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}
loadFont("KenneyPixelSquare", "assets/fonts/KenneyPixelSquare.ttf");
loadFont("KenneyMiniSquare", "assets/fonts/KenneyMiniSquare.ttf");
loadFont("Gamer", "assets/fonts/Gamer.ttf");


let playerData
let playerDataDefault = {
  sector: 1,
  hp: 5,
  hpMax: 5,
  power: 10,
  xp: 0,
  xpMax: 15,
  armor: 2,
  armorMax: 2,
  armorRad: false,
  scanner: false,
  currentSector: 0,
  enemiesKilled: 0,
  cardsFlipped: 0,
  rank: 1,
  slots: [{ type: 'PISTOL2', ammo: 2 }, { type: 'MEDKIT3', ammo: 0 }, { type: 'RIFLE1', ammo: 1 }],
  backPackSlot: [null],
  backPack: false
}


let sector = []
/* let sectors = [
  ['EMPTY', 'BATTERY', 'SCANNER', 'EXIT', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SCORPOID', 'BATTERY', 'EXPLOSION'],
  ['EMPTY', 'BATTERY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION'],
  ['EMPTY', 'BATTERY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION'],
  ['EMPTY', 'BATTERY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION']
] */
//definately will appear per rank
let rankFixed = [
  [null],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
  ['EMPTY', 'EXIT', 'BATTERY'],
]
//enemies available per rank
let rankEnemies = [
  [null],
  ['SCORPOID', 'BEASTBOT', 'SCORPOID', 'BEASTBOT'],
  ['SCORPOID', 'BEASTBOT', 'SPIDERBOT', 'SPIDERBOT'],
  ['SCORPOID', 'BEASTBOT', 'SPIDERBOT', 'TROOPER', 'BEASTBOT'],
  ['BEASTBOT', 'SPIDERBOT', 'TROOPER', 'TROOPER', 'SCAVBOT'],
  ['BEASTBOT', 'SPIDERBOT', 'TROOPER', 'SCAVBOT', 'TROOPER', 'SCAVBOT'],
  ['BEASTBOT', 'SPIDERBOT', 'TROOPER', 'SCAVBOT', 'REPTOID', 'TROOPER', 'SCAVBOT'],
  ['SPIDERBOT', 'TROOPER', 'SCAVBOT', 'REPTOID', 'DREADBOT', 'SCAVBOT', 'REPTOID', 'DREADBOT'],
  ['SPIDERBOT', 'TROOPER', 'SCAVBOT', 'REPTOID', 'DREADBOT', 'SCAVBOT', 'REPTOID', 'DREADBOT'],
  ['BEASTBOT', 'SPIDERBOT', 'TROOPER', 'SCAVBOT', 'REPTOID', 'DREADBOT', 'REPTOID', 'DREADBOT', 'REPTOID', 'DREADBOT'],
  ['BEASTBOT', 'SPIDERBOT', 'TROOPER', 'SCAVBOT', 'REPTOID', 'DREADBOT', 'BEAST', 'SCAVBOT', 'REPTOID', 'DREADBOT', , 'SCAVBOT', 'REPTOID', 'DREADBOT',],
]

let rankWeapons = [
  [null],
  ['KNIFE', 'GERNADE', 'PISTOL1', 'RIFLE1'],
  ['KNIFE', 'GERNADE', 'PISTOL2', 'RIFLE1', 'SHOTGUN1'],
  ['GERNADE', 'PISTOL2', 'RIFLE3', 'SHOTGUN2', 'RIFLE1'],
  ['GERNADE', 'PISTOL2', 'MACHINEGUN', 'SHOTGUN2', 'RIFLE1']
  ['GERNADE', 'PISTOL2', 'MACHINEGUN', 'SHOTGUN1', 'RIFLE3', 'RIFLE1'],
  ['GERNADE', 'PISTOL1', 'MACHINEGUN', 'SHOTGUN2', 'RIFLE3', 'RIFLE1', 'KNIFE'],
  ['GERNADE', 'PISTOL1', 'MACHINEGUN', 'SHOTGUN1', 'RIFLE3', 'RIFLE1', 'ROCKETLAUNCHER'],
  ['GERNADE', 'PISTOL2', 'MACHINEGUN', 'SHOTGUN1', 'SHOTGUN2', 'RIFLE3', 'RIFLE1', 'BLASTERRIFLE'],
  ['GERNADE', 'PISTOL2', 'MACHINEGUN', 'SHOTGUN1', 'SHOTGUN2', 'RIFLE1', 'RIFLE1', 'ROCKETLAUNCHER', 'BLASTERRIFLE'],
  ['GERNADE', 'PISTOL2', 'MACHINEGUN', 'SHOTGUN2', 'SHOTGUN2', 'RIFLE3', 'RIFLE1', 'ROCKETLAUNCHER', 'BLASTERRIFLE']
]

let rankDamage = [
  [null],
  ['BREACH'], //['EXPLOSION'],
  ['RADIATION'],
  ['EXPLOSION', 'RADIATION'],
  ['EXPLOSION', 'RADIATION'],
  ['BREACH'],
  ['EXPLOSION', 'BREACH'],
  ['RADIATION', 'BREACH'],
  ['RADIATION', 'BREACH', 'EXPLOSION'],
  ['RADIATION', 'BREACH', 'EXPLOSION'],
  ['RADIATION', 'BREACH', 'EXPLOSION'],
]
let rankPowerup = [
  [null],
  ['MEDKIT1', 'MEDKIT3', 'ARMOR1', 'MEDKIT1', 'MEDKIT3', 'ARMOR1'],
  ['MEDKIT1', 'MEDKIT3', 'ARMOR1', 'ARMOR2', 'ARMOR3'],
  ['MEDKIT1', 'MEDKIT3', 'MEDKIT5', 'ARMOR1', 'ARMOR2', 'ARMOR3'],
  ['MEDKIT1', 'MEDKIT3', 'MEDKIT5', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4'],
  ['MEDKIT1', 'MEDKIT3', 'MEDKIT5', 'BATTERY', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4'],
  ['MEDKIT1', 'MEDKIT3', 'MEDKIT5', 'BATTERY', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4'],
  ['MEDKIT3', 'MEDKIT5', 'MEDKIT7', 'BATTERY', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4'],
  ['MEDKIT3', 'MEDKIT5', 'MEDKIT7', 'BATTERY', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4'],
  ['MEDKIT3', 'MEDKIT5', 'MEDKIT7', 'BATTERY', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4', 'ARMOR5'],
  ['MEDKIT1', 'MEDKIT3', 'MEDKIT5', 'MEDKIT7', 'MEDKIT10', 'BATTERY', 'ARMOR1', 'ARMOR2', 'ARMOR3', 'ARMOR4', 'ARMOR5', 'BATTERY'],
]

let rankExtras = [
  [null],
  [null],//null
  ['CRATE'],
  ['CRATE'],
  ['CRATE'],
  ['CRATE', 'SCANNER'],
  ['CRATE', 'SCANNER', 'RADIATIONSUIT', 'PORTAL'],
  ['CRATE', 'SCANNER', 'RADIATIONSUIT', 'PORTAL'],
  ['CRATE', 'SCANNER', 'RADIATIONSUIT', 'PORTAL', 'KEYCARD'],
  ['CRATE', 'SCANNER', 'RADIATIONSUIT', 'PORTAL', 'KEYCARD'],
  ['RADIATIONSUIT', 'SCANNER', 'PORTAL', 'CRATE', 'KEYCARD']
]

function makeSector() {
  sector = JSON.parse(JSON.stringify(rankFixed[playerData.rank]));
  //POPULATE ENEMIES
  var enemyAmount = 2
  var enemies = Phaser.Utils.Array.Shuffle(rankEnemies[playerData.rank])
  for (let i = 0; i < enemyAmount; i++) {
    const element = enemies[i];
    sector.push(element)
  }
  //POPULATE WEAPONS
  var weaponAmount = 2
  var weapons = Phaser.Utils.Array.Shuffle(rankWeapons[playerData.rank])
  for (let i = 0; i < weaponAmount; i++) {
    const element = weapons[i];
    sector.push(element)
  }
  //POPULATE DAMAGE
  var damageAmount = 2
  if (rankDamage[playerData.rank].length > 0) {
    var damage = Phaser.Utils.Array.Shuffle(rankDamage[playerData.rank])
    for (let i = 0; i < damageAmount; i++) {
      if (damage[i]) {
        const element = damage[i];
        sector.push(element)
      }
    }
  }
  //POPULATE POWERUPS
  var powerAmount = 2
  var power = Phaser.Utils.Array.Shuffle(rankPowerup[playerData.rank])
  for (let i = 0; i < powerAmount; i++) {
    const element = power[i];
    sector.push(element)
  }
  //POPULATE EXTRA
  if (rankExtras[playerData.rank].length > 0) {
    var extraAmount = 2
    var extras = Phaser.Utils.Array.Shuffle(rankExtras[playerData.rank])
    for (let i = 0; i < extraAmount; i++) {
      if (extras[i]) {
        const element = extras[i];
        sector.push(element)
      }
    }
  }

}

let rankData = [
  { name: 'CITIZEN', upgrade: null },//NOT USED
  { name: 'RECRUIT', upgrade: null },
  { name: 'CADET', upgrade: '+1 AROMOR' },
  { name: 'PROBIE', upgrade: '+1 HP' },
  { name: 'BOOT', upgrade: 'MACHINE GUN, +1 HP' },
  { name: 'SARGE', upgrade: 'SCANNER, +1 Armor' },
  { name: 'TROOPER', upgrade: 'ESCAPE, +1 HP, +2 Armor' },
  { name: 'VET', upgrade: 'ROCKET LAUNCHER, +1 Armor' },
  { name: 'MARINE', upgrade: 'BACKPACK, BLASTER RIFLE' },
  { name: 'RANGER', upgrade: '+2 HP, +1 Armor' },
  { name: 'GENERAL', upgrade: '+1 Armor' },

]
//+1 armor , +1 hp, machine gun, rocket launcher, +2 armor, +2 hp, esape card, scanner, reserve slot
//RECRUIT, CADET, PROBIE, BOOT, SARGE, TROOPER, VET, MARINE, RANGER, GENERAL
let tips = [
  'THE STRONGER THE ENEMY, THE MORE XP YOU GAIN',
  'RANKING UP GIVES YOU UPGRADES',
  'FLICK DOWN ON YOUR HAND TO FREE UP SPACE',
  'TAP YOUR HAND TO USE THE CARD',
  'A BATTERY WILL FILL ALL YOUR POWER CELLS',
  'A MED KIT WILL ADD HP',
  'FLICK A CARD LEFT TO SKIP',
  'TAP A CARD TO FLIP',
  'SKIPPING AN EXPOSED ENEMY WILL ATTACK YOU',
  'EVERY CARD FLIP TAKES ONE POWER CELL',
  'FLICK A CARD DOWN TO ADD IT TO YOUR HAND',
  'SKIPPED CARDS MOVE FACE UP TO THE BOTTOM OF THE DECK'
]


function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}
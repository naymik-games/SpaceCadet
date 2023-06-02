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


let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
let playerDataDefault = {
  sector: 1,
  hp: 5,
  hpMax: 5,
  power: 10,
  xp: 45,
  xpMax: 50,
  armor: 0,
  armorMax: 2,
  currentSector: 0,
  rank: 1,
  slots: [{ type: 'PISTOL2', ammo: 2 }, { type: 'MEDKIT2', ammo: 0 }, { type: 'RIFLE1', ammo: 1 }]
}

let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0

}
let sectors = [
  ['EMPTY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION'],
  ['EMPTY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION'],
  ['EMPTY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION'],
  ['EMPTY', 'EXIT', 'CRATE', 'RIFLE3', 'PISTOL2', 'ARMOR3', 'ARMOR1', 'BEASTBOT', 'MEDKIT3', 'SPIDERBOT', 'BATTERY', 'RADIATION']
]
let rankData = [
  { name: 'RECRUIT', upgrade: null },
  { name: 'CADET', upgrade: '+1 AROMOR MAX' },
  { name: 'PROBIE', upgrade: '+1 HP MAX' },
  { name: 'BOOT', upgrade: 'null' },
  { name: 'SARGE', upgrade: 'null' },
  { name: 'TROOPER', upgrade: 'null' },
  { name: 'VET', upgrade: 'null' },
  { name: 'MARINE', upgrade: 'null' },
  { name: 'RANGER', upgrade: 'null' },
  { name: 'GENERAL', upgrade: 'null' },

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
  'FLICK A CARD DOWN TO ADD IT TO YOUR HAND'

]


function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}
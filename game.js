let game;

let deck
let stack = []//main card stack
let slots = []//blank hand slots
let playerData

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    pixelArt: true,
    /*   fx: {
        glow: {
          distance: 32,
          quality: 0.1
        }
      }, */
    scene: [preloadGame, startGame, infoRank, playGame, UI, endGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {

    //this.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);

  }
  create() {

    makeSector()

    this.canMove = false
    this.cameras.main.setBackgroundColor(0x000000);
    this.starBack = this.add.tileSprite(0, 0, 900, 1640, 'star_back').setOrigin(0)
    // this.main = this.add.image(game.config.width / 2, game.config.height / 2 - 100, 'cards', 1).setInteractive().setScale(6);
    //this.main.on("pointerdown", this.addScore, this);
    this.hand = []
    this.cardScale = 6


    this.top = this.add.image(0, 0, 'door_back', 0).setScale(4).setOrigin(0).setDepth(100)
    this.bottom = this.add.image(0, game.config.height, 'door_back', 1).setScale(4).setOrigin(0, 1).setDepth(100)
    var starttween = this.tweens.add({
      targets: this.top,
      y: -820,
      duration: 1000,
      delay: 1000
    })
    var starttween = this.tweens.add({
      targets: this.bottom,
      y: game.config.height + 820,
      duration: 1000,
      delay: 1000,
      onComplete: () => {
        this.setGame()
      }
    })
    var sect = playerData.currentSector + 1
    this.sectorText = this.add.text(game.config.width / 2, 700, 'SECTOR ' + pad(sect), { fontFamily: 'KenneyMiniSquare', fontSize: '80px', color: '#fafafa', align: 'left', shadow: { offsetX: 0, offsetY: -10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5).setDepth(101).setAlpha(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    var sectortween = this.tweens.add({
      targets: this.sectorText,
      alpha: 1,
      duration: 500,
      delay: 300,
      /*  onComplete: () => {
         this.setGame()
       } */
    })

    deck = new Deck(this, this.cardScale)







    /*  this.promotionModal = this.plugins.get('rexmodalplugin').add(this.box, {
       cover: {
         color: 0x0,
         alpha: 0.8,
         //     transitIn: function(gameObject, duration) { },
         //     transitOut: function(gameObject, duration) { },
       },
       cover: true,
 
       // When to close modal dialog?
       // touchOutsideClose: false,
       anyTouchClose: true,
       // timeOutClose: false,
       // manualClose: false,
 
       // duration: {
       //     in: 200,
       //     hold: 2000,
       //     out: 200
       // }
 
       // transitIn: 0,
       // transitOut: 0,
 
       destroy: true,
       openOnStart: false
     }); */











    /*    this.test = this.add.image(225, game.config.height / 2 + 500, 'cards', 2).setScale(2.5);
   
       this.test1 = this.add.image(450, game.config.height / 2 + 500, 'cards', 2).setScale(2.5);
   
       this.test2 = this.add.image(675, game.config.height / 2 + 500, 'cards', 2).setScale(2.5); */
    //////
    //ANIMS HERE
    /////
    this.scan = this.add.sprite(game.config.width / 2, 700, 'scan', 0).setScale(3).setAlpha(.5).setDepth(1002)
    this.scan.play('scan_aromor')
    this.scan.on('animationcomplete', function () {
      this.scan.setAlpha(0)
      var sectortween = this.tweens.add({
        targets: this.sectorText,
        alpha: 0,
        duration: 500,
        delay: 300,
        /*  onComplete: () => {
           this.setGame()
         } */
      })
    }, this);

    this.statics = this.add.group({
      defaultKey: 'cards',
      defaultFrame: 0,
      maxSize: 5
    });
    this.explodes = this.add.group({
      defaultKey: 'explosion',
      defaultFrame: 0,
      maxSize: 5
    });
    this.radiates = this.add.group({
      defaultKey: 'radiation',
      defaultFrame: 0,
      maxSize: 5
    });
    this.crates = this.add.group({
      defaultKey: 'crate_explode',
      defaultFrame: 0,
      maxSize: 5
    });
    this.powerups = this.add.group({
      defaultKey: 'powerups',
      defaultFrame: 0,
      maxSize: 5
    });
    this.smallscans = this.add.group({
      defaultKey: 'smallscan',
      defaultFrame: 0,
      maxSize: 5
    });
    this.doors = this.add.group({
      defaultKey: 'door_open',
      defaultFrame: 0,
      maxSize: 5
    });
    this.cardScans = this.add.group({
      defaultKey: 'scan_warning',
      defaultFrame: 0,
      maxSize: 5
    });
    //this.main.on("pointerup", this.endSwipe, this);
    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
    this.addPower()
  }
  update() {

  }
  setGame() {
    this.testText = this.add.text(game.config.width / 2, 250, '05', { fontFamily: 'KenneyMiniSquare', fontSize: '80px', color: '#fafafa', align: 'left' }).setOrigin(.5).setAlpha(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    for (let i = 0; i < 3; i++) {
      var slot = this.add.image(225 + i * 225, game.config.height / 2 + 500, 'cards', 2).setScale(2.5);
      slot.slot = i
      slot.empty = true
      slots.push(slot)
    }

    /*   for (let i = 0; i < 3; i++) {
        var slot = this.add.image(225 + i * 225, game.config.height / 2 + 500, 'cards', 2).setScale(2.5);
        slot.slot = i
        slot.empty = true
        slots.push(slot)
      } */

    this.deal()
    /*     this.addHandCard(0, 'PISTOL2')
        this.addHandCard(1, 'MEDKIT2') */
    console.log(playerData.slots)
    for (let i = 0; i < 3; i++) {
      const spot = playerData.slots[i];
      console.log(spot)
      if (spot.type != null) {
        this.addHandCard(i, spot.type)
        if (spot.ammo > 0) {
          deck.hand[i].ammo = spot.ammo
          deck.hand[i].setFrame(spot.ammo)
        }

      }
    }

    this.scene.launch('UI');
    console.log(playerData)
    this.events.emit('updateVest');
    this.events.emit('power')
    //this.saveGame()

  }
  endGameLose() {
    var endCard = this.add.image(game.config.width / 2, game.config.height / 2 - 100, 'cards', 23).setScale(6).setInteractive()
    /*  .on('pointerup', function () {
      
     }) */
    var timedEvent = this.time.addEvent({
      delay: 2500, callback: function () {
        modelBehavior.requestClose()
      }, callbackScope: this, loop: false
    });
    var modelBehavior = this.plugins.get('rexmodalplugin').add(endCard, {
      manualClose: true,
      transitOut: function (gameObject, duration) {
        var scene = gameObject.scene;
        scene.tweens.add({
          targets: gameObject,
          duration: duration,
          scale: 15,
          alpha: .1
        })
      },
      duration: {
        in: 750,
        out: 500
      },

      // destroy: false
    })
    endCard.setInteractive().on('pointerup', function () {
      modelBehavior.requestClose()
    })
    modelBehavior.on('close', function (closeEventData) {
      this.scene.stop('UI')
      var starttween = this.tweens.add({
        targets: this.top,
        y: 0,
        duration: 1000,
        delay: 500
      })
      var starttween = this.tweens.add({
        targets: this.bottom,
        y: game.config.height,
        duration: 1000,
        delay: 500,
        onComplete: () => {
          // playerData.currentSector++
          //this.saveGame()
          //this.scene.restart()
          this.scene.start('endGame')
        }
      })
    }, this)
  }
  endSector(x, y) {
    //this.scene.pause()
    if (playerData.scanner) {
      playerData.scanner = false
    }
    this.doDoor(x, y)
    /* this.scene.stop('UI')
    var starttween = this.tweens.add({
      targets: this.top,
      y: 0,
      duration: 1000,
      delay: 500
    })
    var starttween = this.tweens.add({
      targets: this.bottom,
      y: game.config.height,
      duration: 1000,
      delay: 500,
      onComplete: () => {
        playerData.currentSector++
        this.saveGame()
        this.scene.restart()
      }
    })
 */
    //  this.scene.start('startGame')

  }
  addHandCard(slot, type) {
    console.log(slot)
    console.log(cardTypes[type])
    /*    var card = this.add.image(slots[slot].x, slots[slot].y, 'cards', cardTypes[type].frame).setScale(2.5).setInteractive()
       card.type = type
       card.slot = slot */
    deck.hand[slot] = new HandCard(this, slots[slot].x, slots[slot].y, cardTypes[type].key, cardTypes[type].frame, type, slot)
    slots[slot].empty = false
    //this.saveGame()
  }
  collectCrate(crate, card) {
    card.ammo -= 1
    //change card to empty room
    if (card.ammo == 0) {
      card.useCard()
    } else {
      card.setFrame(card.ammo)
      card.frameNumber = card.ammo
    }
    //   this.saveGame()
    crate.type = 'EMPTY'
    crate.setFrame(cardTypes['EMPTY'].frame)
    this.doCrate(crate.x, crate.y)
  }
  doBattle(enemy, card) {
    // cardTypes[this.type].action == 'fight' && cardTypes[stack[stack.length - 1].type].action
    card.ammo -= 1
    console.log('enemy hp ' + enemy.hp)
    console.log('card hp ' + card.hp)
    this.doStatic(enemy.x, enemy.y)
    this.cameras.main.flash();
    var tween = this.tweens.add({
      targets: enemy,
      x: '+=25',
      y: '+=50',
      alpha: .3,
      yoyo: true,
      repeat: 3,
      duration: 25,
      onComplete: () => {
        if (card.ammo == 0) {
          card.useCard()
        } else {
          card.setFrame(card.ammo)
          card.frameNumber = card.ammo
        }
        //  this.saveGame()
        if (card.hp >= enemy.hp) {
          enemy.useCard()
          playerData.enemiesKilled++
          playerData.xp += cardTypes[enemy.type].hp
          this.addXP()
        } else {
          enemy.hp -= card.hp
          this.damagePlayer(enemy.hp)
          enemy.takeDamage()
        }

      }
    })

  }
  damagePlayer(amount) {
    /*    let playerDataDefault = {
         sector: 1,
         hp: 5,
         power: 10,
         xp: 0,
         xpMax: 50,
         armor: 0
       } */
    this.cameras.main.shake(200, 0.02)
    if (playerData.armor > 0) {
      if (playerData.armor >= amount) {
        playerData.armor -= amount
        this.addVest()
      } else {
        amount -= playerData.armor
        playerData.armor = 0
        this.addVest()
      }
    }
    /*  if (playerData.power >= amount && amount > 0) {
       if (playerData.power >= amount) {
         playerData.power -= amount
         this.addPower()
       } else {
         amount -= playerData.power
         playerData.power = 0
         this.addPower()
       }
     } */

    if (playerData.hp >= amount && amount > 0) {
      if (playerData.hp >= amount) {
        playerData.hp -= amount
        this.addHP()
      } else {
        amount -= playerData.hp
        playerData.hp = 0
        this.addHP()
      }
    }

  }
  doScan() {
    this.events.emit('scanIcon');
    console.log(cardTypes[stack[stack.length - 1].type].action)
    if (cardTypes[stack[stack.length - 1].type].action == 'attack') {
      var cardscan = this.cardScans.get().setActive(true);
      cardscan.setOrigin(0.5, 0.5).setScale(6).setDepth(1005).setAlpha(1);
      cardscan.setPosition(stack[stack.length - 1].x, stack[stack.length - 1].y)
      cardscan.play('scan_card')
      cardscan.on('animationcomplete', function () {
        cardscan.setActive(false);
        cardscan.setAlpha(0)
      }, this);
    }

  }
  doStatic(x, y) {
    var staticanim = this.statics.get().setActive(true);
    staticanim.setOrigin(0.5, 0.5).setScale(6).setDepth(3).setAlpha(.3);
    staticanim.setPosition(x, y)
    var tween = this.tweens.add({
      targets: staticanim,
      x: '+=5',
      y: '+=50',
      alpha: .0,
      yoyo: true,
      repeat: 3,
      duration: 25,
      onComplete: () => {
        staticanim.setActive(false);
        staticanim.setAlpha(0)
      }
    })
  }
  doExplosion(x, y) {
    this.cameras.main.flash();
    var exp = this.explodes.get().setActive(true);
    exp.setOrigin(0.5, 0.5).setScale(6).setDepth(3).setAlpha(1);
    exp.setPosition(x, y)
    exp.play('explode_anim')
    exp.on('animationcomplete', function () {
      exp.setActive(false);
      exp.setAlpha(0)
    }, this);
  }
  doRadiate(x, y) {
    this.cameras.main.flash();
    var rad = this.radiates.get().setActive(true);
    rad.setOrigin(0.5, 0.5).setScale(17).setDepth(3).setAlpha(1);
    rad.setPosition(x, y)
    rad.play('radiate_anim')
    rad.on('animationcomplete', function () {
      rad.setActive(false);
      rad.setAlpha(0)
    }, this);
  }
  doCrate(x, y) {
    this.cameras.main.flash();
    var cra = this.crates.get().setActive(true);
    cra.setOrigin(0.5, 0.5).setScale(8).setDepth(3).setAlpha(1);
    cra.setPosition(x, y)
    cra.play('crate_anim')
    cra.on('animationcomplete', function () {
      cra.setActive(false);
      cra.setAlpha(0)
      this.doPowerup(x, y)
    }, this);
  }
  doSmallScan(x, y) {

    var sca = this.smallscans.get().setActive(true);
    sca.setOrigin(0.5, 0.5).setScale(4).setDepth(4).setAlpha(1);
    sca.setPosition(x, y)
    sca.play('small_scan')
    sca.on('animationcomplete', function () {
      sca.setActive(false);
      sca.setAlpha(0)

    }, this);
  }
  doDoor(x, y) {

    var door = this.doors.get().setActive(true);
    door.setOrigin(0.5, 0.5).setScale(6).setDepth(4).setAlpha(1);
    door.setPosition(x, y)
    door.play('door_anim')
    door.on('animationcomplete', function () {
      //sca.setActive(false);
      this.scene.stop('UI')
      var starttween = this.tweens.add({
        targets: this.top,
        y: 0,
        duration: 1000,
        delay: 500
      })
      var starttween = this.tweens.add({
        targets: this.bottom,
        y: game.config.height,
        duration: 1000,
        delay: 500,
        onComplete: () => {
          playerData.currentSector++
          this.saveGame()
          this.scene.stop()
          this.scene.start()
        }
      })


    }, this);
  }
  doPowerup(x, y) {
    var rand = Phaser.Math.Between(0, 2)
    var pu = this.powerups.get().setActive(true);
    pu.setOrigin(0.5, 0.5).setScale(6).setDepth(3).setAlpha(1);
    pu.setPosition(x, y).setFrame(rand)
    var tween = this.tweens.add({
      targets: pu,
      y: '-= 150',
      scale: 8,
      // y: 550 + row * 50,
      duration: 300,
      delay: 100,
      onComplete: () => {
        if (rand == 0) {
          playerData.armor += 2
          if (playerData.armor > playerData.armorMax) {
            playerData.armor = playerData.armorMax
          }
          this.addVest()
        } else if (rand == 1) {
          playerData.hp += 3
          if (playerData.hp > playerData.hpMax) {
            playerData.hp = playerData.hpMax
          }
          this.addHP()
        } else {
          playerData.power += 3
          if (playerData.power > 10) {
            playerData.power = 10
          }
          this.addPower()
        }
        var tween2 = this.tweens.add({
          targets: pu,
          alpha: 0,
          duration: 300,
          delay: 200,
          onComplete: () => {
            pu.setActive(false);
          }
        });
      }
    });
  }
  doRank() {
    var container = this.add.container(game.config.width / 2, game.config.height / 2)
    var box = this.add.image(0, 0, 'dialogue').setScale(2)
    container.add(box)
    var title = this.add.text(-265, -162, 'PROMOTION EARNED', { fontFamily: 'Gamer', fontSize: '60px', color: '#000000', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    container.add(title)
    var ranktitle = this.add.text(0, -100, rankData[playerData.rank].name, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    container.add(ranktitle)
    var rankIcon = this.add.image(0, 0, 'ranks', playerData.rank).setScale(6)
    container.add(rankIcon)
    var upgradetitle = this.add.text(0, +100, rankData[playerData.rank].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    container.add(upgradetitle)
    var modelBehavior = this.plugins.get('rexmodalplugin').add(container, {
      touchOutsideClose: true,
      duration: {
        in: 500,
        out: 500
      },

      // destroy: false
    })
    if (playerData.rank == 2) {
      playerData.armorMax++
    }
    //this.saveGame()
  }
  deal() {
    var length = deck.cards.length
    for (let i = 0; i < length; i++) {
      var card = deck.cards.pop();
      stack.push(card)
      deck.cardContainer.bringToTop(card)
      var tween = this.tweens.add({
        targets: card,
        x: game.config.width / 2,
        y: game.config.height / 2 - 100,
        // y: 550 + row * 50,
        duration: 300,
        delay: (i) * 100
      });


    }
    this.canMove = true
  }
  saveGame() {
    // {type: type, ammo: , frame: }
    console.log(deck.hand)
    for (let i = 0; i < 3; i++) {
      if (deck.hand[i] != null) {
        const hand = deck.hand[i];
        playerData.slots[i].type = hand.type
        playerData.slots[i].ammo = hand.ammo

      } else {
        playerData.slots[i].type = null
        playerData.slots[i].ammo = null
      }


    }
    localStorage.setItem('SaceCadetData', JSON.stringify(playerData));
  }
  addScore() {
    this.events.emit('score');
  }
  addPower() {
    this.events.emit('power');
  }
  addHP(amount) {
    this.events.emit('hp');
  }
  addRad() {
    this.events.emit('updateRad');
  }

  addXP() {
    this.events.emit('updateXP');
  }
  addVest(amount) {
    this.events.emit('updateVest');
  }
}

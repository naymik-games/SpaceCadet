let game;
let slots = []
let stack = []
let deck

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
    scene: [preloadGame, startGame, playGame, UI, endGame]
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


  }
  create() {
    deck = null

    this.canMove = false
    this.cardScale = 6
    makeSector()
    console.log(sector)
    this.cameras.main.setBackgroundColor(0x000000);
    this.starBack = this.add.tileSprite(0, 0, 900, 1640, 'star_back').setOrigin(0)



    this.top = this.add.image(0, 0, 'door_back', 0).setScale(4).setOrigin(0).setDepth(100)
    this.bottom = this.add.image(0, game.config.height, 'door_back', 1).setScale(4).setOrigin(0, 1).setDepth(100)


    deck = new Deck(this, this.cardScale)
    console.log(deck)

    var sect = playerData.currentSector + 1
    this.sectorText = this.add.text(game.config.width / 2, 700, 'SECTOR ' + pad(sect), { fontFamily: 'KenneyMiniSquare', fontSize: '80px', color: '#fafafa', align: 'left', shadow: { offsetX: 0, offsetY: -10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5).setDepth(101).setAlpha(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    var sectortween = this.tweens.add({
      targets: this.sectorText,
      alpha: 1,
      duration: 500,
      delay: 300,
      // yoyo: true
      onComplete: () => {
        this.openLevel()
      }
    })
    this.scan = this.add.sprite(game.config.width / 2, 700, 'scan', 0).setScale(3).setAlpha(.5).setDepth(1002)
    this.scan.play('scan_anim')
    this.scan.on('animationcomplete', function () {
      this.scan.setAlpha(0)
      var sectortween = this.tweens.add({
        targets: [this.sectorText, this.scan],
        alpha: 0,
        duration: 500,
        delay: 300,

      })
    }, this);

  }
  update() {

  }
  openLevel() {
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
    crate.type = 'EMPTYCRATE'
    crate.setFrame(cardTypes['EMPTYCRATE'].frame)
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
  doExplosion() {
    this.cameras.main.flash();

    this.explosionCard.play('explode_anim')

  }
  doBreach() {
    this.cameras.main.flash();

    this.breachCard.play('breach_anim')

  }
  doRadiate() {
    this.cameras.main.flash();

    this.radiateCard.play('radiate_anim')

  }

  doStatic(x, y) {

    this.static.setAlpha(.3);

    var tween = this.tweens.add({
      targets: this.static,
      x: '+=5',
      y: '+=50',
      alpha: 0,
      yoyo: true,
      repeat: 3,
      duration: 75,
      onComplete: () => {
        this.static.setAlpha(0)
      }
    })
  }
  doDoor(x, y) {
    var door = this.add.sprite(x, y, 'door_open', 0).setScale(6).setDepth(4)

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
  doCrate(x, y) {
    this.cameras.main.flash();
    this.crateCard.play('crate_anim')
    this.crateCard.on('animationcomplete', function () {

      this.doPowerup(x, y)
    }, this);
  }
  doPowerup(x, y) {
    var rand = Phaser.Math.Between(0, 2)

    this.powerupCard.setScale(6).setDepth(3).setAlpha(1).setFrame(rand);

    var tween = this.tweens.add({
      targets: this.powerupCard,
      //y: '-= 150',
      scale: 17,
      // y: 550 + row * 50,
      duration: 300,
      delay: 100,
      onComplete: () => {
        if (rand == 0) {
          playerData.armor += 2
          if (playerData.armor > playerData.armorMax) {
            playerData.armor = playerData.armorMax
          }
          this.statusText.setText('FOUND ARMOR')
          this.addVest()
        } else if (rand == 1) {
          playerData.hp += 3
          if (playerData.hp > playerData.hpMax) {
            playerData.hp = playerData.hpMax
          }
          this.statusText.setText('FOUND HP')
          this.addHP()
        } else {
          playerData.power += 3
          if (playerData.power > 10) {
            playerData.power = 10
          }
          this.statusText.setText('FOUND POWER')
          this.addPower()
        }
        var tween2 = this.tweens.add({
          targets: this.powerupCard,
          alpha: 0,
          duration: 300,
          delay: 700,
          onComplete: () => {

          }
        });
      }
    });
  }
  // END GAME ////////////////////////////////////////
  endGameLose() {
    this.scene.stop('UI')
    var starttween = this.tweens.add({
      targets: this.top,
      y: 0,
      duration: 1000,
      delay: 1000
    })
    var starttween = this.tweens.add({
      targets: this.bottom,
      y: game.config.height,
      duration: 1000,
      delay: 1000,
      onComplete: () => {
        this.closeDoors()
      }
    })





  }
  closeDoors() {
    this.sectorText.setAlpha(1)
    this.sectorText.setText('GAME OVER')
    this.scan.setAlpha(1)
    this.scan.play('scan_anim')
    var sectortween = this.tweens.add({
      targets: [this.sectorText, this.scan],
      alpha: 0,
      duration: 500,
      delay: 2000,
      // yoyo: true
      onComplete: () => {


        this.scene.stop()
        this.scene.start('endGame')
      }
    })
  }
  // GAME SET UP////////////////////////////////////////
  setGame() {
    this.statusText = this.add.text(game.config.width / 2, 275, '', { fontFamily: 'KenneyMiniSquare', fontSize: '70px', color: '#607AB4', align: 'left' }).setOrigin(.5).setAlpha(1)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    //slot images
    for (let i = 0; i < 3; i++) {
      var slot = this.add.image(225 + i * 225, game.config.height / 2 + 500, 'cards', 2).setScale(2.5);
      slot.slot = i
      slot.empty = true
      slots.push(slot)
    }
    if (playerData.backPack) {
      var slot = this.add.image(game.config.width - 100, game.config.height / 2 + 140, 'cards', 2).setScale(2).setOrigin(.5);
    }

    this.deal()
    //fill slots with player items
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
    console.log(deck.hand)//the card itself
    console.log(slots) //slot image and 
    this.scene.launch('UI');
    //this.events.emit('updateVest');
    this.events.emit('power')
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
    this.explosionCard = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'explosion', 0).setScale(6).setDepth(3);
    this.static = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'cards', 0).setScale(6).setDepth(3).setAlpha(0);
    this.radiateCard = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'radiation', 11).setScale(17).setDepth(3);
    this.breachCard = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'breach', 9).setScale(10).setDepth(3);
    this.crateCard = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'crate_explode', 7).setScale(17).setDepth(3);
    this.powerupCard = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'powerups', 7).setScale(17).setDepth(3).setAlpha(0);

    this.canMove = true
  }
  // SAVE GAME //////////////////////////////////
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
    localStorage.setItem('SpaceCadetData', JSON.stringify(playerData));
  }
  // UI EVENTS /////////////////////////////////////////
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
  addVest(amount) {
    this.events.emit('updateVest');
  }
  addScore() {
    this.events.emit('score');
  }
}

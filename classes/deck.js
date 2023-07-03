let cardTypes = {
  //required
  EMPTY: { name: 'EMPTY ROOM', key: 'cards', frame: 3, hp: 0, addHP: 0, addCell: 0, action: null, canTake: false },
  EXIT: { name: 'EXIT', key: 'cards', frame: 4, hp: 0, addHP: 0, addCell: 0, action: 'end', canTake: false },
  EXITL: { name: 'EXIT', key: 'cards', frame: 25, hp: 0, addHP: 0, addCell: 0, action: 'locked', canTake: false },

  //weapons
  RIFLE1: { name: 'RIFLE', key: 'rifle', frame: 1, hp: 3, addHP: 0, addCell: 0, action: 'fight', ammo: 1, canTake: true },
  RIFLE3: { name: 'RIFLE', key: 'rifle', frame: 3, hp: 3, addHP: 0, addCell: 0, action: 'fight', ammo: 3, canTake: true },
  GERNADE: { name: 'GERNADE', key: 'gernade', frame: 1, hp: 1, addHP: 0, addCell: 0, action: 'fight', ammo: 1, canTake: true },
  PISTOL1: { name: 'PISTOL', key: 'pistol', frame: 1, hp: 1, addHP: 0, addCell: 0, action: 'fight', ammo: 1, canTake: true },
  PISTOL2: { name: 'PISTOL', key: 'pistol', frame: 2, hp: 1, addHP: 0, addCell: 0, action: 'fight', ammo: 2, canTake: true },
  SHOTGUN1: { name: 'SHOTGUN', key: 'shotgun', frame: 1, hp: 2, addHP: 0, addCell: 0, action: 'fight', ammo: 1, canTake: true },
  SHOTGUN2: { name: 'SHOTGUN', key: 'shotgun', frame: 2, hp: 2, addHP: 0, addCell: 0, action: 'fight', ammo: 2, canTake: true },
  MACHINEGUN: { name: 'MACHINEGUN', key: 'machinegun', frame: 4, hp: 4, addHP: 0, addCell: 0, action: 'fight', ammo: 4, canTake: true },
  BLASTERRIFLE: { name: 'BLASTER RIFLE', key: 'blasterrifle', frame: 4, hp: 6, addHP: 0, addCell: 0, action: 'fight', ammo: 4, canTake: true },
  ROCKETLAUNCHER: { name: 'ROCKET LAUNCHER', key: 'rocketlauncher', frame: 1, hp: 8, addHP: 0, addCell: 0, action: 'fight', ammo: 1, canTake: true },
  KNIFE: { name: 'KNIFE', key: 'knife', frame: 1, hp: 1, addHP: 0, addCell: 0, action: 'fight', ammo: 1, canTake: true },
  //powerup
  BATTERY: { name: 'BATTERY', key: 'cards', frame: 5, hp: 0, addHP: 3, addCell: 0, action: 'addPower', ammo: 0, canTake: true },
  ARMOR1: { name: 'POWER ARMOR', key: 'cards', frame: 15, hp: 0, addHP: 0, addCell: 0, action: 'vest', ammo: 0, canTake: true, addArmor: 1 },
  ARMOR2: { name: 'POWER ARMOR', key: 'cards', frame: 16, hp: 0, addHP: 0, addCell: 0, action: 'vest', ammo: 0, canTake: true, addArmor: 2 },
  ARMOR3: { name: 'POWER ARMOR', key: 'cards', frame: 17, hp: 0, addHP: 0, addCell: 0, action: 'vest', ammo: 0, canTake: true, addArmor: 3 },
  ARMOR4: { name: 'POWER ARMOR', key: 'cards', frame: 18, hp: 0, addHP: 0, addCell: 0, action: 'vest', ammo: 0, canTake: true, addArmor: 4 },
  ARMOR5: { name: 'POWER ARMOR', key: 'cards', frame: 19, hp: 0, addHP: 0, addCell: 0, action: 'vest', ammo: 0, canTake: true, addArmor: 5 },

  MEDKIT1: { name: 'MEDKIT', key: 'cards', frame: 10, hp: 0, addHP: 1, addCell: 0, action: 'addHP', ammo: 0, canTake: true },
  MEDKIT3: { name: 'MEDKIT', key: 'cards', frame: 11, hp: 0, addHP: 3, addCell: 0, action: 'addHP', ammo: 0, canTake: true },
  MEDKIT5: { name: 'MEDKIT', key: 'cards', frame: 12, hp: 0, addHP: 5, addCell: 0, action: 'addHP', ammo: 0, canTake: true },
  MEDKIT7: { name: 'MEDKIT', key: 'cards', frame: 13, hp: 0, addHP: 7, addCell: 0, action: 'addHP', ammo: 0, canTake: true },
  MEDKIT10: { name: 'MEDKIT', key: 'cards', frame: 14, hp: 0, addHP: 10, addCell: 0, action: 'addHP', ammo: 0, canTake: true },

  RADIATIONSUIT: { name: 'RADIATION SUIT', key: 'cards', frame: 20, hp: 0, addHP: 0, addCell: 0, action: 'addRad', ammo: 0, canTake: true },
  SCANNER: { name: 'SCANNER', key: 'cards', frame: 21, hp: 0, addHP: 0, addCell: 0, action: 'addScanner', ammo: 0, canTake: true },
  PORTAL: { name: 'PORTAL', key: 'cards', frame: 22, hp: 0, addHP: 0, addCell: 0, action: 'addPortal', ammo: 0, canTake: true },
  CRATE: { name: 'CRATE', key: 'cards', frame: 7, hp: 0, addHP: 0, addCell: 0, action: 'collect', canTake: false },
  KEYCARD: { name: 'KEY CARD', key: 'cards', frame: 26, hp: 0, addHP: 0, addCell: 0, action: 'addKey', canTake: true },

  EMPTYCRATE: { name: 'EMPTY ROOM', key: 'cards', frame: 27, hp: 0, addHP: 0, addCell: 0, action: null, canTake: false },
  //enemies
  SCORPOID: { name: 'SCORPOID', key: 'scorpoid', frame: 1, hp: 1, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  BEASTBOT: { name: 'BEASTBOT', key: 'beastbot', frame: 2, hp: 2, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  SPIDERBOT: { name: 'SPIDERBOT', key: 'spiderbot', frame: 3, hp: 3, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  TROOPER: { name: 'TROOPER', key: 'trooper', frame: 4, hp: 4, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  SCAVBOT: { name: 'SCAVBOT', key: 'scavengerbot', frame: 5, hp: 5, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  REPTOID: { name: 'REPTOID', key: 'reptoid', frame: 6, hp: 6, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  DREADBOT: { name: 'DREADBOT', key: 'dreadbot', frame: 7, hp: 7, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  BEAST: { name: 'BEAST', key: 'beast', frame: 10, hp: 10, addHP: 0, addCell: 0, action: 'attack', ammo: 0, canTake: false },
  //instant damage
  EXPLOSION: { name: 'EXPLOSION', key: 'cards', frame: 8, hp: 1, addHP: 0, addCell: 0, action: 'explode', ammo: 0, canTake: false },
  RADIATION: { name: 'RADIATION', key: 'cards', frame: 9, hp: 1, addHP: 0, addCell: 0, action: 'radiate', ammo: 0, canTake: false },
  BREACH: { name: 'HULL BREACH', key: 'cards', frame: 6, hp: 1, addHP: 0, addCell: 0, action: 'breach', ammo: 0, canTake: false }
}


class Deck {
  constructor(scene, scale) {
    this.cards = [];
    this.scene = scene
    this.hand = [null, null, null]//cards you have in hand
    this.backPack = []
    this.cardContainer = scene.add.container()
    this.createDeck(scale)


    this.shuffleDeck()
  }
  createDeck(scale) {


    var cardIndex = 0

    for (let j = 0; j < sector.length; j++) {
      //scene, x, y, texture, frame, index, type
      // final placement game.config.width / 2, game.config.height / 2 - 100
      var card = new Card(this.scene, -800, game.config.height / 2 - 100, 'cards', cardTypes[sector[j]].frame, cardIndex, sector[j])
      this.cards.push(card);// cardTypes[sectors[0][j]].key
      this.cardContainer.add(card)
      cardIndex++
    }


  }

  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor((Math.random() * this.cards.length));
      location2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

//this.main = this.add.image(game.config.width / 2, game.config.height / 2 - 100, 'cards', 1).setInteractive().setScale(6);




class Card extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, index, type) {
    super(scene, x, y, texture, frame, index, type);
    // ...
    scene.add.existing(this);

    this.index = index
    this.cardFrame = frame
    this.type = type
    this.ammo = cardTypes[type].ammo
    this.hp = cardTypes[type].hp
    this.faceDown = true;
    this.setScale(6)
    this.cardScale = 6
    this.setInteractive()
    this.setFrame(1)


    this.on("pointerup", this.endSwipe, this)
    /*     this.on("pointerdown", function () {
          this.dragging = false
    
        }, this) */
    this.canMove = true

  }
  //...
  endSwipe(e) {
    // pos * (tileSize + tileSpacing) + tileSize / 2 + tileSpacing

    if (this.canMove) {
      //  let row = Math.floor((e.y - this.yOffset) / tileSize);
      //  let col = Math.floor((e.x - this.xOffset) / tileSize);
      var swipeTime = e.upTime - e.downTime;
      var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
      var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
      var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
      if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
        var direction = this.getSwipeDirection(swipeNormal)
        if (direction == 3) {
          // this.hero.changeDirection()

        } else if (direction == 0) {
          //this.hero.move(1)
          console.log('swipe right')
        } else if (direction == 1) {
          //this.hero.move(-1)
          // console.log('swipe left')
          this.moveToBottom()
          this.scene.statusText.setText('')
        } else if (direction == 2) {
          this.scene.statusText.setText('')
          console.log('down')
          if (!this.faceDown && cardTypes[this.type].canTake) {
            console.log('move to empty slot')
            var emptySlot = this.findEmptySlot()
            if (emptySlot > -1) {
              this.takeCard(emptySlot)
            }

          }
        }
      } else {
        //tap
        this.scene.statusText.setText('')
        this.checkCardOnFlip()

      }

    }


  }
  //...
  checkCardOnFlip() {
    console.log('tap')
    if (this.faceDown == true) {
      this.flip('f')
      playerData.cardsFlipped++
      if (playerData.power == 0) {
        playerData.hp -= 1
        this.scene.addHP()
      } else {
        playerData.power -= 1
        this.scene.addPower()
      }
      ////EXPLOSION
      if (cardTypes[this.type].action == 'explode') {
        this.scene.statusText.setText('SHIP EXPLOSION')
        console.log('BOOM!')
        var explodetween = this.scene.tweens.add({
          targets: this,
          alpha: .4,
          delay: 100,
          duration: 1000,
          onComplete: () => {
            this.useCard()
            this.scene.doExplosion(this.x, this.y)
            this.scene.damagePlayer(3)
          }
        })

      } else if (cardTypes[this.type].action == 'radiate') {
        /////RADIATION
        console.log('OUCH!')
        this.scene.statusText.setText('RADIATION LEAK')
        var radiatetween = this.scene.tweens.add({
          targets: this,
          alpha: .4,
          delay: 100,
          duration: 1000,
          onComplete: () => {
            this.useCard()
            this.scene.doRadiate(this.x, this.y)
            //this.scene.damagePlayer(1)
            if (playerData.armorRad) {
              playerData.armorRad = false
              this.scene.addRad()

            } else {
              if (playerData.power > 0) {
                if (playerData.power == 1) {
                  playerData.power = 0
                  this.scene.addPower()
                } else {
                  playerData.power = 1
                  this.scene.addPower()
                }

              } else {
                this.scene.damagePlayer(1)
              }

              // this.scene.addRad()
            }

          }
        })

      } else if (cardTypes[this.type].action == 'breach') {
        //BREACH
        console.log('BOOM!')
        this.scene.statusText.setText('HULL BREACHED')
        this.scene.doBreach(this.x, this.y)
        deck.hand[this.findFilledSlot()].remove()
        var breachtween = this.scene.tweens.add({
          targets: this,
          alpha: .4,
          delay: 1000,
          duration: 500,
          onComplete: () => {
            this.useCard()

            //this.scene.damagePlayer(3)
          }
        })

      }

    } else {
      if (this.type == 'EXIT') {
        this.scene.doDoor(this.x, this.y)
      }
    }
  }
  // ...
  getSwipeDirection(swipeNormal) {
    if (swipeNormal.x > 0.8) {//right 0
      return 0
    }
    if (swipeNormal.x < -0.8) {//left 1
      return 1
    }
    if (swipeNormal.y > 0.8) {//down 2
      return 2
    }
    if (swipeNormal.y < -0.8) {//up 3
      return 3
    }
  }
  //...
  moveToBottom() {
    var card = stack.pop()
    //console.log(card)

    stack.unshift(card)//sendToBack
    if (cardTypes[card.type].action == 'attack' && !card.faceDown) {
      this.scene.damagePlayer(card.hp)
      this.scene.cameras.main.flash();
    }
    //
    const chain = this.scene.tweens.chain({
      targets: card,
      tweens: [
        {

          x: -800,
          duration: 300,
          onComplete: () => {
            deck.cardContainer.sendToBack(card)

            this.runScan()
            //this.scene.children.sendToBack(this.scene.starBack)
          }
        },

        {
          x: game.config.width / 2,
          duration: 300,
        }

      ]
    });


  }
  // ...
  takeCard(slot) {
    var card = stack.pop()

    this.scene.tweens.add({
      targets: card,
      scaleY: 2.5,
      scaleX: 2.5,
      x: slots[slot].x,
      y: slots[slot].y,
      delay: 0,
      duration: 100,
      ease: 'Linear',
      onComplete: () => {
        this.scene.addHandCard(slot, this.type)
        this.runScan()
        card.destroy()


      }
    })
  }
  //...
  useCard() {
    var card = stack.pop()
    this.scene.tweens.add({
      targets: card,
      alpha: 0,
      delay: 0,
      duration: 50,
      ease: 'Linear',
      onComplete: () => {
        if (playerData.scanner && stack[stack.length - 1].faceDown) {
          this.scene.doScan()
        }
        card.destroy()

      }
    })
  }
  // ...
  runScan() {
    console.log(stack[stack.length - 1].faceDown)
    if (playerData.scanner && stack[stack.length - 1].faceDown) {
      this.scene.doScan()
    }
  }
  // ...
  takeDamage() {
    this.setFrame(this.hp)
  }
  //..
  findEmptySlot() {
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].empty) {
        return i
      }
    }
    return -1
  }
  //..
  findFilledSlot() {
    for (let i = 0; i < slots.length; i++) {
      if (!slots[i].empty) {
        return i
      }
    }
    return -1
  }
  // ...
  flip(dir) {

    const chain = this.scene.tweens.chain({
      targets: this,
      tweens: [
        {

          scaleY: this.cardScale + .2,
          scaleX: this.cardScale + .2,
          delay: 0,
          duration: 100,
          ease: 'Linear'
        },
        {
          scaleX: 0,
          delay: 200,
          duration: 200,
          ease: 'Linear',
          onComplete: () => {
            if (dir == 'f') {
              this.setTexture(cardTypes[this.type].key)
              this.setFrame(this.cardFrame)
              this.faceDown = false;
            } else {
              this.setTexture('cards')
              this.setFrame(1)
              this.faceDown = true;
            }
          }
        },
        {
          scaleX: this.cardScale + .2,
          delay: 0,
          duration: 200,
          ease: 'Linear'
        },
        {
          scaleY: this.cardScale,
          scaleX: this.cardScale,
          delay: 200,
          duration: 100,
          ease: 'Linear'
        }

      ]
    });


  }

}
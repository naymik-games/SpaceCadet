

class HandCard extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, type, slot) {
    super(scene, x, y, texture, frame, type);
    // ...
    scene.add.existing(this);


    this.type = type
    this.hp = cardTypes[type].hp
    this.ammo = cardTypes[type].ammo
    this.setScale(2.5)
    this.slot = slot
    this.backPack = false
    this.setFrame(frame)
    this.frameNumber = frame
    this.setInteractive()
    this.on("pointerup", this.endSwipe, this)
    this.canMove = true
  }
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
          this.save()
          console.log('swipe right')
        } else if (direction == 1) {
          //this.hero.move(-1)
          console.log('swipe left')

        } else if (direction == 2) {
          console.log('down')
          console.log('remove')
          if (this.backPack) {
            this.moveBack()
          } else {
            this.remove()
          }

        }
      } else {
        //tap
        console.log('tap')
        // console.log('take action')
        //console.log(cardTypes[this.type].action)
        // console.log(cardTypes[stack[stack.length - 1].type].action)
        if (cardTypes[this.type].action == 'fight' && cardTypes[stack[stack.length - 1].type].action == 'collect') {
          console.log('collect crate')
          this.scene.collectCrate(stack[stack.length - 1], this)
        } else if (cardTypes[this.type].action == 'fight' && cardTypes[stack[stack.length - 1].type].action == 'attack') {
          console.log('killing enemy')
          this.scene.doBattle(stack[stack.length - 1], this)
        } else if (cardTypes[this.type].action == 'vest') {
          this.takeVest()
        } else if (cardTypes[this.type].action == 'addPower') {
          this.takePower()
        } else if (cardTypes[this.type].action == 'addHP') {
          this.takeHP()
        } else if (cardTypes[this.type].action == 'addRad') {
          this.takeRad()
        } else if (cardTypes[this.type].action == 'addScanner') {
          this.takeScanner()
        }

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
  takeVest() {
    playerData.armor += cardTypes[this.type].addArmor
    if (playerData.armor > playerData.armorMax) {
      playerData.armor = playerData.armorMax
    }
    this.scene.addVest()
    this.useCard()
  }
  takeHP() {
    playerData.hp += cardTypes[this.type].addHP
    if (playerData.hp > playerData.hpMax) {
      playerData.hp = playerData.hpMax
    }
    this.scene.addHP()
    this.useCard()
  }
  takeScanner() {
    playerData.scanner = true
    if (playerData.scanner && stack[stack.length - 1].faceDown) {
      this.scene.doScan()
    }

    this.useCard()
  }
  takeRad() {
    /* playerData.hp += cardTypes[this.type].addHP
    if (playerData.hp > playerData.hpMax) {
      playerData.hp = playerData.hpMax
    } */
    playerData.armorRad = true
    this.scene.addRad()

    this.useCard()
  }
  takePower() {
    playerData.power = 10
    this.scene.addPower()
    this.useCard()
  }
  useCard() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      delay: 0,
      duration: 50,
      ease: 'Linear',
      onComplete: () => {
        deck.hand[this.slot] = null
        slots[this.slot].empty = true
        //this.scene.saveGame()
        this.destroy()

      }
    })
  }
  remove() {
    this.scene.tweens.add({
      targets: this,
      y: game.config.height + 800,
      delay: 0,
      duration: 100,
      ease: 'Linear',
      onComplete: () => {
        deck.hand[this.slot] = null
        slots[this.slot].empty = true
        this.destroy()
      }
    })
  }
  save() {
    if (deck.backPack.length < 1 && playerData.backPack)
      this.scene.tweens.add({
        targets: this,
        x: game.config.width - 100,
        y: game.config.height / 2 + 140,
        scale: 2,
        delay: 0,
        duration: 100,
        ease: 'Linear',
        onComplete: () => {
          deck.hand[this.slot] = null
          slots[this.slot].empty = true
          this.slot = null
          this.backPack = true
          deck.backPack.push(this)
          //this.destroy()
        }
      })
  }
  //...
  moveBack() {
    var emptySlot = this.findEmptySlot()
    if (emptySlot > -1) {

      this.scene.tweens.add({
        targets: this,
        scaleY: 2.5,
        scaleX: 2.5,
        x: slots[emptySlot].x,
        y: slots[emptySlot].y,
        delay: 0,
        duration: 100,
        ease: 'Linear',
        onComplete: () => {

          deck.hand[emptySlot] = deck.backPack.pop()
          slots[emptySlot].empty = false
          this.slot = emptySlot
          this.backPack = false
          //this.destroy()
        }
      })
    }
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
}
//slots[slot].x, slots[slot].y, 'cards', cardTypes[type].frame, type, slot
class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {

    /*    this.header = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5,0).setTint(0x3e5e71);
     this.header.displayWidth = 870;
     this.header.displayHeight = 200;
        */
    this.cells = []
    this.hp = 5
    this.hpText = this.add.text(70, 70, playerData.hp, { fontFamily: 'Gamer', fontSize: '230px', color: '#fafafa', align: 'left', shadow: { offsetX: 10, offsetY: 10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.powerText = this.add.text(235, 50, 'PWR', { fontFamily: 'KenneyMiniSquare', fontSize: '45px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    var sect = playerData.currentSector + 1
    this.sectorText = this.add.text(game.config.width - 80, 70, pad(sect), { fontFamily: 'Gamer', fontSize: '150px', color: '#fafafa', align: 'left', shadow: { offsetX: 10, offsetY: 10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    /* this.powerCells = this.add.image(252.5, 65, 'blank').setOrigin(0, .5)
    this.powerCells.displayWidth = 395
    this.powerCells.displayHeight = 50 */
    for (let i = 0; i < 10; i++) {
      var cellB = this.add.image(252.5 + i * (15 + 35), 65, 'cell', 0).setOrigin(0, .5)

      var cell = this.add.image(252.5 + i * (15 + 35), 65, 'cell', 1).setOrigin(0, .5)
      if (i < playerData.power) {
        cell.setAlpha(1)
      } else {
        cell.setAlpha(0)
      }
      //cell.displayWidth = 35
      // cell.displayHeight = 35
      this.cells.push(cell)
    }

    this.xpText = this.add.text(235, 110, 'XP', { fontFamily: 'KenneyMiniSquare', fontSize: '45px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    this.xpBack = this.add.image(252.5, 125, 'blank').setOrigin(0, .5).setTint(0x421610)
    this.xpBack.displayWidth = 485
    this.xpBack.displayHeight = 25

    this.xp = this.add.image(252.5, 125, 'blank').setOrigin(0, .5).setTint(0xff0000)
    this.xp.displayWidth = 485 * (playerData.xp / playerData.xpMax)
    this.xp.displayHeight = 25


    this.score = 0;
    //this.scoreText = this.add.bitmapText(85, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);

    this.maxText = this.add.text(72, 175, 'MAX', { fontFamily: 'KenneyMiniSquare', fontSize: '35px', color: '#ff0000', align: 'left' }).setOrigin(.5).setAlpha(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    if (playerData.armor == playerData.armorMax) {
      this.maxText.setAlpha(1)
    } else {
      this.maxText.setAlpha(0)
    }

    this.anims.create({
      key: 'card_scan_anim',
      frames: 'card_scan',
      frameRate: 18,
      repeat: 0
    });
    this.cardScans = this.add.group({
      defaultKey: 'card_scan',
      defaultFrame: 0,
      maxSize: 5
    });
    this.armorIcon = this.add.image(70, 238, 'armor_icons', playerData.armor).setScale(4.5)

    this.radiateIcon = this.add.image(70, 335, 'armor_icons', 10).setScale(4.5).setAlpha(playerData.armorRad ? 1 : 0)//

    // this.scannerIcon = this.add.sprite(70, 450, 'scanner', 7).setScale(3).setAlpha(playerData.scanner ? 1 : 0)//

    this.cautionContainer = this.add.container()
    this.cautionIcon = this.add.sprite(450, 190, 'caution').setScale(2)
    this.cautionContainer.add(this.cautionIcon)

    this.tweens.add({
      targets: this.cautionIcon,
      alpha: .4,
      yoyo: true,
      loop: -1,
      duration: 500,
      yoyo: true
      //ease: 'sine.inout'
    });
    // this.cautionText = this.add.text(380, 185, 'POWER CRITICAL', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fF0000', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    //this.cautionContainer.add(this.cautionText)
    this.cautionContainer.setAlpha(0)
    if (playerData.power <= 2) {
      this.cautionContainer.setAlpha(1)
    } else {
      this.cautionContainer.setAlpha(0)
    }

    this.rankIcon = this.add.image(game.config.width - 70, 238, 'ranks', playerData.rank).setScale(5)

    this.Main = this.scene.get('playGame');
    /////////////////////////
    // UPDATE HP DISPLAY
    this.Main.events.on('hp', function () {

      this.hpText.setText(playerData.hp)
      if (playerData.hp <= 0) {
        this.Main.endGameLose()
      }
    }, this);
    /////////////////////////
    // UPDATE XP DISPLAY
    this.Main.events.on('updateXP', function () {
      this.xp.displayWidth = 485 * (playerData.xp / playerData.xpMax)
      if (playerData.xp >= playerData.xpMax) {
        this.updateRank()
      }
    }, this);
    /////////////////////////
    // UPDATE ARMOR DISPLAY
    this.Main.events.on('updateVest', function (data) {
      if (playerData.armor == playerData.armorMax) {
        this.maxText.setAlpha(1)
      } else {
        this.maxText.setAlpha(0)
      }
      this.armorIcon.setFrame(playerData.armor)
      this.Main.doSmallScan(this.armorIcon.x, this.armorIcon.y)
    }, this);
    /////////////////////////
    // UPDATE RADIATION SUIT DISPLAY
    this.Main.events.on('updateRad', function (data) {
      if (playerData.armorRad) {
        this.radiateIcon.setAlpha(1)
      } else {
        this.radiateIcon.setAlpha(0)
      }

      this.Main.doSmallScan(this.radiateIcon.x, this.radiateIcon.y)
    }, this);
    /////////////////////////
    // UPDATE SCANNER DISPLAY

    this.Main.events.on('scanIcon', function (data) {

      var cardscan = this.cardScans.get().setActive(true);
      cardscan.setOrigin(0.5, 0.5).setScale(6).setDepth(1005).setAlpha(.4);
      cardscan.setPosition(stack[stack.length - 1].x, stack[stack.length - 1].y)
      cardscan.play('card_scan_anim')
      cardscan.on('animationcomplete', function () {
        cardscan.setActive(false);
        cardscan.setAlpha(0)
      }, this);

      //this.Main.doSmallScan(this.radiateIcon.x, this.radiateIcon.y)
    }, this);
    /////////////////////////
    // UPDATE POWER CELLS DISPLAY
    this.Main.events.on('power', function () {
      for (let i = 0; i < 10; i++) {
        if (i < playerData.power) {
          this.cells[i].setAlpha(1)
        } else {
          this.cells[i].setAlpha(0)
        }

      }
      //update power cell warning
      if (playerData.power <= 2) {
        this.cautionContainer.setAlpha(1)
      } else {
        this.cautionContainer.setAlpha(0)
      }
    }, this);


  }

  update() {

  }
  updateRank() {
    playerData.xp = 0
    this.xp.displayWidth = 485 * (playerData.xp / playerData.xpMax)
    playerData.rank++
    this.rankIcon.setFrame(playerData.rank)
    this.Main.doSmallScan(this.rankIcon.x, this.rankIcon.y)
    this.Main.doRank()
  }


}
class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {
    playerData = null

    this.cameras.main.setBackgroundColor(0x000000);

    this.top = this.add.image(0, 0, 'door_back', 0).setScale(4).setOrigin(0)
    this.bottom = this.add.image(0, game.config.height, 'door_back', 1).setScale(4).setOrigin(0, 1)


    playerData = JSON.parse(localStorage.getItem('SpaceCadetData'));
    if (playerData === null || playerData.length <= 0) {
      // localStorage.setItem('SpaceCadetData', JSON.stringify(playerDataDefault));
      playerData = JSON.parse(JSON.stringify(playerDataDefault));
      console.log('new game')
    } else {
      console.log('existing game')
      this.clearDataText = this.add.text(game.config.width / 2, 1550, 'RESET DATA', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fa0000', align: 'center' }).setOrigin(.5).setInteractive()
      this.clearDataText.on('pointerdown', function () {

        this.clearDataText.setText('DATA CLEARED')


        this.startTime.setText('SECTOR ' + pad(1))
        this.rankIcon.setFrame(1)
        localStorage.removeItem('SpaceCadetData');

        localStorage.setItem('SpaceCadetData', JSON.stringify(playerDataDefault));
        playerData = null
        playerData = JSON.parse(JSON.stringify(playerDataDefault));

      }, this)
    }




    this.titlepText = this.add.text(game.config.width / 2, 220, 'SPACE\nCADET', { fontFamily: 'Gamer', fontSize: '240px', color: '#fafafa', align: 'center', shadow: { offsetX: 10, offsetY: 10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    this.rankIcon = this.add.image(game.config.width / 2, 520, 'ranks', playerData.rank).setScale(8).setInteractive()

    var sect = playerData.currentSector + 1
    this.startTime = this.add.text(game.config.width / 2, 700, 'SECTOR ' + pad(sect), { fontFamily: 'KenneyMiniSquare', fontSize: '80px', color: '#fafafa', align: 'left', shadow: { offsetX: 0, offsetY: -10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5).setDepth(101).setAlpha(1).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,


    this.startTime.on('pointerdown', function () {
      //this.scene.start('infoRank')
      this.clickHandler()
    }, this)

    var rand = Phaser.Math.Between(0, tips.length - 1)
    this.tipText = this.add.text(game.config.width / 2, 1050, 'TIP: ' + tips[rand], { fontFamily: 'KenneyMiniSquare', fontSize: '50px', color: '#fafafa', align: 'center', wordWrap: { width: 800 } }).setOrigin(.5)





  }
  clickHandler() {

    this.scene.start('playGame');

  }

}
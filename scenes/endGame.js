class endGame extends Phaser.Scene {
	constructor() {
		super("endGame");
	}
	preload() {



	}

	create() {
		//	this.cameras.main.setBackgroundColor(0xf7eac6);
		var timedEvent = this.time.addEvent({ delay: 700, callback: this.showEnd, callbackScope: this, loop: false });




	}
	showEnd() {
		this.top = this.add.image(0, 0, 'door_back', 0).setScale(4).setOrigin(0)
		this.bottom = this.add.image(0, game.config.height, 'door_back', 1).setScale(4).setOrigin(0, 1)
		this.titlepText = this.add.text(game.config.width / 2, 275, 'MISSION\nREPORT', { fontFamily: 'Gamer', fontSize: '200px', color: '#fafafa', align: 'center', shadow: { offsetX: 10, offsetY: 10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.back = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x000000).setAlpha(.6)
		this.back.displayWidth = game.config.width
		this.back.displayHeight = 600

		this.rankText = this.add.text(150, game.config.height / 2 - 150, 'RANK:', { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankIcon = this.add.image(game.config.width - 140, game.config.height / 2 - 145, 'ranks', playerData.rank).setScale(3).setOrigin(0, .5)
		this.rankNameText = this.add.text(game.config.width - 150, game.config.height / 2 - 150, rankData[playerData.rank].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		var sect = playerData.currentSector + 1
		this.sectorText = this.add.text(150, game.config.height / 2, 'SECTOR:', { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.sectorNumText = this.add.text(game.config.width - 150, game.config.height / 2, sect, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.cardsText = this.add.text(150, game.config.height / 2 + 75, 'CARDS:', { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.cardsNumText = this.add.text(game.config.width - 150, game.config.height / 2 + 75, playerData.cardsFlipped, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.killedText = this.add.text(150, game.config.height / 2 + 150, 'KILLS:', { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.killedNumText = this.add.text(game.config.width - 150, game.config.height / 2 + 150, playerData.enemiesKilled, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.exitText = this.add.text(game.config.width / 2, game.config.height / 2 + 550, 'EXIT', { fontFamily: 'Gamer', fontSize: '120px', color: '#fafafa', align: 'left' }).setOrigin(.5).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.exitText.on('pointerdown', function () {
			localStorage.removeItem('SaceCadetData');
			playerData = null
			this.scene.start('startGame')
		}, this)

	}




}


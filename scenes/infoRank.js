class infoRank extends Phaser.Scene {
	constructor() {
		super("infoRank");
	}
	preload() {



	}

	create() {
		//	this.cameras.main.setBackgroundColor(0xf7eac6);
		var timedEvent = this.time.addEvent({ delay: 100, callback: this.showEnd, callbackScope: this, loop: false });




	}
	showEnd() {
		this.top = this.add.image(0, 0, 'door_back', 0).setScale(4).setOrigin(0)
		this.bottom = this.add.image(0, game.config.height, 'door_back', 1).setScale(4).setOrigin(0, 1)
		this.titlepText = this.add.text(game.config.width / 2, 100, 'RANKS', { fontFamily: 'Gamer', fontSize: '200px', color: '#fafafa', align: 'center', shadow: { offsetX: 10, offsetY: 10, color: '#ff0000', blur: 0, stroke: false, fill: true } }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.back = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x000000).setAlpha(.6)
		this.back.displayWidth = game.config.width
		this.back.displayHeight = 1200

		//	this.rankText = this.add.text(150, game.config.height / 2 - 150, 'RANK:', { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankIcon1 = this.add.image(75, game.config.height / 2 - 540, 'ranks', 1).setScale(4).setOrigin(0, .5)
		this.rankNameText1 = this.add.text(175, game.config.height / 2 - 540, rankData[1].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText1 = this.add.text(500, game.config.height / 2 - 540, rankData[1].upgrade, { fontFamily: 'Gamer', fontSize: '80px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,


		this.rankIcon2 = this.add.image(75, game.config.height / 2 - 420, 'ranks', 2).setScale(4).setOrigin(0, .5)
		this.rankNameText2 = this.add.text(175, game.config.height / 2 - 420, rankData[2].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText2 = this.add.text(500, game.config.height / 2 - 420, rankData[2].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon3 = this.add.image(75, game.config.height / 2 - 300, 'ranks', 3).setScale(4).setOrigin(0, .5)
		this.rankNameText3 = this.add.text(175, game.config.height / 2 - 300, rankData[3].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText3 = this.add.text(500, game.config.height / 2 - 300, rankData[3].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon4 = this.add.image(75, game.config.height / 2 - 180, 'ranks', 4).setScale(4).setOrigin(0, .5)
		this.rankNameText4 = this.add.text(175, game.config.height / 2 - 180, rankData[4].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText4 = this.add.text(500, game.config.height / 2 - 180, rankData[4].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon5 = this.add.image(75, game.config.height / 2 - 60, 'ranks', 5).setScale(4).setOrigin(0, .5)
		this.rankNameText5 = this.add.text(175, game.config.height / 2 - 60, rankData[5].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText5 = this.add.text(500, game.config.height / 2 - 60, rankData[5].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon6 = this.add.image(75, game.config.height / 2 + 60, 'ranks', 6).setScale(4).setOrigin(0, .5)
		this.rankNameText6 = this.add.text(175, game.config.height / 2 + 60, rankData[6].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText6 = this.add.text(500, game.config.height / 2 + 60, rankData[6].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon7 = this.add.image(75, game.config.height / 2 + 180, 'ranks', 7).setScale(4).setOrigin(0, .5)
		this.rankNameText7 = this.add.text(175, game.config.height / 2 + 180, rankData[7].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText7 = this.add.text(500, game.config.height / 2 + 180, rankData[7].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon8 = this.add.image(75, game.config.height / 2 + 300, 'ranks', 8).setScale(4).setOrigin(0, .5)
		this.rankNameText8 = this.add.text(175, game.config.height / 2 + 300, rankData[8].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText8 = this.add.text(500, game.config.height / 2 + 300, rankData[8].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		this.rankIcon9 = this.add.image(75, game.config.height / 2 + 420, 'ranks', 9).setScale(4).setOrigin(0, .5)
		this.rankNameText9 = this.add.text(175, game.config.height / 2 + 420, rankData[9].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText9 = this.add.text(500, game.config.height / 2 + 420, rankData[9].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,


		this.rankIcon10 = this.add.image(75, game.config.height / 2 + 540, 'ranks', 10).setScale(4).setOrigin(0, .5)
		this.rankNameText10 = this.add.text(175, game.config.height / 2 + 540, rankData[10].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.rankUpgradeText9 = this.add.text(500, game.config.height / 2 + 540, rankData[10].upgrade, { fontFamily: 'Gamer', fontSize: '60px', color: '#fafafa', align: 'left', wordWrap: { width: 375 } }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

		//	this.rankNameText = this.add.text(game.config.width - 150, game.config.height / 2 - 150, rankData[playerData.rank].name, { fontFamily: 'Gamer', fontSize: '100px', color: '#fafafa', align: 'left' }).setOrigin(1, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,


		this.exitText = this.add.text(game.config.width / 2, game.config.height / 2 + 700, 'EXIT', { fontFamily: 'Gamer', fontSize: '120px', color: '#fafafa', align: 'left' }).setOrigin(.5).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
		this.exitText.on('pointerdown', function () {

			this.scene.start('startGame')
		}, this)

	}




}


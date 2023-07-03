class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {


    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    }




    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');

    this.load.spritesheet("door_back", "assets/sprites/door_back.png", {
      frameWidth: 225,
      frameHeight: 225,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("cards", "assets/sprites/cards.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("cell", "assets/sprites/cell.png", {
      frameWidth: 35,
      frameHeight: 35
    });
    this.load.spritesheet("ranks", "assets/sprites/ranks.png", {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("armor_icons", "assets/sprites/armor_icons.png", {
      frameWidth: 16,
      frameHeight: 17,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("smallscan", "assets/sprites/smallscan.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("explosion", "assets/sprites/144x44-explosions.png", {
      frameWidth: 144,
      frameHeight: 144,
    });
    this.load.spritesheet("radiation", "assets/sprites/radiation.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("breach", "assets/sprites/breach.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("scan", "assets/sprites/scan.png", {
      frameWidth: 200,
      frameHeight: 50,
    });
    this.load.spritesheet("door_open", "assets/sprites/door_open.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("crate_explode", "assets/sprites/crate_explode.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("powerups", "assets/sprites/powerups.png", {
      frameWidth: 28,
      frameHeight: 28,
      spacing: 1,
      margin: 1
    });
    // weapons//////////////////////
    this.load.spritesheet("blasterrifle", "assets/sprites/weapons/blasterrifle.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("rifle", "assets/sprites/weapons/rifle.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("gernade", "assets/sprites/weapons/gernade.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("shotgun", "assets/sprites/weapons/shotgun.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("pistol", "assets/sprites/weapons/pistol.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("machinegun", "assets/sprites/weapons/machinegun.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("rocketlauncher", "assets/sprites/weapons/rocketlauncher.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("knife", "assets/sprites/weapons/knife.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    // enemies /////////////////////
    this.load.spritesheet("spiderbot", "assets/sprites/enemies/spiderbot.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("beastbot", "assets/sprites/enemies/beastbot.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("scorpoid", "assets/sprites/enemies/scorpoid.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("trooper", "assets/sprites/enemies/trooper.png", {
      frameWidth: 80,
      frameHeight: 114,
      spacing: 1,
      margin: 1
    });







    this.load.image('blank', 'assets/sprites/blank.png');
    this.load.image('star_back', 'assets/sprites/star_back.png');
    this.load.image('caution', 'assets/sprites/256x32-power-critical.png')
    this.load.image('dialogue', 'assets/sprites/dialogue.png');
    this.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);

  }
  create() {

    this.anims.create({
      key: 'small_scan',
      frames: 'smallscan',
      frameRate: 12,
      repeat: 1
    });
    this.anims.create({
      key: 'explode_anim',
      frames: 'explosion',
      frameRate: 8,
      repeat: 0
    });
    this.anims.create({
      key: 'radiate_anim',
      frames: 'radiation',
      frameRate: 8,
      repeat: 0
    });
    this.anims.create({
      key: 'breach_anim',
      frames: 'breach',
      frameRate: 8,
      repeat: 0
    });
    this.anims.create({
      key: 'scan_anim',
      frames: 'scan',
      frameRate: 20,
      repeat: 1
    });
    this.anims.create({
      key: 'door_anim',
      frames: 'door_open',
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'crate_anim',
      frames: 'crate_explode',
      frameRate: 20,
      repeat: 0
    });
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}









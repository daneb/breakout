class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    const verticalWalls  = 12;
    const verticalBlockSize = 42;
    const leftVerticalWallX = 100;
    const rightVerticalWallX = 700;
    let leftVerticalWallHeight = 540;
    let rightVerticalWallHeight = 540;

    // Horizontal
    const horizontalWalls = 19;
    const horizontalBlockSize = 30;
    const horizontalHeight = 28;
    let horizontalX = 100;

    // Brick Layer One
    const bricks = 8;
    const brickSize = 68;

    const brickBlueHeight = 100;
    let brickBlueX = 95;
    const brickGreenHeight = 150;
    let brickGreenX = 95;

    // Static World
    this.add.image(400, 300, 'background');

    let platforms = this.physics.add.staticGroup();

    for(let i = 1; i <= horizontalWalls; i++) {
        horizontalX = horizontalX + horizontalBlockSize;
        platforms.create(horizontalX, horizontalHeight, 'wall');
    }

    for(let i = 1; i <= verticalWalls; i++) {
        leftVerticalWallHeight = leftVerticalWallHeight - verticalBlockSize;
        platforms.create(leftVerticalWallX, leftVerticalWallHeight, 'wall').setScale(1.5).refreshBody();
    }

    for(let i = 1; i <= verticalWalls; i++) {
        rightVerticalWallHeight = rightVerticalWallHeight - verticalBlockSize;
        platforms.create(rightVerticalWallX, rightVerticalWallHeight, 'wall').setScale(1.5).refreshBody();
    }

    // Bricks
    for(let i = 1; i <= bricks; i++) {
        brickBlueX = brickBlueX + brickSize;
        platforms.create(brickBlueX, brickBlueHeight, 'blue');
    }

    for(let i = 1; i <= bricks; i++) {
        brickGreenX = brickGreenX + brickSize;
        platforms.create(brickGreenX, brickGreenHeight, 'green');
    }

    let ball = this.add.sprite(this.game.config.width / 2, this.game.config.height - 100, 'ball');
    ball.setSize(0.5);

  }
}

class MainScene extends Phaser.Scene {

   ball = "";
   player = "";
   cursors = "";
   blueBricks = "";
   redBricks = "";

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    // Brick Layer One
    const bricks = 8;
    const brickSize = 68;

    const brickBlueHeight = 100;
    let brickBlueX = 95;
    const brickGreenHeight = 150;
    let brickGreenX = 95;

    // Static World
    this.add.image(400, 300, 'background');
    this.physics.world.setBoundsCollision(true, true, true, false);

    let platforms = this.physics.add.staticGroup();

    this.blueBricks = this.physics.add.group({
      key: 'blue',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 90,
        stepX: 70
      }
    });

    // Add red bricks
    this.redBricks = this.physics.add.group({
      key: 'red',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 40,
        stepX: 70
      }
    });

    this.yellowBricks = this.physics.add.group({
      key: 'yellow',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 140,
        stepX: 70
      }
    });


    this.ball = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height - 100, 'ball');
    this.ball.setCollideWorldBounds(true).setBounce(1);
    this.ball.setSize(0.5);

    this.player = this.physics.add.sprite(400, 600, 'paddle').setImmovable();
    this.player.setCollideWorldBounds(true);
    this.player.body.setVelocityX(0);

    this.cursors = this.input.keyboard.createCursorKeys();

  this.ball.setBounce(1, 1);
  this.physics.world.checkCollision.down = false;

  this.physics.add.collider(this.ball, this.blueBricks, this.hitBrick, null, this);
  this.physics.add.collider(this.ball, this.yellowBricks, this.hitBrick, null, this);
  this.physics.add.collider(this.ball, this.redBricks, this.hitBrick, null, this);
  
  } 

  isGameOver(world) {
    return this.ball.body.y > world.bounds.height;
  }

  isWon() {
    return true;
  }

  update() {
    console.log("Hello");

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-350);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(350);
      this.ball.setVelocityY(-200);
    }

  }

  hitBrick(ball, brick) {
    brick.disableBody(true, true);
  
    if (ball.body.velocity.x === 0) {
      randNum = Math.random();
      if (randNum >= 0.5) {
        ball.body.setVelocityX(150);
      } else {
        ball.body.setVelocityX(-150);
      }
    }
  }


}

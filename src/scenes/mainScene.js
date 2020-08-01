class MainScene extends Phaser.Scene {

   ball = "";
   player = "";
   cursors = "";
   blueBricks = "";
   redBricks = "";
   gameStarted = false;
   score = 0;
   scoreBuffer = 0;
   scoreText = "";
   brickCount = 40;


  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    // Static World
    this.add.image(400, 300, 'background');
    this.physics.world.setBoundsCollision(true, true, true, false);
    let platforms = this.physics.add.staticGroup();

    this.setupBricks();
    this.setupBall();
    this.setupPaddle();
    this.setupUserInput();
    this.setupCollissions();
    this.setupText();
  
  } 

  isGameOver() {
    return this.ball.body.y > this.game.config.height;
  }

  isWon() {
    return true;
  }

  update() {

    var ballBounds = this.ball.getBounds();
    
    // Game over
    if(this.isGameOver())
    {
      this.gameOver();
    }

    // User Input
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-350);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(350);
      
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.ball.setVelocityY(-200);
      }  
    }

  }


  setupText()
  {
    this.scoreText = this.add.text(180, 0, 'Score: 0').setFont('32px Arial Black').setFill('#ffffff').setShadow(2, 2, "#333333", 2);
    this.stateText = this.add.text(300, 300, 'Hello').setFont('32px Arial Black').setFill('#ff4d4d').setShadow(2, 2, "#333333", 2);
    this.stateText.visible = false;
  }

  setupUserInput()
  {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  setupCollissions()
  {
    this.physics.world.checkCollision.down = false;

    // Collission physics
    this.physics.add.collider(this.player, this.ball,  this.hitPaddle, null, this);
    this.physics.add.collider(this.ball, this.blueBricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.yellowBricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.redBricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.purpleBricks, this.hitBrick, null, this);
  }

  setupPaddle()
  {
      // Paddle physics
      this.player = this.physics.add.sprite(400, 600, 'paddle').setImmovable(true);
      this.player.setCollideWorldBounds(true);
      this.player.body.setVelocityX(1);
  }

  setupBall()
  {
     // Ball physics
     this.ball = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height - 100, 'ball');
     this.ball.setCollideWorldBounds(true).setBounce(1);
     this.ball.setSize(0.5);
     this.ball.setBounce(1, 1);
  }

  setupBricks()
  {
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

    this.purpleBricks = this.physics.add.group({
      key: 'purple',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 190,
        stepX: 70
      }
    });
  }


  hitPaddle(ball, paddle)
  {
    if (ball.body.velocity.x === 0) {
      let randNum = Math.random();
      console.log(randNum);
      if (randNum >= 0.5) {
        ball.body.setVelocityX(150);
      } else {
        ball.body.setVelocityX(-150);
      }
    }
  }

  hitBrick(ball, brick) {

    // TODO: what happens when all bricks are finished?

    brick.disableBody(true, true);

    this.score += 1;
    this.scoreText.setText('Score:' + this.score);

    if(this.score === this.brickCount)
    {
      this.stateText.text = "GAME OVER \n Click to restart";
      this.stateText.visible = true;

      // the click to restart handler
      //this.input.onTap.add(restart, this);

    } else {
      if (ball.body.velocity.x === 0) {
        let randNum = Math.random();
        if (randNum >= 0.5) {
          ball.body.setVelocityX(150);
        } else {
          ball.body.setVelocityX(-150);
        }
      }
    }
   
  }

  gameOver() {
    this.stateText.text = "GAME OVER \nClick to restart";
    this.stateText.visible = true;
  }

  restart() {
      this.scene.restart();
  }


}

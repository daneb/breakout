class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.baseURL = 'src/assets/'
    this.load.image('background', 'background.png');
    this.load.image('wall', 'puzzlepack/png/element_green_square.png');
    this.load.image('blue', 'puzzlepack/png/element_blue_rectangle.png');
    this.load.image('green', 'puzzlepack/png/element_green_rectangle.png');
    this.load.image('grey', 'puzzlepack/png/element_grey_rectangle.png');
    this.load.image('purple', 'puzzlepack/png/element_purple_rectangle.png');
    this.load.image('red', 'puzzlepack/png/element_red_rectangle.png');
    this.load.image('yellow', 'puzzlepack/png/element_yellow_rectangle.png');
    this.load.image('grey', 'puzzlepack/png/element_grey_rectangle.png');
    this.load.image('ball', 'puzzlepack/png/ballBlue.png');
  }

  create() {
    this.scene.start('MainScene')
  }
}

import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    // small loading text
    const w = this.scale.width
    const h = this.scale.height
    this.add.text(w / 2, h / 2, 'Booting CampCode...', { color: '#ffffff' }).setOrigin(0.5)
  }

  create() {
    this.scene.start('PreloadScene')
  }
}

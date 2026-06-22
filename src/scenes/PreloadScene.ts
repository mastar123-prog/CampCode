import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    const w = this.scale.width
    const h = this.scale.height
    const loading = this.add.text(w / 2, h / 2 - 40, 'Loading assets...', { color: '#fff' }).setOrigin(0.5)
    const percentText = this.add.text(w / 2, h / 2, '0%', { color: '#fff' }).setOrigin(0.5)

    this.load.on('progress', (p: number) => {
      percentText.setText(Math.round(p * 100) + '%')
    })

    // Images (simple, realistic-style placeholders as SVGs)
    this.load.image('campsite', 'assets/campsite.svg')
    this.load.image('bobber', 'assets/bobber.svg')
    this.load.image('tent_piece', 'assets/tent.svg')
    this.load.image('arrow', 'assets/arrow.svg')

    // small UI icons
    this.load.image('btn', 'assets/button.svg')

    // small sound placeholders (empty small files or omitted for now)

  }

  create() {
    this.scene.start('MainMenuScene')
  }
}

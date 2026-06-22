import Phaser from 'phaser'

export default class ForageScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ForageScene' })
  }

  create() {
    this.add.text(20, 20, 'Foraging: click plants to collect safe ones. Avoid poisonous ones. ESC to exit.', { color: '#fff' })

    // spawn some plants with safe/poisonous flag
    for (let i = 0; i < 6; i++) {
      const x = 120 + (i % 3) * 220
      const y = 220 + Math.floor(i / 3) * 200
      const img = this.add.image(x, y, 'leaf').setInteractive({ useHandCursor: true })
      const safe = Phaser.Math.Between(0, 1) === 1
      img.setData('safe', safe)
      img.on('pointerdown', () => {
        if (img.getData('safe')) {
          this.add.text(20, 60 + i * 12, 'Collected safe plant +6', { color: '#8ef' })
          this.game.events.emit('score-change', 6)
          img.destroy()
        } else {
          this.add.text(20, 60 + i * 12, 'Poisonous! -5', { color: '#f88' })
          this.game.events.emit('score-change', -5)
          img.destroy()
        }
      })
    }

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

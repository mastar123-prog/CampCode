import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    this.add.text(w / 2, 120, 'CampCode', { fontSize: '48px', color: '#ffffff' }).setOrigin(0.5)
    this.add.text(w / 2, 180, 'Realistic free assets — mini-games: fishing, tent setup, archery, and more', { color: '#ddd' }).setOrigin(0.5)

    const start = this.add.text(w / 2, h / 2, 'Start', { backgroundColor: '#2b7a78', padding: { x: 20, y: 10 }, color: '#fff' }).setOrigin(0.5)
    start.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      this.scene.start('CampMapScene')
    })

    const instructions = this.add.text(w / 2, h / 2 + 80, 'How to play: Click areas on the camp map to play mini-games. ESC returns to map.', { color: '#fff' }).setOrigin(0.5)
  }
}

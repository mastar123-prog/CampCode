import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene {
  private score = 0
  private scoreText!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'UIScene', active: false })
  }

  create() {
    this.scoreText = this.add.text(820, 20, 'Score: 0', { color: '#fff' })

    // listen for score events
    this.game.events.on('score-change', (delta: number) => {
      this.score += delta
      this.scoreText.setText('Score: ' + this.score)
    })

    // simple inventory placeholder
    this.add.text(20, 720, 'Inventory: (placeholder)', { color: '#fff' })
  }
}

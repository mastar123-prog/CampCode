import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene {
  private score = 0
  private scoreText!: Phaser.GameObjects.Text
  private cursor!: Phaser.GameObjects.Image
  private tooltip!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'UIScene', active: false })
  }

  create() {
    // score display
    this.scoreText = this.add.text(820, 20, 'Score: 0', { color: '#fff' })

    // listen for score events
    this.game.events.on('score-change', (delta: number) => {
      this.score += delta
      this.scoreText.setText('Score: ' + this.score)
    })

    // cursor-like follower (in the spirit of cursorcamp)
    this.cursor = this.add.image(0, 0, 'cursor').setDepth(1000).setScale(0.6)
    this.cursor.setVisible(true)

    this.tooltip = this.add.text(16, 40, '', { color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 6, y: 4 } }).setDepth(1001)
    this.tooltip.setVisible(false)

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      // follow with slight lag
      this.tweens.add({
        targets: this.cursor,
        x: pointer.x,
        y: pointer.y,
        duration: 60,
        ease: 'Power2'
      })
    })

    // show helpful hints when hovering interactive objects (simple global approach)
    this.input.on('gameobjectover', (pointer: any, gameObject: any) => {
      if (gameObject.input && gameObject.input.enabled) {
        this.tooltip.setText('Click to play: ' + (gameObject.name || 'Mini-game'))
        this.tooltip.setPosition(pointer.x + 12, pointer.y + 12)
        this.tooltip.setVisible(true)
      }
    })
    this.input.on('gameobjectout', () => {
      this.tooltip.setVisible(false)
    })

    // simple inventory placeholder
    this.add.text(20, 720, 'Inventory: (placeholder)', { color: '#fff' })
  }
}

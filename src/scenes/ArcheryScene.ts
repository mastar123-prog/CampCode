import Phaser from 'phaser'

export default class ArcheryScene extends Phaser.Scene {
  private arrow!: Phaser.GameObjects.Image
  private power = 0
  private charging = false
  private targets: Phaser.GameObjects.Arc[] = []

  constructor() {
    super({ key: 'ArcheryScene' })
  }

  create() {
    this.add.text(20, 20, 'Archery: Hold SPACE (or touch) to build power, release to shoot. ESC to exit.', { color: '#fff' })

    // arrow offscreen
    this.arrow = this.add.image(160, this.scale.height - 160, 'arrow')
    this.arrow.setVisible(false)

    // create simple circular targets
    for (let i = 0; i < 3; i++) {
      const circle = this.add.circle(700 + i * 50, 300 + i * 60, 40 - i * 8, 0xffcc00).setStrokeStyle(4, 0x222222)
      this.targets.push(circle)
    }

    // controls
    this.input.keyboard.on('keydown-SPACE', () => {
      this.startCharge()
    })
    this.input.keyboard.on('keyup-SPACE', () => {
      this.release()
    })

    this.input.on('pointerdown', () => this.startCharge())
    this.input.on('pointerup', () => this.release())

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }

  startCharge() {
    this.charging = true
    this.power = 0
    this.arrow.setVisible(true)
    this.time.addEvent({
      delay: 50,
      callback: () => {
        if (!this.charging) return
        this.power = Math.min(100, this.power + 5)
      },
      loop: true
    })
  }

  release() {
    if (!this.charging) return
    this.charging = false
    // shoot with power
    const speed = 6 + this.power / 8
    const arrowSprite = this.add.sprite(180, this.scale.height - 160, 'arrow')
    arrowSprite.rotation = -0.1
    this.tweens.add({
      targets: arrowSprite,
      x: this.scale.width + 100,
      y: 100,
      duration: 1000 - Math.min(800, this.power * 8),
      onComplete: () => {
        // check collision with targets
        for (const t of this.targets) {
          const dist = Phaser.Math.Distance.Between(arrowSprite.x, arrowSprite.y, t.x, t.y)
          if (dist < (t.radius ?? 30)) {
            this.add.text(20, 60, 'Hit! +12 points', { color: '#8ef' })
            this.game.events.emit('score-change', 12)
            t.fillColor = 0x88ff88
            return
          }
        }
        this.add.text(20, 60, 'Miss...', { color: '#f88' })
      }
    })
  }
}

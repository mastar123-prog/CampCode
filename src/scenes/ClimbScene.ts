import Phaser from 'phaser'

export default class ClimbScene extends Phaser.Scene {
  private stamina = 100
  private staminaText!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'ClimbScene' })
  }

  create() {
    this.add.text(20, 20, 'Climbing: rapidly alternate mouse clicks to climb. Reach top without stamina dropping. ESC to exit.', { color: '#fff' })
    this.staminaText = this.add.text(20, 60, 'Stamina: ' + this.stamina, { color: '#fff' })

    let progress = 0
    const bar = this.add.rectangle(120, 200, 20, 200, 0x444444).setOrigin(0.5)
    const climber = this.add.rectangle(120, 300, 40, 20, 0x88a)

    this.input.on('pointerdown', () => {
      if (this.stamina <= 0) return
      progress += 8
      this.stamina -= 8
      this.staminaText.setText('Stamina: ' + Math.max(0, this.stamina))
      climber.y = 320 - progress
      if (progress >= 240) {
        this.add.text(20, 90, 'You reached the top! +16 points', { color: '#8ef' })
        this.game.events.emit('score-change', 16)
      }
    })

    // stamina slowly regains
    this.time.addEvent({ delay: 1000, loop: true, callback: () => { if (this.stamina < 100) this.stamina = Math.min(100, this.stamina + 3); this.staminaText.setText('Stamina: ' + this.stamina) } })

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

import Phaser from 'phaser'

export default class OrienteeringScene extends Phaser.Scene {
  private targetAngle = 0

  constructor() {
    super({ key: 'OrienteeringScene' })
  }

  create() {
    this.add.text(20, 20, 'Orienteering: use the compass to point to the hidden checkpoint. Click when aligned. ESC to exit.', { color: '#fff' })

    const map = this.add.image(this.scale.width / 2, this.scale.height / 2, 'map').setScale(0.6)
    const compass = this.add.circle(140, 140, 60, 0x8888ff).setStrokeStyle(4, 0x222)
    const needle = this.add.line(140, 140, 0, 0, 0, -40, 0xff0000).setLineWidth(4)

    this.targetAngle = Phaser.Math.Between(0, 359)

    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      const angle = Phaser.Math.Angle.Between(compass.x, compass.y, p.x, p.y)
      needle.rotation = angle
    })

    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const angleDeg = Phaser.Math.RadToDeg(needle.rotation)
      const diff = Phaser.Math.Angle.WrapDegrees(angleDeg - this.targetAngle)
      if (Math.abs(diff) < 15) {
        this.add.text(20, 60, 'Checkpoint found! +14 points', { color: '#8ef' })
        this.game.events.emit('score-change', 14)
      } else {
        this.add.text(20, 60, 'Wrong direction...', { color: '#f88' })
      }
    })

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

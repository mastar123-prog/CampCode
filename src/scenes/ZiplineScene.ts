import Phaser from 'phaser'

export default class ZiplineScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ZiplineScene' })
  }

  create() {
    this.add.text(20, 20, 'Zipline: hold pointer to glide, release to brake into the target. Aim for center. ESC to exit.', { color: '#fff' })

    const rider = this.add.circle(160, 120, 18, 0xaaaaaa)
    let dragging = false

    this.input.on('pointerdown', () => { dragging = true })
    this.input.on('pointerup', (p: Phaser.Input.Pointer) => {
      dragging = false
      // drop into target X
      const targetX = Phaser.Math.Between(600, 820)
      const dist = Math.abs(p.x - targetX)
      if (dist < 60) {
        this.add.text(20, 60, 'Perfect ride! +13 points', { color: '#8ef' })
        this.game.events.emit('score-change', 13)
      } else {
        this.add.text(20, 60, 'Rough landing...', { color: '#f88' })
      }
    })

    this.time.addEvent({ delay: 16, loop: true, callback: () => {
      if (dragging) rider.x += 6
    } })

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

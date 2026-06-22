import Phaser from 'phaser'

export default class FishingScene extends Phaser.Scene {
  private bobber!: Phaser.GameObjects.Image
  private isCasting = false
  private castStart = 0

  constructor() {
    super({ key: 'FishingScene' })
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    this.add.text(20, 20, 'Fishing Mini-game: SPACE to cast / reel. Tap for touch.', { color: '#fff' })

    this.bobber = this.add.image(w / 2, h / 2, 'bobber')
    this.bobber.setVisible(false)

    // pointer or keyboard
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.isCasting) this.cast(); else this.reel()
    })

    this.input.on('pointerdown', () => {
      if (!this.isCasting) this.cast(); else this.reel()
    })

    // ESC to return
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }

  cast() {
    this.isCasting = true
    this.castStart = this.time.now
    this.bobber.setVisible(true)
    this.bobber.setTint(0xffffff)
    this.tweens.add({
      targets: this.bobber,
      y: this.scale.height / 2 + 140,
      duration: 700,
      ease: 'Cubic.easeOut'
    })

    const bite = Phaser.Math.Between(700, 2500)
    this.time.delayedCall(bite, () => {
      if (!this.isCasting) return
      this.bobber.setTint(0xff0000)
      // bite window
      this.time.delayedCall(1200, () => {
        if (this.isCasting) this.bobber.setTint(0xffffff)
      })
    })
  }

  reel() {
    this.isCasting = false
    const caught = this.bobber.tintTopLeft === 0xff0000

    if (caught) {
      this.add.text(20, 50, 'You caught a fish! +10 points', { color: '#8ef' })
      this.game.events.emit('score-change', 10)
    } else {
      this.add.text(20, 50, 'Nothing this time...', { color: '#f88' })
    }

    this.tweens.add({
      targets: this.bobber,
      y: this.scale.height / 2,
      duration: 400,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        this.bobber.setVisible(false)
        this.bobber.clearTint()
      }
    })
  }
}

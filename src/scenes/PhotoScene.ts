import Phaser from 'phaser'

export default class PhotoScene extends Phaser.Scene {
  private animals: Phaser.GameObjects.Image[] = []

  constructor() {
    super({ key: 'PhotoScene' })
  }

  create() {
    this.add.text(20, 20, 'Wildlife Photo: wait for animals to appear, click to photograph. Timing and framing matter. ESC to exit.', { color: '#fff' })

    // spawn animals that move across screen
    for (let i = 0; i < 3; i++) {
      const a = this.add.image(-100 - i * 200, 200 + i * 80, 'bobber').setScale(0.8)
      this.tweens.add({ targets: a, x: 1200, duration: 6000 + i * 1200, delay: i * 800, repeat: -1 })
      this.animals.push(a)
    }

    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      // score based on how many animals are close to the pointer
      let hits = 0
      for (const a of this.animals) {
        const d = Phaser.Math.Distance.Between(p.x, p.y, a.x, a.y)
        if (d < 60) hits++
      }
      const points = hits * 9
      if (points > 0) {
        this.add.text(20, 60, 'Nice shot! +' + points + ' points', { color: '#8ef' })
        this.game.events.emit('score-change', points)
      } else {
        this.add.text(20, 60, 'Missed photo...', { color: '#f88' })
      }
    })

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

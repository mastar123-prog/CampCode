import Phaser from 'phaser'

export default class CookingScene extends Phaser.Scene {
  private state = 0

  constructor() {
    super({ key: 'CookingScene' })
  }

  create() {
    this.add.text(20, 20, 'Cooking: click to add ingredients, then click Cook. Timing affects score. ESC to exit.', { color: '#fff' })

    // simple UI: two ingredient buttons and a Cook button
    const ing1 = this.add.image(300, 300, 'leaf').setInteractive({ useHandCursor: true })
    const ing2 = this.add.image(380, 300, 'leaf').setInteractive({ useHandCursor: true })
    const pan = this.add.image(340, 420, 'pan')
    const cookBtn = this.add.text(540, 420, 'Cook', { backgroundColor: '#a34', color: '#fff', padding: { x: 10, y: 6 } }).setInteractive({ useHandCursor: true })

    let ingredients = 0
    ing1.on('pointerdown', () => { ingredients++; this.add.text(20, 60, 'Added ingredient: ' + ingredients, { color: '#8ef' }) })
    ing2.on('pointerdown', () => { ingredients++; this.add.text(20, 80, 'Added ingredient: ' + ingredients, { color: '#8ef' }) })

    cookBtn.on('pointerdown', () => {
      // simple timing: best when ingredients are >=2 and you click when a timer is in a sweet spot
      const time = this.time.now % 3000
      let points = 0
      if (ingredients >= 2 && time > 1000 && time < 2200) points = 18
      else if (ingredients >= 1) points = 8
      else points = 0

      if (points > 0) {
        this.add.text(20, 110, 'Cook successful! +' + points + ' points', { color: '#8ef' })
        this.game.events.emit('score-change', points)
      } else {
        this.add.text(20, 110, 'Burnt... 0 points', { color: '#f88' })
      }
    })

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

import Phaser from 'phaser'

export default class TentScene extends Phaser.Scene {
  private pieces: Phaser.GameObjects.Image[] = []
  private placed = 0

  constructor() {
    super({ key: 'TentScene' })
  }

  create() {
    this.add.text(20, 20, 'Tent Setup: drag pieces into place. ESC to exit.', { color: '#fff' })

    // create three pieces to drag
    const startX = 200
    for (let i = 0; i < 3; i++) {
      const img = this.add.image(startX + i * 120, 300, 'tent_piece').setInteractive({ draggable: true })
      img.setData('targetX', 520 + i * 60)
      img.setData('targetY', 360)
      this.input.setDraggable(img)
      this.pieces.push(img)
    }

    this.input.on('drag', (pointer: any, gameObject: any, dragX: number, dragY: number) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.input.on('dragend', (pointer: any, gameObject: any) => {
      const tx = gameObject.getData('targetX')
      const ty = gameObject.getData('targetY')
      const dist = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, tx, ty)
      if (dist < 50) {
        gameObject.x = tx
        gameObject.y = ty
        gameObject.disableInteractive()
        this.placed++
        if (this.placed >= 3) {
          this.add.text(20, 60, 'Tent assembled! +15 points', { color: '#8ef' })
          this.game.events.emit('score-change', 15)
        }
      }
    })

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop('UIScene')
      this.scene.start('CampMapScene')
    })
  }
}

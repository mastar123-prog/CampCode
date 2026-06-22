import Phaser from 'phaser'

export default class CampMapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CampMapScene' })
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height

    const bg = this.add.image(w / 2, h / 2, 'campsite')
    bg.setDisplaySize(Math.min(w - 80, 900), Math.min(h - 160, 600))

    this.add.text(40, 20, 'Camp Map - Click an area to play a mini-game', { color: '#fff' })

    // Fishing area (left)
    const fishingZone = this.add.rectangle(180, h / 2 + 60, 220, 160, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(110, h / 2 + 140, 'Fishing', { color: '#fff' })
    fishingZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('FishingScene')
    })

    // Tent area (center)
    const tentZone = this.add.rectangle(w / 2, h / 2 + 30, 220, 160, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w / 2 - 40, h / 2 + 140, 'Set Up Tent', { color: '#fff' })
    tentZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('TentScene')
    })

    // Archery area (right)
    const archeryZone = this.add.rectangle(w - 180, h / 2 + 60, 220, 160, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w - 260, h / 2 + 140, 'Archery', { color: '#fff' })
    archeryZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('ArcheryScene')
    })

    // hint to go back
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainMenuScene')
    })
  }
}

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

    this.add.text(40, 20, 'Camp Map - Click an area to play a mini-game (cursor follows like CursorCamp)', { color: '#fff' })

    // Fishing area (left)
    const fishingZone = this.add.rectangle(140, h / 2 + 60, 200, 140, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(70, h / 2 + 140, 'Fishing', { color: '#fff' })
    fishingZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('FishingScene')
    })

    // Tent area (center-left)
    const tentZone = this.add.rectangle(w / 2 - 140, h / 2 + 20, 200, 140, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w / 2 - 200, h / 2 + 120, 'Set Up Tent', { color: '#fff' })
    tentZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('TentScene')
    })

    // Archery area (center-right)
    const archeryZone = this.add.rectangle(w / 2 + 140, h / 2 + 20, 200, 140, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w / 2 + 80, h / 2 + 120, 'Archery', { color: '#fff' })
    archeryZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('ArcheryScene')
    })

    // Cooking area (near fire)
    const cookingZone = this.add.rectangle(380, h / 2 + 200, 160, 120, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(320, h / 2 + 260, 'Cooking', { color: '#fff' })
    cookingZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('CookingScene')
    })

    // Orienteering area (map table)
    const orienteeringZone = this.add.rectangle(760, h / 2 - 80, 160, 120, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(720, h / 2 + 40, 'Orienteering', { color: '#fff' })
    orienteeringZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('OrienteeringScene')
    })

    // Foraging area (bushes)
    const forageZone = this.add.rectangle(80, h / 2 + 260, 160, 120, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(20, h / 2 + 320, 'Forage', { color: '#fff' })
    forageZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('ForageScene')
    })

    // Climbing area (cliff)
    const climbZone = this.add.rectangle(w - 140, h / 2 - 40, 160, 160, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w - 260, h / 2 + 120, 'Climb', { color: '#fff' })
    climbZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('ClimbScene')
    })

    // Zipline area
    const ziplineZone = this.add.rectangle(w - 380, h / 2 - 140, 160, 120, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w - 520, h / 2 - 20, 'Zipline', { color: '#fff' })
    ziplineZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('ZiplineScene')
    })

    // Wildlife photography area
    const photoZone = this.add.rectangle(w / 2, h / 2 - 180, 200, 120, 0x000000, 0.001).setInteractive({ useHandCursor: true })
    this.add.text(w / 2 - 60, h / 2 - 100, 'Photo', { color: '#fff' })
    photoZone.on('pointerdown', () => {
      this.scene.launch('UIScene')
      this.scene.start('PhotoScene')
    })

    // hint to go back
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainMenuScene')
    })
  }
}

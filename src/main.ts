import Phaser from 'phaser'
import BootScene from '@/scenes/BootScene'
import PreloadScene from '@/scenes/PreloadScene'
import MainMenuScene from '@/scenes/MainMenuScene'
import CampMapScene from '@/scenes/CampMapScene'
import FishingScene from '@/scenes/FishingScene'
import TentScene from '@/scenes/TentScene'
import ArcheryScene from '@/scenes/ArcheryScene'
import UIScene from '@/scenes/UIScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game',
  backgroundColor: '#1b2b34',
  scene: [BootScene, PreloadScene, MainMenuScene, CampMapScene, FishingScene, TentScene, ArcheryScene, UIScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

window.addEventListener('load', () => {
  // eslint-disable-next-line no-new
  new Phaser.Game(config)
})

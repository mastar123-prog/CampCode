import Phaser from 'phaser'
import BootScene from '@/scenes/BootScene'
import PreloadScene from '@/scenes/PreloadScene'
import MainMenuScene from '@/scenes/MainMenuScene'
import CampMapScene from '@/scenes/CampMapScene'
import FishingScene from '@/scenes/FishingScene'
import TentScene from '@/scenes/TentScene'
import ArcheryScene from '@/scenes/ArcheryScene'
import CookingScene from '@/scenes/CookingScene'
import OrienteeringScene from '@/scenes/OrienteeringScene'
import ForageScene from '@/scenes/ForageScene'
import ClimbScene from '@/scenes/ClimbScene'
import ZiplineScene from '@/scenes/ZiplineScene'
import PhotoScene from '@/scenes/PhotoScene'
import UIScene from '@/scenes/UIScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game',
  backgroundColor: '#1b2b34',
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    CampMapScene,
    FishingScene,
    TentScene,
    ArcheryScene,
    CookingScene,
    OrienteeringScene,
    ForageScene,
    ClimbScene,
    ZiplineScene,
    PhotoScene,
    UIScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

window.addEventListener('load', () => {
  // eslint-disable-next-line no-new
  new Phaser.Game(config)
})

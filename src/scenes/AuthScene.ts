import Phaser from 'phaser'
import { signIn, signUp, onAuthChange, signOut } from '@/services/authService'

export default class AuthScene extends Phaser.Scene {
  private status!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'AuthScene' })
  }

  create() {
    const w = this.scale.width
    this.add.text(w / 2, 80, 'Account / Login', { fontSize: '28px', color: '#fff' }).setOrigin(0.5)

    const emailInput = this.add.dom(w / 2 - 120, 160, 'input', 'width:220px', '')
    const passInput = this.add.dom(w / 2 + 60, 160, 'input', 'type=password;width:220px', '')

    const signup = this.add.text(w / 2 - 80, 220, 'Sign up', { backgroundColor: '#2b7a78', padding: { x: 10, y: 6 }, color: '#fff' }).setInteractive({ useHandCursor: true })
    const login = this.add.text(w / 2 + 40, 220, 'Log in', { backgroundColor: '#2b7a78', padding: { x: 10, y: 6 }, color: '#fff' }).setInteractive({ useHandCursor: true })

    this.status = this.add.text(20, 20, '', { color: '#fff' })

    signup.on('pointerdown', async () => {
      const email = (emailInput.node as HTMLInputElement).value
      const pw = (passInput.node as HTMLInputElement).value
      try {
        await signUp(email, pw)
        this.status.setText('Signed up — you are logged in')
        this.scene.start('MultiplayerLobbyScene')
      } catch (e: any) {
        this.status.setText('Sign up error: ' + (e.message || e))
      }
    })

    login.on('pointerdown', async () => {
      const email = (emailInput.node as HTMLInputElement).value
      const pw = (passInput.node as HTMLInputElement).value
      try {
        await signIn(email, pw)
        this.status.setText('Logged in')
        this.scene.start('MultiplayerLobbyScene')
      } catch (e: any) {
        this.status.setText('Login error: ' + (e.message || e))
      }
    })

    // guest quick start
    const guest = this.add.text(w / 2, 300, 'Play as Guest', { backgroundColor: '#555', color: '#fff', padding: { x: 10, y: 6 } }).setOrigin(0.5).setInteractive({ useHandCursor: true })
    guest.on('pointerdown', () => {
      // create a simple local profile and continue
      localStorage.setItem('campcode_profile', JSON.stringify({ username: 'Guest-' + Phaser.Math.Between(1000, 9999) }))
      this.scene.start('MultiplayerLobbyScene')
    })

    // sign-out / show current user
    onAuthChange((u) => {
      if (u) this.status.setText('Signed in: ' + (u.email || u.uid))
      else this.status.setText('Not signed in')
    })
  }
}

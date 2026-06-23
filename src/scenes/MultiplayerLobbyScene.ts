import Phaser from 'phaser'
import { createLobby, joinLobby, leaveLobby, createGameSession } from '@/services/multiplayerService'
import { auth } from '@/services/firebase'

export default class MultiplayerLobbyScene extends Phaser.Scene {
  private listText!: Phaser.GameObjects.Text
  private lobbyId: string | null = null
  private playerId = 'p-' + Math.random().toString(36).slice(2, 9)

  constructor() {
    super({ key: 'MultiplayerLobbyScene' })
  }

  create() {
    const w = this.scale.width
    this.add.text(w / 2, 60, 'Multiplayer Lobby', { fontSize: '28px', color: '#fff' }).setOrigin(0.5)

    const createBtn = this.add.text(140, 120, 'Create Lobby', { backgroundColor: '#2b7a78', color: '#fff', padding: { x: 10, y: 6 } }).setInteractive({ useHandCursor: true })
    const joinInput = this.add.dom(360, 128, 'input', 'width:220px', '')
    const joinBtn = this.add.text(600, 120, 'Join Lobby', { backgroundColor: '#2b7a78', color: '#fff', padding: { x: 10, y: 6 } }).setInteractive({ useHandCursor: true })

    const startGameBtn = this.add.text(140, 160, 'Start Real-time Game', { backgroundColor: '#6a4', color: '#fff', padding: { x: 10, y: 6 } }).setInteractive({ useHandCursor: true })

    this.listText = this.add.text(40, 200, 'No lobby\n', { color: '#fff' })

    createBtn.on('pointerdown', () => {
      const username = this.getUsername()
      const id = createLobby(this.playerId, username + "'s lobby")
      this.lobbyId = id
      this.listText.setText('Created lobby: ' + id)
      joinLobby(id, this.playerId, username, (players) => {
        this.renderPlayers(players)
      })
    })

    joinBtn.on('pointerdown', () => {
      const id = (joinInput.node as HTMLInputElement).value
      if (!id) return
      this.lobbyId = id
      const username = this.getUsername()
      joinLobby(id, this.playerId, username, (players) => {
        this.renderPlayers(players)
      })
      this.listText.setText('Joined lobby: ' + id)
    })

    startGameBtn.on('pointerdown', () => {
      // create a realtime game and navigate to the real-time game scene
      const username = this.getUsername()
      const gameId = createGameSession(this.playerId, { type: 'archery-duel' })
      // set a local join so the lobby isn't required
      this.scene.start('RealTimeGameScene', { gameId, playerId: this.playerId })
    })

    // leave on ESC
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.lobbyId) leaveLobby(this.lobbyId, this.playerId)
      this.scene.start('CampMapScene')
    })
  }

  private getUsername() {
    // prefer firebase user email or local profile
    const u = auth.currentUser
    if (u && u.email) return u.email
    const p = localStorage.getItem('campcode_profile')
    if (p) try { return JSON.parse(p).username || 'guest' } catch { /* ignore */ }
    return 'Guest'
  }

  private renderPlayers(players: any) {
    const lines: string[] = ['Players:']
    for (const k of Object.keys(players || {})) {
      lines.push(' - ' + (players[k].username || k))
    }
    this.listText.setText(lines.join('\n'))
  }
}

import Phaser from 'phaser'
import { joinGameSession, leaveGameSession, sendPlayerAction, listenForActions, clearPlayerAction, updateGameState } from '@/services/multiplayerService'
import { auth } from '@/services/firebase'

export default class RealTimeGameScene extends Phaser.Scene {
  private gameId!: string
  private playerId!: string
  private isHost = false
  private players: any = {}
  private score = 0
  private opponentScore = 0

  constructor() {
    super({ key: 'RealTimeGameScene' })
  }

  init(data: any) {
    this.gameId = data.gameId
    this.playerId = data.playerId || 'p-' + Math.random().toString(36).slice(2, 9)
  }

  create() {
    const w = this.scale.width
    this.add.text(w / 2, 20, 'Real-time Archery Duel', { fontSize: '22px', color: '#fff' }).setOrigin(0.5)

    // determine host by checking game owner (simpler: first player is host if ownerId matches)
    // join the game session and listen for state updates
    joinGameSession(this.gameId, this.playerId, this.getUsername(), (state) => {
      if (!state) return
      // determine host
      if (state.ownerId === this.playerId) this.isHost = true
      this.handleState(state)
    }, (players) => {
      this.players = players || {}
    })

    // basic UI
    this.add.text(40, 60, 'Hold SPACE to charge power, release to shoot. Host resolves hits.', { color: '#ddd' })
    this.add.text(40, 100, 'Your score: 0', { color: '#8ef' }).setName('yourScore')
    this.add.text(40, 120, 'Opponent score: 0', { color: '#8ef' }).setName('opScore')

    // simple visuals for both arrows
    const myArrow = this.add.rectangle(160, this.scale.height - 120, 40, 8, 0xaaaaaa).setOrigin(0.5)
    const oppArrow = this.add.rectangle(this.scale.width - 160, this.scale.height - 120, 40, 8, 0xffaaaa).setOrigin(0.5)

    let charging = false
    let power = 0
    let chargeTimer: Phaser.Time.TimerEvent | null = null

    this.input.keyboard.on('keydown-SPACE', () => {
      if (charging) return
      charging = true
      power = 0
      chargeTimer = this.time.addEvent({ delay: 50, loop: true, callback: () => { power = Math.min(100, power + 6) } })
    })

    this.input.keyboard.on('keyup-SPACE', () => {
      if (!charging) return
      charging = false
      if (chargeTimer) chargeTimer.remove(false)
      // send action to server (host)
      sendPlayerAction(this.gameId, this.playerId, { type: 'shoot', power })
    })

    // Host listens for actions and resolves
    if (this.isHost) {
      listenForActions(this.gameId, (playerId, action) => {
        if (!action) return
        if (action.type === 'shoot') {
          // naive resolution: compare power / random to determine hit
          const hit = action.power + Phaser.Math.Between(-10, 20) > 50
          const scores = {}
          scores[`scores/${playerId}`] = (this.getStateScore(playerId) || 0) + (hit ? 10 : 0)
          scores['lastTick'] = Date.now()
          // write state update
          updateGameState(this.gameId, { state: { scores: { ...(scores as any) } } })
          // clear action
          clearPlayerAction(this.gameId, playerId)
        }
      })
    }

    // listen to state updates and animate arrows for remote players' last actions
    const stateRefCallback = (state: any) => {
      if (!state) return
      const scores = state.state && state.state.scores ? state.state.scores : {}
      const myScore = scores[this.playerId] || 0
      // find first other player's score
      let otherScore = 0
      for (const k of Object.keys(scores)) {
        if (k !== this.playerId) { otherScore = scores[k]; break }
      }
      this.score = myScore
      this.opponentScore = otherScore
      const yourText = this.children.getByName('yourScore') as Phaser.GameObjects.Text
      const opText = this.children.getByName('opScore') as Phaser.GameObjects.Text
      if (yourText) yourText.setText('Your score: ' + this.score)
      if (opText) opText.setText('Opponent score: ' + this.opponentScore)
    }

    // ESC to leave
    this.input.keyboard.on('keydown-ESC', () => {
      leaveGameSession(this.gameId, this.playerId)
      this.scene.start('MultiplayerLobbyScene')
    })
  }

  private handleState(state: any) {
    // update based on authoritative state if needed
    // (the scene listens to state changes via the joinGameSession callback)
  }

  private getUsername() {
    const u = auth.currentUser
    if (u && u.email) return u.email
    const p = localStorage.getItem('campcode_profile')
    if (p) try { return JSON.parse(p).username || 'guest' } catch { /* ignore */ }
    return 'Guest'
  }

  private getStateScore(playerId: string) {
    // read a snapshot from the game's state (best-effort)
    // Note: For simplicity this reads once from the Realtime DB path; in a complete implementation we would cache the state.
    return 0
  }
}

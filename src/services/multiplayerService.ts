import { rtdb } from './firebase'
import { ref, set, onValue, push, onDisconnect, remove, update } from 'firebase/database'

// Simple lobby/presence using Realtime Database (existing functions kept)
export function createLobby(ownerId: string, lobbyName: string) {
  const lRef = push(ref(rtdb, 'lobbies'))
  const lobbyId = lRef.key!
  set(lRef, { ownerId, lobbyName, createdAt: Date.now() })
  return lobbyId
}

export function joinLobby(lobbyId: string, playerId: string, username: string, cb: (players: any) => void) {
  const playersRef = ref(rtdb, `lobbyPlayers/${lobbyId}/${playerId}`)
  // add presence entry
  set(playersRef, { username, joinedAt: Date.now() })
  onDisconnect(playersRef).remove()

  // listen to player list
  const listRef = ref(rtdb, `lobbyPlayers/${lobbyId}`)
  onValue(listRef, (snap) => {
    cb(snap.val() || {})
  })
}

export function leaveLobby(lobbyId: string, playerId: string) {
  const playersRef = ref(rtdb, `lobbyPlayers/${lobbyId}/${playerId}`)
  remove(playersRef)
}

// Real-time game sessions
export function createGameSession(ownerId: string, settings: any = {}) {
  const gRef = push(ref(rtdb, 'games'))
  const gameId = gRef.key!
  const initialState = {
    ownerId,
    settings,
    createdAt: Date.now(),
    state: {
      phase: 'waiting',
      players: {},
      scores: {},
      lastTick: Date.now(),
    }
  }
  set(gRef, initialState)
  return gameId
}

export function joinGameSession(gameId: string, playerId: string, username: string, onState: (s: any) => void, onPlayers?: (p: any) => void) {
  const playerRef = ref(rtdb, `games/${gameId}/players/${playerId}`)
  set(playerRef, { username, joinedAt: Date.now() })
  onDisconnect(playerRef).remove()

  const stateRef = ref(rtdb, `games/${gameId}/state`)
  onValue(stateRef, (snap) => {
    onState(snap.val())
  })

  if (onPlayers) {
    const playersRef = ref(rtdb, `games/${gameId}/players`)
    onValue(playersRef, (snap) => {
      onPlayers(snap.val())
    })
  }
}

export function leaveGameSession(gameId: string, playerId: string) {
  const playerRef = ref(rtdb, `games/${gameId}/players/${playerId}`)
  remove(playerRef)
}

// Player actions: players write actions to a per-player node; host reads and clears them
export function sendPlayerAction(gameId: string, playerId: string, action: any) {
  const actionRef = ref(rtdb, `games/${gameId}/actions/${playerId}`)
  set(actionRef, { action, ts: Date.now() })
}

// Host functions
export function listenForActions(gameId: string, cb: (playerId: string, action: any) => void) {
  const actionsRef = ref(rtdb, `games/${gameId}/actions`)
  onValue(actionsRef, (snap) => {
    const val = snap.val() || {}
    for (const playerId of Object.keys(val)) {
      const entry = val[playerId]
      cb(playerId, entry.action)
    }
  })
}

export function clearPlayerAction(gameId: string, playerId: string) {
  const actionRef = ref(rtdb, `games/${gameId}/actions/${playerId}`)
  remove(actionRef)
}

export function updateGameState(gameId: string, newState: any) {
  const stateRef = ref(rtdb, `games/${gameId}/state`)
  update(stateRef, newState)
}

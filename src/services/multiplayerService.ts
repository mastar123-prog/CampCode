import { rtdb } from './firebase'
import { ref, set, onValue, push, onDisconnect, remove } from 'firebase/database'

// Simple lobby/presence using Realtime Database
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

import { db } from './firebase'
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore'

const LEADERBOARD_COLLECTION = 'leaderboard'

export async function submitScore(userId: string | null, username: string, score: number) {
  const col = collection(db, LEADERBOARD_COLLECTION)
  await addDoc(col, {
    userId: userId || 'guest',
    username: username || 'guest',
    score,
    createdAt: serverTimestamp(),
  })
}

export async function getTopScores(limitN = 10) {
  const q = query(collection(db, LEADERBOARD_COLLECTION), orderBy('score', 'desc'), limit(limitN))
  const snaps = await getDocs(q)
  return snaps.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
}

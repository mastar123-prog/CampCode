### Firebase + Multiplayer setup

This branch now includes optional Firebase integration for:
- Authentication (Email/Password)
- Firestore leaderboard
- Realtime Database lobby / presence for simple multiplayer lobbies

How to enable Firebase (local/dev)
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication & add Email/Password provider
3. Create a Firestore database (in your region)
4. Create a Realtime Database
5. Copy the project's config values and place them in a `.env` file at the repo root using `.env.example` as a template.

.env example (copy `.env.example` -> `.env` and fill values):
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_DATABASE_URL=...

Run locally after creating `.env`:
1. npm install
2. npm run dev
3. Open the URL that Vite prints

Notes about multiplayer & leaderboards
- Leaderboard entries are written to Firestore by submitScore(). To prevent abuse you should add security rules to limit writes (e.g., validate score ranges and authenticated users).
- Lobby/presence uses Realtime Database under /lobbyPlayers and /lobbies. This is a minimal presence system; it can be extended to support matchmaking and real-time state sync.
- I implemented a local-first accounts flow (guest/local profiles via localStorage) and a basic AuthScene to sign up / sign in with Firebase.

Security & privacy
- Do not commit real secrets. Keep `.env` out of source control (it's in .gitignore).
- If you want server-authoritative score validation, add a small server function (e.g., Cloud Function) to accept validated scores and write to Firestore.

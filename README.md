### Real-time multiplayer

This update implements a real-time game session system on top of Firebase Realtime Database. It includes:
- createGameSession / joinGameSession / leaveGameSession
- sendPlayerAction (players write their actions)
- listenForActions (host reads actions and resolves game state)
- A sample RealTimeGameScene that demonstrates an archery duel where the host resolves hits and writes authoritative scores.

How it works (high level)
- A player creates a game session. The creator is considered the host and acts as the authoritative server for that session.
- Players join the session and write actions (e.g., shoot) to their /games/{gameId}/actions/{playerId} node.
- The host listens for actions, resolves outcomes (hits, scoring), and writes updated state to /games/{gameId}/state.
- All clients listen for state updates and render accordingly.

Notes & next steps for production-ready play
- The host-based authoritative model works for small P2P-style games but requires host stability; consider a central server or Cloud Function for authoritative resolution if hosts are unreliable.
- Implement conflict handling, rate limiting, and validation to prevent cheating.
- Add player synchronization (positions, animations) for more interactive games; this demo focuses on action->resolution flow.

To test locally
- Ensure your Firebase `.env` is configured and Realtime Database is created.
- Start the app and open two browser windows. Create a lobby in one, or directly Start Real-time Game in the lobby scene to create a game and open the RealTimeGameScene.
- Join the same game from another window using the Join Lobby or joinGameSession flow (you can also directly call the scene with the gameId query param).


# CampCode - Camp mini-game (CampCode game)

This branch adds a Phaser 3 + TypeScript Vite project that provides a basic campsite with many mini-games and a CursorCamp-like cursor experience.

Implemented mini-games (MVP):
- Fishing (cast & reel timing)
- Tent setup (drag pieces)
- Archery (charge & shoot)
- Cooking (timed cooking)
- Orienteering (compass pointing)
- Foraging (collect safe plants)
- Climbing (stamina/tap race)
- Zipline (glide & land)
- Wildlife Photography (timing & framing)

The UI contains a cursor follower and tooltips inspired by Neal Agarwal's CursorCamp (cursorcamp.neal.fun) to make the map feel interactive. All assets are placeholder SVGs with permissive usage; replace them with CC0/high-detail realistic assets as desired.

Run locally:

1. git checkout campcode-game
2. npm install
3. npm run dev
4. Open the URL that Vite prints (usually http://localhost:5173)

Notes:
- Scenes are simple, focused on mechanics. Scoring uses a central UIScene event bus.
- Assets in the assets/ folder are placeholders. I will replace them with CC0 realistic photos or painted assets on your confirmation.

Next steps I will take after you confirm:
- Replace SVG placeholders with CC0 realistic assets (I will list sources and licenses).
- Polish each mini-game with animations, sounds, and better UX (1–2 days total).
- Add mobile/touch-optimized controls and UI scaling.
- Create a demo GIF and open a pull request with screenshots and usage notes.

If you'd like immediate changes, tell me which visual style for the realistic CC0 assets to prioritize (photorealistic photos, high-detail painted illustrations, or realistic stylized sprites) and I will begin swapping assets and polishing gameplay.

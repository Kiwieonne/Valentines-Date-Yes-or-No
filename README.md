# Valentines?


A playful Valentine's Day mini-game.

## How to play

1. Open `index.html` in a browser.
2. Try to click **No** (it dodges).
3. After enough dodges, the game transitions into the finale.
4. Click **Yes** to accept.

## Notes

- The game includes image/GIF effects and a short audio clip during key moments.
- If your browser blocks audio, interact with the page once (click/tap) and try again.

---

## Developer 🥸💻

For a more detailed understanding of the multiple files present in the program:

- **`index.html`** - Main HTML structure with the card, buttons, and overlay elements
- **`style.css`** - All styling, animations, backgrounds, and visual effects
- **`script2.js`** - Game logic: dodge mechanics, jumpscare triggers, audio playback, confetti/particle effects
- **`background.gif`** - Finale background animation
- **`no explosion.gif`** - Explosion effect when No button is defeated
- **`Last Chance.png`** - Jumpscare image shown at dodge #8
- **`rizz.png`** - Special image shown when Yes is clicked immediately
- **`final.mp3`** - Audio played during finale and Yes acceptance

---

## Features Implemented

- **Dodge Mechanic**: No button runs away from cursor/touch
- **Progressive Yes Button Growth**: Yes button grows larger with each dodge
- **Jumpscare at Dodge #8**: Screen goes black, "Last Chance" warning appears for 2 seconds
- **Explosion Finale at Dodge #13**: No button explodes, card breaks, screen transitions to finale
- **Rizz Mode**: Special overlay when Yes is clicked before any dodges
- **Audio Integration**: Background music with browser autoplay workarounds
- **Confetti & Particle Effects**: Visual celebration on Yes acceptance
- **Responsive Hearts Background**: Animated hearts and daisies
- **Screen Shake Effect**: Dramatic shake during explosion sequence

---

## Step-by-Step Procedure ▶️🎮

### Running Locally
1. Download or clone the repository
2. Extract all files to a folder
3. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari)

### Running via Local Server (Recommended)
1. Open terminal/command prompt in the project folder
2. Run: `python -m http.server 8000`
3. Open browser to: `http://localhost:8000`

### GitHub Pages
1. Simply click index.html

---

## What I Learned

This project was very fun to build! The interactive dodge mechanic and layered animations made it engaging to develop. However, there were some complications, especially with:

- **Audio playback**: Browsers have strict autoplay policies, so implementing reliable audio required workarounds like user gesture detection and manual unlock mechanisms
- **File attachments and paths**: Managing multiple image/GIF/audio files and ensuring they load correctly across different environments (local files vs. servers) was tricky
- **Cross-platform compatibility**: Making sure the game looks and behaves the same on Mac, Windows, and different browsers required careful testing
- **Timing and state management**: Coordinating multiple overlays (jumpscare, rizz, finale) with the dodge counter and ensuring they don't conflict took careful planning

Overall, it was a great learning experience in building an interactive web experience with animations, audio, and dynamic user interactions!

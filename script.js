const buttons = document.getElementById('buttons');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const result = document.getElementById('result');

let noPosition = { left: 260, top: 44 };
let dodgeCount = 0;
let noExploded = false;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function setNoPosition(left, top) {
  noPosition.left = left;
  noPosition.top = top;
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
}

function getRectRelativeTo(el, container) {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return {
    left: r.left - c.left,
    top: r.top - c.top,
    width: r.width,
    height: r.height,
    centerX: r.left - c.left + r.width / 2,
    centerY: r.top - c.top + r.height / 2,
  };
}

function spawnConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';

  const colors = ['#ff4d8d', '#ff2d75', '#ffd1dc', '#ffb3c7', '#ffffff'];
  const pieces = 36;

  for (let i = 0; i < pieces; i++) {
    const p = document.createElement('i');
    const left = Math.random() * 100;
    const delay = Math.random() * 0.25;
    const duration = 1.2 + Math.random() * 0.9;
    const rotate = (Math.random() * 60 - 30).toFixed(1);

    p.style.left = `${left}%`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.transform = `rotate(${rotate}deg)`;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;

    confetti.appendChild(p);
  }

  const card = document.querySelector('.card');
  card.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2200);
}

function acceptYes() {
  result.textContent = 'Yay! See you Soon';
  result.classList.add('success');
  spawnConfetti();

  // If we're in finale mode, reveal the message via CSS.
  if (document.body.classList.contains('finale')) {
    document.body.classList.add('accepted');
  }

  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.filter = 'saturate(1.1)';
}

function spawnPixelsAtButton() {
  const layer = document.createElement('div');
  layer.className = 'pixels';

  const colors = ['#ff4d8d', '#ff2d75', '#ffd1dc', '#ffb3c7', '#ffffff'];
  const pieces = 120;

  const containerRect = buttons.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const cx = (noRect.left - containerRect.left) + noRect.width / 2;
  const cy = (noRect.top - containerRect.top) + noRect.height / 2;

  for (let i = 0; i < pieces; i++) {
    const p = document.createElement('i');

    const size = 4 + Math.floor(Math.random() * 6);
    const c = colors[Math.floor(Math.random() * colors.length)];
    const spreadX = (Math.random() * 2 - 1) * (80 + Math.random() * 140);
    const fallY = 220 + Math.random() * 520;
    const driftY = fallY;
    const rot = (Math.random() * 2 - 1) * (360 + Math.random() * 720);
    const duration = 0.9 + Math.random() * 1.4;
    const delay = Math.random() * 0.12;

    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;
    p.style.setProperty('--s', `${size}px`);
    p.style.setProperty('--c', c);
    p.style.setProperty('--dx', `${spreadX.toFixed(1)}px`);
    p.style.setProperty('--dy', `${driftY.toFixed(1)}px`);
    p.style.setProperty('--r', `${rot.toFixed(1)}deg`);
    p.style.setProperty('--t', `${duration.toFixed(2)}s`);
    p.style.setProperty('--d', `${delay.toFixed(2)}s`);

    layer.appendChild(p);
  }

  buttons.appendChild(layer);
  setTimeout(() => layer.remove(), 2600);
}

function ensureNukeOverlay() {
  let overlay = document.querySelector('.nuke-overlay');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.className = 'nuke-overlay';

  const img = document.createElement('img');
  img.alt = '';
  img.src = './nuke.gif';
  overlay.appendChild(img);

  document.body.appendChild(overlay);
  return overlay;
}

function playNukeOverlay() {
  const overlay = ensureNukeOverlay();
  const img = overlay.querySelector('img');
  if (img) img.src = `./nuke.gif?t=${Date.now()}`;

  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 1500);
}

function explodeNo() {
  if (noExploded) return;
  noExploded = true;
  noBtn.classList.add('exploding');
  playNukeOverlay();
  spawnPixelsAtButton();
  document.body.classList.add('meltdown');
  const card = document.querySelector('.card');
  if (card) card.classList.add('breaking');

  // Make it non-interactive immediately
  noBtn.disabled = true;
  noBtn.style.pointerEvents = 'none';

  setTimeout(() => {
    noBtn.style.visibility = 'hidden';
  }, 520);

  // After the split animation finishes, go to the black finale + giant Yes button
  setTimeout(() => {
    document.body.classList.remove('meltdown');
    document.body.classList.add('finale');
    if (card) card.classList.remove('breaking');
  }, 1100);
}

function dodge(pointerClientX, pointerClientY) {
  if (noExploded) return;
  const containerRect = buttons.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const px = pointerClientX - containerRect.left;
  const py = pointerClientY - containerRect.top;

  const noCenterX = (noRect.left - containerRect.left) + noRect.width / 2;
  const noCenterY = (noRect.top - containerRect.top) + noRect.height / 2;

  const dx = px - noCenterX;
  const dy = py - noCenterY;
  const dist = Math.hypot(dx, dy);

  const dangerRadius = 90;
  if (dist > dangerRadius) return;

  const push = 120;
  const nx = dist === 0 ? 1 : dx / dist;
  const ny = dist === 0 ? 0 : dy / dist;

  const rawLeft = (noRect.left - containerRect.left) - nx * push;
  const rawTop = (noRect.top - containerRect.top) - ny * push;

  const maxLeft = containerRect.width - noRect.width;
  const maxTop = containerRect.height - noRect.height;

  const left = clamp(rawLeft, 0, maxLeft);
  const top = clamp(rawTop, 0, maxTop);

  const currentLeft = noRect.left - containerRect.left;
  const currentTop = noRect.top - containerRect.top;
  const movedEnough = Math.hypot(left - currentLeft, top - currentTop) > 8;

  setNoPosition(left, top);

  if (movedEnough) {
    dodgeCount += 1;
    if (dodgeCount >= 13) explodeNo();
  }
}

// Initial placement (in case CSS is overridden by browser zoom/layout)
window.addEventListener('load', () => {
  const rect = getRectRelativeTo(noBtn, buttons);
  setNoPosition(rect.left, rect.top);
});

buttons.addEventListener('mousemove', (e) => {
  if (noBtn.disabled) return;
  dodge(e.clientX, e.clientY);
});

// Mobile: dodge on touch as well
buttons.addEventListener('touchstart', (e) => {
  if (noBtn.disabled) return;
  const t = e.touches[0];
  if (!t) return;
  dodge(t.clientX, t.clientY);
}, { passive: true });

noBtn.addEventListener('mouseenter', () => {
  // Extra dodge when you almost catch it
  if (noBtn.disabled) return;
  const containerRect = buttons.getBoundingClientRect();
  const x = containerRect.left + containerRect.width * (0.2 + Math.random() * 0.6);
  const y = containerRect.top + containerRect.height * (0.2 + Math.random() * 0.6);
  dodge(x, y);
});

noBtn.addEventListener('click', () => {
  // In case someone manages to click it
  if (noBtn.disabled) return;
  result.textContent = "Hey! That's not allowed 😤";
  setTimeout(() => {
    if (!noBtn.disabled) result.textContent = '';
  }, 900);
});

yesBtn.addEventListener('click', acceptYes);

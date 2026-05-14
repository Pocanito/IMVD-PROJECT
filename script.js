const logoWrap = document.getElementById('logoWrap');
const menuOverlay = document.getElementById('menuOverlay');
const gearBtn = document.getElementById('gearBtn');
const runProjectBtn = document.getElementById('runProjectBtn');
const video = document.getElementById('video');

let menuOpen = false;

function startCycles() {
  // Logo: restart the CSS infinite animation timing
  logoWrap.classList.remove('anim');
  // Force reflow to restart animation cleanly
  // eslint-disable-next-line no-unused-expressions
  logoWrap.offsetHeight;
  logoWrap.classList.add('anim');

  // Video: ensure loop + play
  try {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    const p = video.play();
    if (p && typeof p.then === 'function') p.catch(() => {});
  } catch (_) {}
}

function openMenu() {
  menuOpen = true;
  menuOverlay.classList.add('open');
  menuOverlay.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  menuOpen = false;
  menuOverlay.classList.remove('open');
  menuOverlay.setAttribute('aria-hidden', 'true');
}

gearBtn.addEventListener('click', () => {
  if (menuOpen) closeMenu();
  else openMenu();
});

runProjectBtn.addEventListener('click', () => {
  closeMenu();
  // Restart cycles and bring focus back to stage
  startCycles();
});

// Keep menu clickable backdrop to close
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) closeMenu();
});

// Initial start
logoWrap.classList.add('anim');
startCycles();


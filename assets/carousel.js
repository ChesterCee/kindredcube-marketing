(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const cards = [...carousel.querySelectorAll('.profile-card')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 0;
  let timer = null;
  let startX = 0;
  let lastX = 0;
  let dragging = false;

  const normalizedOffset = (index) => {
    let offset = index - active;
    const half = Math.floor(cards.length / 2);
    if (offset > half) offset -= cards.length;
    if (offset < -half) offset += cards.length;
    return offset;
  };

  const render = () => {
    cards.forEach((card, index) => {
      const offset = normalizedOffset(index);
      card.dataset.position = Math.abs(offset) <= 2 ? String(offset) : 'hidden';
      card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
    });
  };

  const move = (direction = 1) => {
    active = (active + direction + cards.length) % cards.length;
    render();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    if (reduceMotion || timer) return;
    timer = window.setInterval(() => move(-1), 3200);
  };

  const pointerDown = (event) => {
    dragging = true;
    startX = lastX = event.clientX;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture?.(event.pointerId);
    stop();
  };

  const pointerMove = (event) => {
    if (!dragging) return;
    lastX = event.clientX;
  };

  const pointerUp = (event) => {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove('is-dragging');
    const delta = lastX - startX;
    if (Math.abs(delta) > 42) move(delta > 0 ? -1 : 1);
    carousel.releasePointerCapture?.(event.pointerId);
    start();
  };

  carousel.addEventListener('pointerdown', pointerDown);
  carousel.addEventListener('pointermove', pointerMove);
  carousel.addEventListener('pointerup', pointerUp);
  carousel.addEventListener('pointercancel', pointerUp);
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  render();
  start();
})();

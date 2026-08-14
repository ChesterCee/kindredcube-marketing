(() => {
  const next = document.body.dataset.swipeNext;
  if (!next) return;

  let startX = 0;
  let startY = 0;

  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    startX = event.clientX;
    startY = event.clientY;
  }, { passive: true });

  document.addEventListener("pointerup", (event) => {
    if (event.pointerType === "mouse") return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (deltaX > 80 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      window.location.href = next;
    }
  }, { passive: true });
})();

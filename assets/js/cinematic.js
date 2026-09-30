'use strict';

// Progressive enhancement: all chapters and links work without JavaScript.
(() => {
  const images = Array.from(document.querySelectorAll('.film-image, .cinematic-home .hero > img, .tech-hero-image'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 761px) and (min-height: 601px)');
  let frame = 0;

  function render() {
    frame = 0;
    const enabled = !motion.matches && desktop.matches;
    images.forEach((image) => {
      if (!enabled) {
        image.style.removeProperty('transform');
        return;
      }
      const scene = image.closest('.film-chapter, .hero, .tech-hero');
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      image.style.transform = `scale(${1.04 + progress * 0.045}) translateY(${(progress - 0.5) * 2}%)`;
    });
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  desktop.addEventListener('change', schedule);
  schedule();
})();

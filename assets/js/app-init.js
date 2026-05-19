setActiveStoryScene(scenes[0], true);
updateStoryPin();
window.addEventListener('scroll', requestStoryUpdate, { passive: true });
window.addEventListener('resize', requestStoryUpdate);
window.addEventListener('resize', updateMegaGridScrollState);
renderStoryInlineDetail();

if (quoteContent) {
  quoteContent.classList.add('is-ready');

  var quoteObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      quoteContent.classList.add('is-visible');
      quoteObserver.unobserve(quoteContent);
    });
  }, { threshold: 0.35 });

  quoteObserver.observe(quoteContent);
}

showLockScreen();

if (toggle) toggle.addEventListener('click', toggleMenu);
if (megaMenuOpen) megaMenuOpen.addEventListener('click', toggleMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (megaGrid) megaGrid.addEventListener('scroll', updateMegaGridScrollState, { passive: true });
if (deckPanelClose) deckPanelClose.addEventListener('click', closeDeckPanel);
if (detailClose) detailClose.addEventListener('click', closeDetailPanel);
if (panelBackdrop) panelBackdrop.addEventListener('click', closeAllPanels);
if (storyDetailOpen) storyDetailOpen.addEventListener('click', function () {
  if (!storyDetailInline) return;
  var isOpen = storyDetailInline.classList.toggle('open');
  storyDetailInline.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  storyDetailOpen.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  storyDetailOpen.textContent = isOpen ? 'Close detail' : 'Open detail';
  if (isOpen) renderStoryInlineDetail();
});
if (systemOverviewOpen) systemOverviewOpen.addEventListener('click', function () {
  openDetailPanel('kubeca-system');
});
if (progressToggle && progressBoard) progressToggle.addEventListener('click', function () {
  var isOpen = progressBoard.classList.toggle('open');
  progressBoard.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  progressToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  progressToggle.innerHTML = isOpen ? 'Close progress board <span>↑</span>' : 'Open progress board <span>↓</span>';
});
window.addEventListener('scroll', function () {
  if (!systemProgress || !progressBoard || !progressBoard.classList.contains('open')) return;
  window.clearTimeout(progressScrollTimer);
  progressScrollTimer = window.setTimeout(function () {
    var rect = systemProgress.getBoundingClientRect();
    if (rect.bottom < 120 || rect.top > window.innerHeight - 120) closeProgressBoard();
  }, 80);
}, { passive: true });
window.addEventListener('scroll', function () {
  if (!storySection || !storyDetailInline || !storyDetailInline.classList.contains('open')) return;
  window.clearTimeout(storyScrollTimer);
  storyScrollTimer = window.setTimeout(function () {
    var rect = storySection.getBoundingClientRect();
    if (rect.bottom < 120 || rect.top > window.innerHeight - 120) closeStoryInlineDetail();
  }, 80);
}, { passive: true });
progressLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    openDeckPanel(link.getAttribute('data-deck'));
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeProgressBoard();
    closeStoryInlineDetail();
    closeAllPanels();
  }
});

deckLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (link.closest('.mega-menu')) return;
    openDeckPanel(link.getAttribute('data-deck'));
  });
});

setupMegaMenuCollapsibleGroups();

var desktopPanelQuery = window.matchMedia('(min-width: 761px)');
function handlePanelViewportChange(event) {
  if (!event.matches) {
    closeDeckPanel();
    closeDetailPanel();
  }
}

if (desktopPanelQuery.addEventListener) {
  desktopPanelQuery.addEventListener('change', handlePanelViewportChange);
} else if (desktopPanelQuery.addListener) {
  desktopPanelQuery.addListener(handlePanelViewportChange);
}

if (detailPanel) {
  detailPanel.addEventListener('scroll', function () {
    if (!detailPanel.classList.contains('deck-detail') || !detailPanel.classList.contains('open') || !detailGrid) return;
    var sections = Array.prototype.slice.call(detailGrid.querySelectorAll('[data-deck-section]'));
    if (!sections.length) return;

    var activeSection = sections[0];
    var threshold = 220;

    sections.forEach(function (section) {
      if (section.offsetTop - detailPanel.scrollTop <= threshold) activeSection = section;
    });

    var nextDeckId = activeSection.getAttribute('data-deck-section');
    if (!nextDeckId || nextDeckId === activeDeckId) return;

    activeDeckId = nextDeckId;
    updateActiveDeckLinks(activeDeckId);
    detailGrid.querySelectorAll('[data-deck-section]').forEach(function (node) {
      var isActive = node.getAttribute('data-deck-section') === nextDeckId;
      node.classList.toggle('is-active', isActive);
    });
  }, { passive: true });
}

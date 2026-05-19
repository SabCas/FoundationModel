function openMenu() {
  if (!megaMenu) return;
  megaMenu.classList.add('open');
  megaMenu.setAttribute('aria-hidden', 'false');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
  updateMegaGridScrollState();
}

function closeMenu() {
  if (!megaMenu) return;
  megaMenu.classList.remove('open');
  megaMenu.setAttribute('aria-hidden', 'true');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  closeAllPanels();
}

function toggleMenu() {
  if (!megaMenu) return;
  if (megaMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

function updateMegaGridScrollState() {
  if (!megaGrid) return;
  var atEnd = megaGrid.scrollTop + megaGrid.clientHeight >= megaGrid.scrollHeight - 2;
  megaGrid.classList.toggle('is-scroll-end', atEnd);
}

function getDeckIndex(deckId) {
  return deckOrder.indexOf(deckId);
}

function getAdjacentDeckId(direction) {
  var index = getDeckIndex(activeDeckId);
  if (index < 0) return '';
  return deckOrder[(index + direction + deckOrder.length) % deckOrder.length];
}

function updateActiveDeckLinks(deckId) {
  document.querySelectorAll('[data-deck]').forEach(function (link) {
    var isActive = link.getAttribute('data-deck') === deckId;
    var isMegaMenuContext = !!link.closest('.mega-menu');
    link.classList.toggle('is-active', isActive && !isMegaMenuContext);
    if (isActive && !isMegaMenuContext) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (!megaRows || !megaRows.length) return;
  megaRows.forEach(function (row) {
    var ids = Array.prototype.slice.call(row.querySelectorAll('.deck-link')).map(function (button) {
      return button.getAttribute('data-deck');
    }).filter(Boolean);
    var hasActive = ids.indexOf(deckId) !== -1;
    row.classList.toggle('is-active', hasActive);
    row.classList.toggle('is-collapsed', !hasActive && row.classList.contains('is-collapsible'));
    var heading = row.querySelector('h4');
    if (heading) heading.setAttribute('aria-expanded', hasActive ? 'true' : String(!row.classList.contains('is-collapsed')));
  });
}

function clearActiveDeck() {
  activeDeckId = '';
  updateActiveDeckLinks('');
}

function setupMegaMenuCollapsibleGroups() {
  if (!megaRows || !megaRows.length) return;
  megaRows.forEach(function (row, index) {
    var heading = row.querySelector('h4');
    if (!heading) return;
    var subtopics = row.querySelectorAll('.deck-link');
    row.classList.add('is-collapsible');
    row.classList.add('is-collapsed');
    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    heading.setAttribute('aria-controls', 'mega-row-' + index);
    heading.setAttribute('aria-expanded', 'false');
    row.id = 'mega-row-' + index;

    subtopics.forEach(function (link) {
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
      link.setAttribute('role', 'presentation');
    });

    function openRowAndChapter() {
      megaRows.forEach(function (otherRow) {
        if (otherRow !== row) {
          otherRow.classList.add('is-collapsed');
          otherRow.classList.remove('is-active');
          var otherHeading = otherRow.querySelector('h4');
          if (otherHeading) otherHeading.setAttribute('aria-expanded', 'false');
        }
      });
      row.classList.remove('is-collapsed');
      row.classList.add('is-active');
      heading.setAttribute('aria-expanded', 'true');

      if (subtopics.length) {
        var deckId = subtopics[0].getAttribute('data-deck');
        if (deckId) openDeckPanel(deckId);
      }
    }

    heading.addEventListener('click', function () {
      openRowAndChapter();
    });

    heading.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openRowAndChapter();
    });
  });
}

function getDeckGroup(deckId) {
  var trigger = document.querySelector('.deck-link[data-deck="' + deckId + '"]');
  var row = trigger ? trigger.closest('.mega-row') : null;
  var buttons = row ? Array.prototype.slice.call(row.querySelectorAll('.deck-link')) : (trigger ? [trigger] : []);
  var heading = row && row.querySelector('h4') ? row.querySelector('h4').textContent.trim() : (deckData[deckId] ? deckData[deckId][0] : 'Investor Room');
  var ids = buttons.map(function (button) {
    return button.getAttribute('data-deck');
  }).filter(Boolean);

  if (!ids.length && deckData[deckId]) ids = [deckId];

  return {
    heading: heading,
    ids: ids,
    selectedIndex: Math.max(ids.indexOf(deckId), 0)
  };
}

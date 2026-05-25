function goToAdjacentDeck(direction) {
  var nextDeckId = getAdjacentDeckId(direction);
  if (nextDeckId) openDeckPanel(nextDeckId);
}

function getInvestorPageGroups() {
  return Array.prototype.slice.call(megaRows || []).map(function (row) {
    var ids = Array.prototype.slice.call(row.querySelectorAll('.deck-link')).map(function (button) {
      return button.getAttribute('data-deck');
    }).filter(Boolean);
    return {
      ids: ids,
      deckId: ids[0] || ''
    };
  }).filter(function (group) {
    return !!group.deckId;
  });
}

function renderInvestorLongScrollPages() {
  return getInvestorPageGroups().map(function (group) {
    return '<section class="investor-long-page" data-deck-section="' + group.deckId + '">' +
      renderDeckChapter(group.deckId) +
    '</section>';
  }).join('');
}

var systemCarouselController = null;

function destroySystemCarousel() {
  if (!systemCarouselController) return;
  systemCarouselController.destroy();
  systemCarouselController = null;
}

function initializeSystemCarousel() {
  destroySystemCarousel();
  if (!detailGrid) return;

  var carousel = detailGrid.querySelector('[data-system-carousel]');
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-system-slide-panel]'));
  var selectors = Array.prototype.slice.call(carousel.querySelectorAll('[data-system-slide]'));
  var previous = carousel.querySelector('[data-system-previous]');
  var next = carousel.querySelector('[data-system-next]');
  var counter = carousel.querySelector('[data-system-current]');
  var timer = null;
  var activeIndex = 0;
  var isHovered = false;
  var hasFocus = false;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      var isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    selectors.forEach(function (selector, selectorIndex) {
      var isActive = selectorIndex === activeIndex;
      selector.classList.toggle('is-active', isActive);
      if (isActive) {
        selector.setAttribute('aria-current', 'true');
      } else {
        selector.removeAttribute('aria-current');
      }
    });
    if (counter) counter.textContent = String(activeIndex + 1).padStart(2, '0');
  }

  function stopAutoplay() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (reduceMotion || isHovered || hasFocus) return;
    timer = window.setInterval(function () {
      showSlide(activeIndex + 1);
    }, 6000);
  }

  function selectSlide(index) {
    stopAutoplay();
    showSlide(index);
  }

  selectors.forEach(function (selector) {
    selector.addEventListener('click', function () {
      selectSlide(Number(selector.getAttribute('data-system-slide')));
    });
  });
  if (previous) {
    previous.addEventListener('click', function () {
      selectSlide(activeIndex - 1);
    });
  }
  if (next) {
    next.addEventListener('click', function () {
      selectSlide(activeIndex + 1);
    });
  }
  carousel.addEventListener('mouseenter', function () {
    isHovered = true;
    stopAutoplay();
  });
  carousel.addEventListener('mouseleave', function () {
    isHovered = false;
    startAutoplay();
  });
  carousel.addEventListener('focusin', function () {
    hasFocus = true;
    stopAutoplay();
  });
  carousel.addEventListener('focusout', function (event) {
    if (!carousel.contains(event.relatedTarget)) {
      hasFocus = false;
      startAutoplay();
    }
  });

  showSlide(0);
  startAutoplay();
  systemCarouselController = {
    destroy: stopAutoplay
  };
}

function setPanelScrollLock(isLocked) {
  if (isLocked) {
    if (!document.body.classList.contains('panel-scroll-lock')) {
      panelLockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = '-' + panelLockedScrollY + 'px';
    }
    document.documentElement.classList.add('panel-scroll-lock');
    document.body.classList.add('panel-scroll-lock');
    return;
  }

  if (document.body.classList.contains('panel-scroll-lock')) {
    document.documentElement.classList.remove('panel-scroll-lock');
    document.body.classList.remove('panel-scroll-lock');
    document.body.style.top = '';
    window.scrollTo(0, panelLockedScrollY);
  }
}

function openDeckPanel(deckId) {
  var card = deckData[deckId] || deckData['founder-thesis'];
  var group = getDeckGroup(deckId);
  activeDeckId = deckData[deckId] ? deckId : 'founder-thesis';
  var scrollTargetId = group && group.ids && group.ids.length ? group.ids[0] : activeDeckId;
  updateActiveDeckLinks(activeDeckId);

  if (deckId === 'prototype-platforms') {
    if (window.matchMedia('(min-width: 761px)').matches) {
      openMenu();
    } else {
      if (megaMenu) {
        megaMenu.classList.remove('open');
        megaMenu.setAttribute('aria-hidden', 'true');
      }
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    openDetailPanel('prototype-platforms');
    return;
  }

  closeDeckPanel();
  detailPanel.classList.remove('product-detail');
  detailPanel.classList.add('deck-detail');
  detailEyebrow.textContent = '';
  detailTitle.textContent = '';
  detailIntro.textContent = '';
  destroySystemCarousel();
  detailGrid.innerHTML = renderInvestorLongScrollPages();
  initializeSystemCarousel();

  if (window.matchMedia('(min-width: 761px)').matches) {
    openMenu();
  } else {
    if (megaMenu) {
      megaMenu.classList.remove('open');
      megaMenu.setAttribute('aria-hidden', 'true');
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (panelBackdrop) panelBackdrop.classList.add('open');
  if (detailPanel) {
    detailPanel.classList.add('open');
    detailPanel.setAttribute('aria-hidden', 'false');
    detailPanel.scrollTop = 0;
  }
  setPanelScrollLock(true);
  window.requestAnimationFrame(function () {
    var selectedSection = detailGrid ? detailGrid.querySelector('[data-deck-section="' + scrollTargetId + '"]') : null;
    if (selectedSection && detailPanel) {
      detailPanel.scrollTo({
        top: Math.max(selectedSection.offsetTop - 180, 0),
        behavior: 'smooth'
      });
    }
  });
}

function closeDeckPanel() {
  if (panelBackdrop) panelBackdrop.classList.remove('open');
  if (!deckPanel) return;
  deckPanel.classList.remove('open');
  deckPanel.setAttribute('aria-hidden', 'true');
}

function openDetailPanel(detailId) {
  var detail = detailData[detailId] || detailData['flying-understanding'];

  closeDeckPanel();
  destroySystemCarousel();
  if (detailId !== 'prototype-platforms') clearActiveDeck();
  if (detailPanel) {
    detailPanel.classList.remove('deck-detail');
    detailPanel.classList.toggle('product-detail', detailId === 'prototype-platforms');
  }
  detailEyebrow.textContent = detail.eyebrow;
  detailTitle.textContent = detail.title;
  detailIntro.textContent = detail.intro;
  detailGrid.innerHTML = '';

  if (detailId === 'prototype-platforms') {
    detailGrid.innerHTML = '<div class="product-slide-copy"><div class="product-slide-table"><div class="product-slide-row product-slide-head"><span>Platform</span><b>KUBECA LRA<small>Long-range aircraft</small></b><b>KUBECA SCD<small>Scout drone</small></b></div><div class="product-slide-row"><span>Overview</span><p>Long-endurance ISR platform for mapping, monitoring, and command.</p><p>Agile scout drone for close-range reconnaissance and perimeter scan.</p></div><div class="product-slide-row"><span>Endurance</span><p>12+ hours</p><p>45+ minutes</p></div><div class="product-slide-row"><span>Range</span><p>200+ km</p><p>25+ km</p></div><div class="product-slide-row"><span>Max payload</span><p>5 kg</p><p>1.2 kg</p></div><div class="product-slide-row"><span>Navigation</span><p>GPS-denied / INS / Visual</p><p>GPS-denied / INS / Visual</p></div><div class="product-slide-row"><span>Deployment</span><p>Runway / catapult</p><p>Hand launch</p></div><div class="product-slide-row"><span>Role</span><p>Command and control, wide-area ISR</p><p>Tactical recon, target localization</p></div></div></div><div class="product-slide-visual"><div class="product-wing"><i class="wing"></i><i class="body"></i><i class="tail"></i></div><div class="product-drone"><i></i><span></span><span></span><span></span><span></span></div></div><div class="product-slide-features"><span><b>GPS-denied operations</b><em>Built to navigate and operate in contested environments.</em></span><span><b>Team-centric autonomy</b><em>Multiple systems. One shared map. Coordinated as a single team.</em></span><span><b>Modular and adaptable</b><em>Open architecture for integration and mission flexibility.</em></span></div>' + renderDeckControls(activeDeckId);
    if (panelBackdrop) panelBackdrop.classList.add('open');
    if (detailPanel) {
      detailPanel.classList.add('open');
      detailPanel.setAttribute('aria-hidden', 'false');
    }
    setPanelScrollLock(true);
    return;
  }

  if (detail.body) {
    var body = document.createElement('p');
    body.className = 'detail-body';
    body.textContent = detail.body;
    detailGrid.appendChild(body);
  }

  if (detail.bullets && detail.bullets.length) {
    var list = document.createElement('ul');
    list.className = 'detail-bullets';
    detail.bullets.forEach(function (bullet) {
      var item = document.createElement('li');
      item.textContent = bullet;
      list.appendChild(item);
    });
    detailGrid.appendChild(list);
  }

  if (detail.why) {
    var why = document.createElement('div');
    why.className = 'detail-why';
    why.innerHTML = '<span>Why it matters</span><p>' + detail.why + '</p>';
    detailGrid.appendChild(why);
  }

  if (panelBackdrop) panelBackdrop.classList.add('open');
  if (detailPanel) {
    detailPanel.classList.add('open');
    detailPanel.setAttribute('aria-hidden', 'false');
  }
  setPanelScrollLock(true);
}

function closeDetailPanel() {
  destroySystemCarousel();
  if (panelBackdrop) panelBackdrop.classList.remove('open');
  if (!detailPanel) return;
  detailPanel.classList.remove('open');
  detailPanel.classList.remove('deck-detail');
  detailPanel.classList.remove('product-detail');
  detailPanel.setAttribute('aria-hidden', 'true');
  setPanelScrollLock(false);
  clearActiveDeck();
}

function closeAllPanels() {
  closeDeckPanel();
  closeDetailPanel();
}

function closeProgressBoard() {
  if (!progressToggle || !progressBoard || !progressBoard.classList.contains('open')) return;
  progressBoard.classList.remove('open');
  progressBoard.setAttribute('aria-hidden', 'true');
  progressToggle.setAttribute('aria-expanded', 'false');
  progressToggle.innerHTML = 'Open progress board <span>↓</span>';
}

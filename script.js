'use strict';

var lockScreen = document.getElementById('lockScreen');
var siteContent = document.getElementById('siteContent');
var passwordForm = document.getElementById('passwordForm');
var passwordMode = document.getElementById('passwordMode');
var passwordTitle = document.getElementById('passwordTitle');
var passwordInput = document.getElementById('passwordInput');
var passwordMessage = document.getElementById('passwordMessage');
var passwordSubmit = document.getElementById('passwordSubmit');
var signalState = document.getElementById('signalState');
var toggle = document.getElementById('mobileToggle');
var megaMenuOpen = document.getElementById('megaMenuOpen');
var megaMenu = document.getElementById('megaMenu');
var menuClose = document.getElementById('menuClose');
var panelBackdrop = document.getElementById('panelBackdrop');
var deckPanel = document.getElementById('deckPanel');
var deckPanelClose = document.getElementById('deckPanelClose');
var panelEyebrow = document.getElementById('panelEyebrow');
var panelTitle = document.getElementById('panelTitle');
var panelBody = document.getElementById('panelBody');
var panelNote = document.getElementById('panelNote');
var detailPanel = document.getElementById('detailPanel');
var detailClose = document.getElementById('detailClose');
var detailEyebrow = document.getElementById('detailEyebrow');
var detailTitle = document.getElementById('detailTitle');
var detailIntro = document.getElementById('detailIntro');
var detailGrid = document.getElementById('detailGrid');
var storyDetailOpen = document.getElementById('storyDetailOpen');
var systemOverviewOpen = document.getElementById('systemOverviewOpen');
var systemProgress = document.getElementById('systemProgress');
var progressToggle = document.getElementById('progressToggle');
var progressBoard = document.getElementById('progressBoard');
var progressLinks = document.querySelectorAll('.progress-row, .roadmap-item');
var deckLinks = document.querySelectorAll('.deck-link');
var scenes = document.querySelectorAll('.scene');
var quoteContent = document.querySelector('.quote-content');
var storyText = document.getElementById('storyText');
var storyTitle = document.getElementById('storyTitle');
var storyCopy = document.getElementById('storyCopy');
var storedPassword = localStorage.getItem('sitePassword');
var activeStoryDetail = 'flying-understanding';
var storyTextTimer;
var progressScrollTimer;

var deckData = {
  'founder-thesis': ['Who We Are', 'The founder thesis', 'KUBECA begins with a simple premise: autonomous systems need a navigation intelligence layer that survives when GPS disappears.', 'Private preview / origin'],
  'company-vision': ['Who We Are', 'The company vision', 'Build the spatial intelligence layer that lets aerial systems understand where they are, what changed, and how to recover.', 'Private preview / vision'],
  'research-direction': ['Who We Are', 'The research direction', 'Our research connects visual-inertial localization, scene graphs, map matching, and uncertainty-aware autonomy.', 'Research track'],
  'gps-disappears': ['Why We Exist', 'When GPS disappears', 'Signal denial, urban occlusion, spoofing, and degraded environments expose a core autonomy weakness: dependence on external positioning.', 'Problem frame'],
  'autonomy-bottleneck': ['Why We Exist', 'The autonomy bottleneck', 'Autonomous systems can perceive more than ever, but they still need resilient position, memory, and route recovery when infrastructure fails.', 'Problem frame'],
  'navigation-change': ['Why We Exist', 'Why navigation must change', 'Future aerial autonomy needs navigation that is local, adaptive, memory-based, and robust to uncertainty.', 'Thesis'],
  'software-layer': ['What We Build', 'The software intelligence layer', 'The first KUBECA layer turns perception, inertial motion, maps, and confidence estimates into navigation decisions.', 'Core system'],
  'prototype-platforms': ['What We Build', 'Prototype aerial platforms', 'KUBECA’s prototype direction pairs KUBECA LRA, a long-range aircraft for 12+ hour wide-area ISR and command, with KUBECA SCD, a 45+ minute scout drone for close-range reconnaissance, perimeter scan, and target localization. Both are designed around GPS-denied / INS / visual navigation.', 'Pitch deck / prototype'],
  'hardware-architecture': ['What We Build', 'The aerial hardware architecture', 'Hardware planning stays close to the software: sensing, onboard compute, deployable scouts, and field-ready autonomy constraints.', 'Roadmap'],
  'scout-uav-roadmap': ['What We Build', 'The scout UAV roadmap', 'Scout UAVs are the first practical path for testing localization, route recovery, and scene-memory workflows.', 'Roadmap'],
  'multi-drone-network': ['What We Build', 'The multi-drone spatial network', 'Future drone teams can share partial maps, reduce uncertainty, and build collaborative spatial awareness.', 'Future layer'],
  'perception-positioning': ['How It Works', 'Perception becomes positioning', 'Visual observations become navigation signals when matched against motion, landmarks, terrain, and prior structure.', 'Mechanism'],
  'state-estimation': ['How It Works', 'Sensors become state estimation', 'Cameras, IMUs, altitude, and local context combine into a continuously updated estimate of state and confidence.', 'Mechanism'],
  'scene-graphs': ['How It Works', 'Scene graphs become spatial memory', 'The system can organize observed places, landmarks, and transitions into memory that supports future recovery.', 'Mechanism'],
  'map-recovery': ['How It Works', 'Maps support position recovery', 'Map-assisted localization helps the system recover orientation and position after drift or signal loss.', 'Mechanism'],
  'uncertainty': ['How It Works', 'Uncertainty guides decisions', 'Instead of hiding uncertainty, KUBECA treats it as a decision signal for route choice, recovery, and collaboration.', 'Mechanism'],
  'degraded-signals': ['Where It Operates', 'Degraded signal environments', 'Designed for places where satellite positioning is weak, denied, spoofed, blocked, or operationally unreliable.', 'Operating context'],
  'unknown-terrain': ['Where It Operates', 'Unknown and unmapped terrain', 'Navigation must adapt when the system enters terrain without dependable infrastructure or complete maps.', 'Operating context'],
  'disaster-zones': ['Where It Operates', 'Disaster and search zones', 'Resilient aerial systems can help inspect, search, and map areas where infrastructure is damaged or absent.', 'Operating context'],
  'critical-infrastructure': ['Where It Operates', 'Critical infrastructure', 'Inspection and monitoring missions need robust navigation around complex structures and signal shadows.', 'Operating context'],
  'remote-corridors': ['Where It Operates', 'Remote aerial corridors', 'Remote logistics and aerial corridors require navigation that does not assume reliable signal coverage everywhere.', 'Operating context'],
  'simulation-first': ['How We Advance', 'Simulation-first development', 'Simulation lets us test drift, signal loss, map recovery, and route decisions before field exposure.', 'Build phase'],
  'single-drone-prototype': ['How We Advance', 'Single-drone prototype', 'The first prototype validates the navigation intelligence layer on a single aerial system.', 'Build phase'],
  'scene-map-matching': ['How We Advance', 'Scene understanding and map matching', 'The next step is stronger matching between observed structure, local memory, and map references.', 'Build phase'],
  'collaborative-mapping': ['How We Advance', 'Collaborative multi-drone mapping', 'Multiple drones can build, compare, and refine shared spatial memory over time.', 'Build phase'],
  'field-validation': ['How We Advance', 'Field validation roadmap', 'The roadmap moves from controlled simulation to real-world partner demonstrations and operational testing.', 'Build phase'],
  'aerospace-partners': ['Who We Work With', 'Strategic aerospace partners', 'We are looking for partners who understand aerial systems, navigation constraints, and operational validation.', 'Partner track'],
  'research-collaborators': ['Who We Work With', 'Robotics research collaborators', 'Research partners can help validate localization, mapping, autonomy, and multi-agent spatial memory.', 'Partner track'],
  'resilience-operators': ['Who We Work With', 'Defense and resilience operators', 'Operators working in degraded or contested environments define the real constraints that matter.', 'Partner track'],
  'early-investors': ['Who We Work With', 'Early-stage investors', 'KUBECA is positioned for early strategic conversations around resilient autonomy and GPS-denied navigation.', 'Investor access']
};

var detailData = {
  'flying-understanding': {
    eyebrow: 'Popup Slide 01 — Spatial Intelligence Software',
    title: 'From Flying to Understanding',
    intro: 'Most drones can capture video. KUBECA is building software that helps aerial systems understand the environment they enter.',
    body: 'The system turns camera, sensor, and motion data into useful spatial structure:',
    bullets: ['paths and open areas', 'obstacles and landmarks', 'explored and unknown zones', 'environmental change'],
    why: 'A drone becomes more than a flying camera. It becomes a system that can interpret space, support navigation, and make better mission decisions.'
  },
  'modular-systems': {
    eyebrow: 'Popup Slide 02 — Modular Aerial Hardware',
    title: 'From Single Drones to Modular Systems',
    intro: 'One drone cannot solve every environment. KUBECA’s hardware vision combines different aerial roles into one system.',
    body: 'Long-range UAVs provide distance and coverage. Carrier platforms provide compute, sensors, and mission extension. Scout drones explore smaller, complex, or hard-to-reach areas.',
    bullets: [],
    why: 'The system can scale from wide-area operation to detailed local exploration without depending on one drone type for everything.'
  },
  'shared-map': {
    eyebrow: 'Popup Slide 03 — Networked Drone Teams',
    title: 'From Local Views to One Shared Map',
    intro: 'Each drone sees only part of the environment. KUBECA’s vision is to connect those observations into one evolving map.',
    body: 'The system combines what multiple drones observe:',
    bullets: ['routes and open areas', 'obstacles and unknown zones', 'changes in the environment', 'areas already explored by the team'],
    why: 'Drone teams can coordinate with shared awareness instead of operating as isolated units.'
  },
  'kubeca-system': {
    eyebrow: 'Overview Slide — The KUBECA System',
    title: 'The KUBECA System',
    intro: 'KUBECA is building the spatial intelligence layer for autonomous drone teams.',
    body: 'The vision combines three parts:',
    bullets: ['01 Software that understands space', '02 Modular aerial hardware', '03 Shared maps for coordinated drone teams'],
    why: 'Together, they create aerial systems that can navigate, map, adapt, and coordinate in complex real-world environments.'
  },
  'prototype-platforms': {
    eyebrow: 'Products — Prototype Platforms',
    title: 'Aerial systems built for autonomy',
    intro: 'Modular aerial platforms designed to operate independently or as an integrated team in GPS-denied environments.',
    body: '',
    bullets: [],
    why: ''
  }
};

function showSite() {
  lockScreen.classList.add('hidden');
  siteContent.classList.remove('locked');
  siteContent.setAttribute('aria-hidden', 'false');
  if (signalState) signalState.textContent = 'Unlocked';
}

function showLockScreen() {
  storedPassword = localStorage.getItem('sitePassword');
  lockScreen.classList.remove('hidden');
  siteContent.classList.add('locked');
  siteContent.setAttribute('aria-hidden', 'true');
  passwordInput.value = '';
  passwordMessage.textContent = '';

  if (storedPassword) {
    passwordMode.textContent = 'Private Preview';
    passwordTitle.innerHTML = 'Access<br>Restricted';
    passwordSubmit.innerHTML = 'Unlock System <span>-></span>';
    passwordInput.setAttribute('autocomplete', 'current-password');
  } else {
    passwordMode.textContent = 'Initialize Access';
    passwordTitle.innerHTML = 'Create<br>Access Code';
    passwordSubmit.innerHTML = 'Set Access Code <span>-></span>';
    passwordInput.setAttribute('autocomplete', 'new-password');
  }

  if (signalState) signalState.textContent = 'Locked';
  passwordInput.focus();
}

if (passwordForm) {
  passwordForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var password = passwordInput.value.trim();

    if (password.length < 3) {
      passwordMessage.textContent = 'Use at least 3 characters.';
      return;
    }

    if (!storedPassword) {
      localStorage.setItem('sitePassword', password);
      storedPassword = password;
      showSite();
      return;
    }

    if (password === storedPassword) {
      showSite();
    } else {
      passwordMessage.textContent = 'Wrong password. Try again.';
      passwordInput.select();
    }
  });
}

function openMenu() {
  if (!megaMenu) return;
  megaMenu.classList.add('open');
  megaMenu.setAttribute('aria-hidden', 'false');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
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

function openDeckPanel(deckId) {
  var card = deckData[deckId] || deckData['founder-thesis'];

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
  detailEyebrow.textContent = card[0];
  detailTitle.textContent = card[1];
  detailIntro.textContent = card[2];
  detailGrid.innerHTML = '<div class="deck-card-meta"><span>' + card[0] + '</span><strong>' + card[3] + '</strong></div>';

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
  }
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
  if (detailPanel) {
    detailPanel.classList.remove('deck-detail');
    detailPanel.classList.toggle('product-detail', detailId === 'prototype-platforms');
  }
  detailEyebrow.textContent = detail.eyebrow;
  detailTitle.textContent = detail.title;
  detailIntro.textContent = detail.intro;
  detailGrid.innerHTML = '';

  if (detailId === 'prototype-platforms') {
    detailGrid.innerHTML = '<div class="product-slide-copy"><div class="product-slide-table"><div class="product-slide-row product-slide-head"><span>Platform</span><b>KUBECA LRA<small>Long-range aircraft</small></b><b>KUBECA SCD<small>Scout drone</small></b></div><div class="product-slide-row"><span>Overview</span><p>Long-endurance ISR platform for mapping, monitoring, and command.</p><p>Agile scout drone for close-range reconnaissance and perimeter scan.</p></div><div class="product-slide-row"><span>Endurance</span><p>12+ hours</p><p>45+ minutes</p></div><div class="product-slide-row"><span>Range</span><p>200+ km</p><p>25+ km</p></div><div class="product-slide-row"><span>Max payload</span><p>5 kg</p><p>1.2 kg</p></div><div class="product-slide-row"><span>Navigation</span><p>GPS-denied / INS / Visual</p><p>GPS-denied / INS / Visual</p></div><div class="product-slide-row"><span>Deployment</span><p>Runway / catapult</p><p>Hand launch</p></div><div class="product-slide-row"><span>Role</span><p>Command and control, wide-area ISR</p><p>Tactical recon, target localization</p></div></div></div><div class="product-slide-visual"><div class="product-wing"><i class="wing"></i><i class="body"></i><i class="tail"></i></div><div class="product-drone"><i></i><span></span><span></span><span></span><span></span></div></div><div class="product-slide-features"><span><b>GPS-denied operations</b><em>Built to navigate and operate in contested environments.</em></span><span><b>Team-centric autonomy</b><em>Multiple systems. One shared map. Coordinated as a single team.</em></span><span><b>Modular and adaptable</b><em>Open architecture for integration and mission flexibility.</em></span></div>';
    if (panelBackdrop) panelBackdrop.classList.add('open');
    if (detailPanel) {
      detailPanel.classList.add('open');
      detailPanel.setAttribute('aria-hidden', 'false');
    }
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
}

function closeDetailPanel() {
  if (panelBackdrop) panelBackdrop.classList.remove('open');
  if (!detailPanel) return;
  detailPanel.classList.remove('open');
  detailPanel.classList.remove('deck-detail');
  detailPanel.classList.remove('product-detail');
  detailPanel.setAttribute('aria-hidden', 'true');
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

if (toggle) toggle.addEventListener('click', toggleMenu);
if (megaMenuOpen) megaMenuOpen.addEventListener('click', toggleMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (deckPanelClose) deckPanelClose.addEventListener('click', closeDeckPanel);
if (detailClose) detailClose.addEventListener('click', closeDetailPanel);
if (panelBackdrop) panelBackdrop.addEventListener('click', closeAllPanels);
if (storyDetailOpen) storyDetailOpen.addEventListener('click', function () {
  openDetailPanel(activeStoryDetail);
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
progressLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    openDeckPanel(link.getAttribute('data-deck'));
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeProgressBoard();
    closeAllPanels();
  }
});

deckLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    openDeckPanel(link.getAttribute('data-deck'));
  });
});

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

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting || !storyTitle || !storyCopy) return;
    var nextStoryDetail = entry.target.getAttribute('data-detail') || 'flying-understanding';
    var nextStoryTitle = entry.target.getAttribute('data-title');
    var nextStoryCopy = entry.target.getAttribute('data-copy');

    if (nextStoryDetail === activeStoryDetail) return;
    activeStoryDetail = nextStoryDetail;

    if (!storyText) {
      storyTitle.textContent = nextStoryTitle;
      storyCopy.textContent = nextStoryCopy;
      return;
    }

    window.clearTimeout(storyTextTimer);
    storyText.classList.add('is-changing');

    storyTextTimer = window.setTimeout(function () {
      storyTitle.textContent = nextStoryTitle;
      storyCopy.textContent = nextStoryCopy;
      storyText.classList.remove('is-changing');
    }, 260);
  });
}, { threshold: 0.58 });

scenes.forEach(function (scene) { observer.observe(scene); });

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

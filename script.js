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
var deckLinks = document.querySelectorAll('.deck-link');
var scenes = document.querySelectorAll('.scene');
var storyTitle = document.getElementById('storyTitle');
var storyCopy = document.getElementById('storyCopy');
var storedPassword = localStorage.getItem('sitePassword');
var activeStoryDetail = 'software';

var deckData = {
  'founder-thesis': ['Who We Are', 'The founder thesis', 'KUBECA begins with a simple premise: autonomous systems need a navigation intelligence layer that survives when GPS disappears.', 'Private preview / origin'],
  'company-vision': ['Who We Are', 'The company vision', 'Build the spatial intelligence layer that lets aerial systems understand where they are, what changed, and how to recover.', 'Private preview / vision'],
  'research-direction': ['Who We Are', 'The research direction', 'Our research connects visual-inertial localization, scene graphs, map matching, and uncertainty-aware autonomy.', 'Research track'],
  'gps-disappears': ['Why We Exist', 'When GPS disappears', 'Signal denial, urban occlusion, spoofing, and degraded environments expose a core autonomy weakness: dependence on external positioning.', 'Problem frame'],
  'autonomy-bottleneck': ['Why We Exist', 'The autonomy bottleneck', 'Autonomous systems can perceive more than ever, but they still need resilient position, memory, and route recovery when infrastructure fails.', 'Problem frame'],
  'navigation-change': ['Why We Exist', 'Why navigation must change', 'Future aerial autonomy needs navigation that is local, adaptive, memory-based, and robust to uncertainty.', 'Thesis'],
  'software-layer': ['What We Build', 'The software intelligence layer', 'The first KUBECA layer turns perception, inertial motion, maps, and confidence estimates into navigation decisions.', 'Core system'],
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
  software: {
    eyebrow: 'System Detail',
    title: 'Software-first navigation intelligence',
    intro: 'This is the main KUBECA layer: a navigation system that turns perception, inertial motion, maps, and uncertainty into usable position and route decisions.',
    items: [
      ['01', 'Visual navigation', 'Cameras read terrain, structures, movement, and landmarks as positioning signals when external location becomes unreliable.'],
      ['02', 'Visual-inertial fusion', 'Motion data and visual observations are combined to reduce drift and keep state estimation alive between confident matches.'],
      ['03', 'Map-assisted localization', 'Known maps, partial maps, and remembered scenes help recover position after signal loss or accumulated uncertainty.'],
      ['04', 'Adaptive route recovery', 'The autonomy layer can adjust routes when confidence drops, scenes change, or expected landmarks disappear.']
    ]
  },
  environment: {
    eyebrow: 'Operating Detail',
    title: 'Built for GPS-denied environments',
    intro: 'The point is not just flying without a clean signal. The point is keeping autonomy useful when the operating environment becomes uncertain.',
    items: [
      ['01', 'Signal denial', 'The system is framed for places where GPS is weak, blocked, spoofed, degraded, or operationally untrusted.'],
      ['02', 'Contested spaces', 'Autonomous aerial systems need local navigation logic when infrastructure cannot be assumed.'],
      ['03', 'Disaster response', 'Damaged infrastructure, smoke, debris, and changing terrain make resilient localization more valuable than perfect maps.'],
      ['04', 'Industrial inspection', 'Complex structures create signal shadows, repeated geometry, and navigation ambiguity around critical assets.']
    ]
  },
  roadmap: {
    eyebrow: 'Roadmap Detail',
    title: 'Toward collaborative aerial autonomy',
    intro: 'The roadmap moves from a single navigation intelligence layer toward teams of aerial systems that share spatial memory and reduce uncertainty together.',
    items: [
      ['01', 'Simulation-first build', 'Controlled environments test drift, signal loss, map recovery, and route decisions before field exposure.'],
      ['02', 'Single-drone prototype', 'The first implementation validates localization and recovery on one aerial system.'],
      ['03', 'Scene memory', 'Observed landmarks, routes, and terrain become a spatial memory that can support future missions.'],
      ['04', 'Multi-drone network', 'Future drone teams share partial maps, compare confidence, and coordinate exploration in uncertain areas.']
    ]
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

  closeDetailPanel();
  panelEyebrow.textContent = card[0];
  panelTitle.textContent = card[1];
  panelBody.textContent = card[2];
  panelNote.textContent = card[3];

  if (window.matchMedia('(min-width: 761px)').matches) {
    openMenu();
    if (panelBackdrop) panelBackdrop.classList.add('open');
    deckPanel.classList.add('open');
    deckPanel.setAttribute('aria-hidden', 'false');
  } else {
    if (megaMenu) {
      megaMenu.classList.remove('open');
      megaMenu.setAttribute('aria-hidden', 'true');
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (panelBackdrop) panelBackdrop.classList.add('open');
    deckPanel.classList.add('open');
    deckPanel.setAttribute('aria-hidden', 'false');
  }
}

function closeDeckPanel() {
  if (panelBackdrop) panelBackdrop.classList.remove('open');
  if (!deckPanel) return;
  deckPanel.classList.remove('open');
  deckPanel.setAttribute('aria-hidden', 'true');
}

function openDetailPanel(detailId) {
  var detail = detailData[detailId] || detailData.software;

  closeDeckPanel();
  detailEyebrow.textContent = detail.eyebrow;
  detailTitle.textContent = detail.title;
  detailIntro.textContent = detail.intro;
  detailGrid.innerHTML = '';

  detail.items.forEach(function (item) {
    var node = document.createElement('article');
    node.className = 'detail-node';
    node.innerHTML = '<span>' + item[0] + '</span><h3>' + item[1] + '</h3><p>' + item[2] + '</p>';
    detailGrid.appendChild(node);
  });

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
  detailPanel.setAttribute('aria-hidden', 'true');
}

function closeAllPanels() {
  closeDeckPanel();
  closeDetailPanel();
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

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeAllPanels();
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
    activeStoryDetail = entry.target.getAttribute('data-detail') || 'software';
    storyTitle.textContent = entry.target.getAttribute('data-title');
    storyCopy.textContent = entry.target.getAttribute('data-copy');
  });
}, { threshold: 0.58 });

scenes.forEach(function (scene) { observer.observe(scene); });

showLockScreen();

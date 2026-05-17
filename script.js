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
var megaGrid = megaMenu ? megaMenu.querySelector('.mega-grid') : null;
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
var storySection = document.getElementById('story');
var deckLinks = document.querySelectorAll('.deck-link');
var scenes = document.querySelectorAll('.scene');
var quoteContent = document.querySelector('.quote-content');
var storyText = document.getElementById('storyText');
var storyTitle = document.getElementById('storyTitle');
var storyCopy = document.getElementById('storyCopy');
var storyDetailInline = document.getElementById('storyDetailInline');
var storyDetailEyebrow = document.getElementById('storyDetailEyebrow');
var storyDetailTitle = document.getElementById('storyDetailTitle');
var storyDetailIntro = document.getElementById('storyDetailIntro');
var storyDetailBody = document.getElementById('storyDetailBody');
var storyDetailBullets = document.getElementById('storyDetailBullets');
var storyDetailWhy = document.getElementById('storyDetailWhy');
var storedPassword = localStorage.getItem('sitePassword');
var activeStoryDetail = 'flying-understanding';
var activeDeckId = '';
var storyTextTimer;
var progressScrollTimer;
var storyScrollTimer;
var storyUpdateFrame;
var panelLockedScrollY = 0;

var deckData = {
  'pitch-timing': ['Why We Exist', 'The Timing', 'Autonomous aircraft, onboard AI, edge compute, and sensor systems are converging now, but the missing layer is still shared spatial intelligence.', 'Main pitch / timing'],
  'pitch-opportunity': ['Why We Exist', 'The Opportunity', 'The next leap in aerial autonomy is the intelligence layer that lets drone teams map, localize, coordinate, and recover together in difficult environments.', 'Main pitch / opportunity'],
  'pitch-system': ['What We Build', 'The KUBECA System', 'KUBECA combines spatial intelligence software, modular aerial platforms, and shared maps for coordinated drone teams.', 'Main pitch / system'],
  'pitch-progress': ['How We Advance', 'Current Progress', 'Current focus: system architecture, simulation environment, first prototype path, and strategic partner conversations.', 'Main pitch / progress'],
  'pitch-funding-ask': ['How We Advance', 'Funding Milestones', 'The next raise funds integrated prototype development, validation, early team, and strategic demonstrations.', 'Main pitch / funding'],
  'founder-thesis': ['Who We Are', 'Founder Thesis', 'We believe the next generation of autonomous aerial systems will not be defined by hardware alone, but by mission intelligence: the ability to navigate, map, coordinate, and act in complex environments with minimal human burden.', 'Who we are / founder thesis'],
  'company-vision': ['Who We Are', 'Company Vision', 'KUBECA is building an autonomous aerial intelligence system for open and enclosed environments - combining multi-drone coordination, spatial understanding, mission planning, and resilient operation where conventional drone systems reach their limits.', 'Who we are / company vision'],
  'mission-core': ['Who We Are', 'Mission', 'Our mission is to give operators real-time situational awareness and autonomous execution capability in environments that are too dangerous, too complex, or too fast-moving for traditional drone operations.', 'Who we are / mission'],
  'built-from-field-experience': ['Who We Are', 'Built From Field Experience', 'KUBECA is built by a team with practical experience in drone development, field testing, and operational feedback loops. Our work is grounded in real-world constraints: signal loss, complex terrain, pilot overload, cost pressure, and the need for systems that can function under stress. The team has worked on drone platforms for third-party companies, received direct feedback from frontline operators, and contributed expertise in professional military contexts. This gives KUBECA a pragmatic foundation: we do not build theoretical autonomy - we build systems designed for operational reality.', 'Who we are / field experience'],
  'research-direction': ['Who We Are', 'The research direction', 'Our research connects visual-inertial localization, scene graphs, map matching, and uncertainty-aware autonomy.', 'Research track'],
  'gps-disappears': ['Why We Exist', 'When GPS disappears', 'Signal denial, urban occlusion, spoofing, and degraded environments expose a core autonomy weakness: dependence on external positioning.', 'Problem frame'],
  'autonomy-bottleneck': ['Why We Exist', 'The autonomy bottleneck', 'Autonomous systems can perceive more than ever, but they still need resilient position, memory, and route recovery when infrastructure fails.', 'Problem frame'],
  'dangerous-environments': ['Why This Matters', 'Dangerous Environments', 'Operations in contested, degraded, and hard-to-access areas require systems that continue working when infrastructure is unreliable.', 'Operational urgency'],
  'human-exposure': ['Why This Matters', 'Human Exposure', 'Autonomous aerial systems reduce direct human exposure during high-risk inspection, response, and reconnaissance missions.', 'Safety imperative'],
  'navigation-change': ['Why We Exist', 'Why navigation must change', 'Future aerial autonomy needs navigation that is local, adaptive, memory-based, and robust to uncertainty.', 'Thesis'],
  'defense-security-demand': ['Why Now', 'Defense & Security Demand', 'Global demand for resilient, autonomous ISR and operational support is accelerating across defense and security stakeholders.', 'Market momentum'],
  'autonomous-systems-shift': ['Why Now', 'Autonomous Systems Shift', 'Compute, onboard AI, and sensor fusion are now mature enough to transition from isolated drones to coordinated autonomous systems.', 'Technology shift'],
  'software-layer': ['What We Build', 'The software intelligence layer', 'The first KUBECA layer turns perception, inertial motion, maps, and confidence estimates into navigation decisions.', 'Core system'],
  'autonomous-multi-drone-ops': ['What We Build', 'Autonomous Multi-Drone Operations', 'KUBECA connects multiple drones into one coordinated operating system with shared awareness, adaptive tasking, and resilient navigation.', 'System capability'],
  'mission-intelligence-layer': ['What We Build', 'Mission Intelligence Layer', 'A mission software layer that turns live sensor input, map context, and objectives into explainable decisions and controllable actions.', 'Core platform'],
  'prototype-platforms': ['What We Build', 'Prototype aerial platforms', 'KUBECA’s prototype direction pairs KUBECA LRA, a long-range aircraft for 12+ hour wide-area ISR and command, with KUBECA SCD, a 45+ minute scout drone for close-range reconnaissance, perimeter scan, and target localization. Both are designed around GPS-denied / INS / visual navigation.', 'Pitch deck / prototype'],
  'hardware-architecture': ['What We Build', 'The aerial hardware architecture', 'Hardware planning stays close to the software: sensing, onboard compute, deployable scouts, and field-ready autonomy constraints.', 'Roadmap'],
  'scout-uav-roadmap': ['What We Build', 'The scout UAV roadmap', 'Scout UAVs are the first practical path for testing localization, route recovery, and scene-memory workflows.', 'Roadmap'],
  'multi-drone-network': ['What We Build', 'The multi-drone spatial network', 'Future drone teams can share partial maps, reduce uncertainty, and build collaborative spatial awareness.', 'Future layer'],
  'perception-positioning': ['How It Works', 'Perception becomes positioning', 'Visual observations become navigation signals when matched against motion, landmarks, terrain, and prior structure.', 'Mechanism'],
  'spatial-understanding': ['How The System Operates', 'Spatial Understanding', 'The platform interprets terrain, landmarks, traversable paths, and environmental change to build mission-ready situational context.', 'Operational layer'],
  'state-estimation': ['How It Works', 'Sensors become state estimation', 'Cameras, IMUs, altitude, and local context combine into a continuously updated estimate of state and confidence.', 'Mechanism'],
  'scene-graphs': ['How It Works', 'Scene graphs become spatial memory', 'The system can organize observed places, landmarks, and transitions into memory that supports future recovery.', 'Mechanism'],
  'map-recovery': ['How It Works', 'Maps support position recovery', 'Map-assisted localization helps the system recover orientation and position after drift or signal loss.', 'Mechanism'],
  'uncertainty': ['How It Works', 'Uncertainty guides decisions', 'Instead of hiding uncertainty, KUBECA treats it as a decision signal for route choice, recovery, and collaboration.', 'Mechanism'],
  'ai-mission-planner': ['How The System Operates', 'AI Mission Planner', 'Mission planning adapts in real time using environment understanding, drone state, and objective priority to recommend next actions.', 'Operational layer'],
  'high-speed-navigation': ['What It Can Do', 'High-Speed Navigation', 'Maintain stable navigation and decision quality during fast-moving missions across dynamic and partially known environments.', 'Capability'],
  'open-closed-area-mapping': ['What It Can Do', 'Open & Closed-Area Mapping', 'Build and update spatial maps across both open terrain and constrained spaces to support routing, search, and mission handoff.', 'Capability'],
  'threat-detection': ['What It Can Do', 'Threat Detection', 'Identify and flag environmental anomalies, potential hazards, and mission risks to support faster, safer operational decisions.', 'Capability'],
  'carrier-drones': ['Swarm & Carrier Layer', 'Carrier Drones', 'Carrier drones extend range, provide compute and comms support, and deploy specialist units for mission depth.', 'Swarm layer'],
  'swarm-formation': ['Swarm & Carrier Layer', 'Swarm Formation', 'Dynamic multi-drone formations coordinate by role, spacing, and objective to improve coverage and resilience.', 'Swarm layer'],
  'mission-specific-payloads': ['Swarm & Carrier Layer', 'Mission-Specific Payloads', 'Modular payload support allows sensor and mission configuration for defense, infrastructure, and response workflows.', 'Swarm layer'],
  'voice-command': ['How Users Control It', 'Voice Command', 'Operators can issue mission commands through natural voice prompts for faster interaction in high-pressure environments.', 'Control layer'],
  'natural-language-mission-planning': ['How Users Control It', 'Natural Language Mission Planning', 'Users can describe mission intent in natural language and receive structured, editable mission plans.', 'Control layer'],
  'human-in-the-loop-control': ['How Users Control It', 'Human-in-the-Loop Control', 'Supervisory controls keep operators in command with transparent autonomy, override capability, and decision traceability.', 'Control layer'],
  'degraded-signals': ['Where It Operates', 'Degraded signal environments', 'Designed for places where satellite positioning is weak, denied, spoofed, blocked, or operationally unreliable.', 'Operating context'],
  'defense-security': ['Where It Operates', 'Defense & Security', 'Built for defense and security operations that require resilient autonomy in contested and high-risk conditions.', 'Operating context'],
  'unknown-terrain': ['Where It Operates', 'Unknown and unmapped terrain', 'Navigation must adapt when the system enters terrain without dependable infrastructure or complete maps.', 'Operating context'],
  'disaster-zones': ['Where It Operates', 'Disaster and search zones', 'Resilient aerial systems can help inspect, search, and map areas where infrastructure is damaged or absent.', 'Operating context'],
  'search-rescue': ['Where It Operates', 'Search & Rescue', 'Support rapid area scan, route assessment, and survivor search workflows in time-critical rescue missions.', 'Operating context'],
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

var deckOrder = Object.keys(deckData);
var megaRows = document.querySelectorAll('.mega-row');

var detailData = {
  'flying-understanding': {
    eyebrow: 'Main Point 01 — Spatial Intelligence Software',
    title: 'From Flying to Understanding',
    intro: 'Most drones can capture video. KUBECA is building software that helps aerial systems understand the environment they enter.',
    body: 'The system turns camera, sensor, and motion data into useful spatial structure:',
    bullets: ['paths and open areas', 'obstacles and landmarks', 'explored and unknown zones', 'environmental change'],
    why: 'A drone becomes more than a flying camera. It becomes a system that can interpret space, support navigation, and make better mission decisions.'
  },
  'modular-systems': {
    eyebrow: 'Main Point 02 — Modular Aerial Hardware',
    title: 'From Single Drones to Modular Systems',
    intro: 'One drone cannot solve every environment. KUBECA’s hardware vision combines different aerial roles into one system.',
    body: 'Long-range UAVs provide distance and coverage. Carrier platforms provide compute, sensors, and mission extension. Scout drones explore smaller, complex, or hard-to-reach areas.',
    bullets: [],
    why: 'The system can scale from wide-area operation to detailed local exploration without depending on one drone type for everything.'
  },
  'shared-map': {
    eyebrow: 'Main Point 03 — Networked Drone Teams',
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
    passwordSubmit.innerHTML = 'Unlock Preview <span>-></span>';
    passwordInput.setAttribute('autocomplete', 'current-password');
  } else {
    passwordMode.textContent = 'Initialize Access';
    passwordTitle.innerHTML = 'Create<br>Access Code';
    passwordSubmit.innerHTML = 'Set Access Code <span>-></span>';
    passwordInput.setAttribute('autocomplete', 'new-password');
  }

  if (signalState) signalState.textContent = 'Locked';
  window.requestAnimationFrame(function () {
    try {
      passwordInput.focus({ preventScroll: true });
    } catch (error) {
      passwordInput.focus();
    }
    if (lockScreen) lockScreen.scrollTop = 0;
  });
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
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (!megaRows || !megaRows.length) return;
  megaRows.forEach(function (row) {
    var hasActive = !!row.querySelector('.deck-link.is-active');
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
    });

    function toggleRowAndOpen() {
      var shouldOpen = row.classList.contains('is-collapsed');
      megaRows.forEach(function (otherRow) {
        if (otherRow !== row) {
          otherRow.classList.add('is-collapsed');
          var otherHeading = otherRow.querySelector('h4');
          if (otherHeading) otherHeading.setAttribute('aria-expanded', 'false');
        }
      });
      row.classList.toggle('is-collapsed', !shouldOpen);
      heading.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

      if (shouldOpen && subtopics.length) {
        var deckId = subtopics[0].getAttribute('data-deck');
        if (deckId) openDeckPanel(deckId);
      }
    }

    heading.addEventListener('click', function () {
      toggleRowAndOpen();
    });

    heading.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggleRowAndOpen();
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

function renderDeckVisualMarkup(deckId, index, groupHeading) {
  if (groupHeading !== 'WHO WE ARE') {
    return '<div class="deck-visual-frame">' +
      '<i></i><i></i><i></i>' +
    '</div>';
  }

  if (deckId === 'built-from-field-experience') {
    return '<div class="deck-visual-frame who-visual-grid">' +
      '<figure class="who-photo who-photo-a"><video class="who-media" autoplay muted loop playsinline><source src="assets/videos/founder.mp4" type="video/mp4"></video></figure>' +
      '<figure class="who-photo who-photo-b"><video class="who-media" autoplay muted loop playsinline><source src="assets/videos/hero.mp4" type="video/mp4"></video></figure>' +
      '<figure class="who-photo who-photo-c"><video class="who-media" autoplay muted loop playsinline><source src="assets/videos/access.mp4" type="video/mp4"></video></figure>' +
      '<figure class="who-photo who-photo-d"><video class="who-media" autoplay muted loop playsinline><source src="assets/videos/founder.mp4" type="video/mp4"></video></figure>' +
    '</div>';
  }

  if (deckId === 'mission-core') {
    return '<div class="deck-visual-frame who-visual-mission">' +
      '<div class="who-mission-title">See. Understand. Coordinate. Act.</div>' +
      '<div class="who-mission-grid">' +
        '<span><b>SEE</b><em>Live situational awareness</em></span>' +
        '<span><b>UNDERSTAND</b><em>Spatial mission context</em></span>' +
        '<span><b>COORDINATE</b><em>Team-level mapping</em></span>' +
        '<span><b>ACT</b><em>Operator-guided execution</em></span>' +
      '</div>' +
    '</div>';
  }

  return '<div class="deck-visual-frame who-visual-hero">' +
    '<video class="who-media who-hero-video" autoplay muted loop playsinline><source src="assets/videos/hero.mp4" type="video/mp4"></video>' +
    '<div class="who-hero-meta"><span>Autonomous Layer</span><em>Mission intelligence / team coordination</em></div>' +
  '</div>';
}

function renderDeckChapter(deckId) {
  var group = getDeckGroup(deckId);
  if (group.heading === 'WHO WE ARE') {
    return '<section class="who-page-layout">' +
      '<header class="who-header">' +
        '<div class="who-brand"><div class="who-mark"></div><span>KUBECA</span></div>' +
        '<div class="who-section-label">01 / WHO WE ARE<span></span></div>' +
      '</header>' +
      '<section class="who-hero">' +
        '<div class="who-hero-text">' +
          '<h2>AUTONOMOUS<br>AERIAL INTELLIGENCE<br>FOR COMPLEX<br>ENVIRONMENTS</h2>' +
          '<div class="who-blue-line"></div>' +
          '<p>KUBECA builds intelligent multi-drone systems for environments where remote control, GPS dependency, and human-led reconnaissance reach their limits.</p>' +
        '</div>' +
        '<div class="who-hero-image"><video autoplay muted loop playsinline><source src="assets/videos/hero.mp4" type="video/mp4"></video></div>' +
      '</section>' +
      '<section class="who-two-column">' +
        '<article class="who-text-block">' +
          '<p class="who-eyebrow">FOUNDER THESIS</p><div class="who-small-line"></div>' +
          '<h3>THE NEXT ADVANTAGE IS NOT THE DRONE.<br>IT IS THE INTELLIGENCE INSIDE THE SYSTEM.</h3>' +
          '<div class="who-blue-line who-blue-line-small"></div>' +
          '<p>As aerial platforms become cheaper and more numerous, the decisive layer shifts from hardware to software: autonomy, spatial understanding, resilient navigation, and coordinated decision-making.</p>' +
        '</article>' +
        '<article class="who-text-block who-text-block-right">' +
          '<p class="who-eyebrow">COMPANY VISION</p><div class="who-small-line"></div>' +
          '<h3>THE AERIAL INTELLIGENCE LAYER<br>FOR AUTONOMOUS OPERATIONS.</h3>' +
          '<p>KUBECA aims to turn drones from remote-controlled tools into coordinated mission assets - able to map, relay, understand, and operate as a distributed system across open and enclosed terrain.</p>' +
          '<p class="who-eyebrow who-eyebrow-diagram">SYSTEM LOGIC</p>' +
          '<div class="who-system-diagram">' +
            '<div class="who-diagram-row">OPERATOR</div><div class="who-arrow">↓</div>' +
            '<div class="who-diagram-row who-diagram-active">MISSION INTELLIGENCE LAYER</div><div class="who-arrow">↓</div>' +
            '<div class="who-diagram-row">SWARM / CARRIER / MICRO-DRONES</div><div class="who-arrow">↓</div>' +
            '<div class="who-diagram-row">RESILIENT NAVIGATION / SHARED MAP / INDOOR RECON / MISSION INSIGHT</div>' +
          '</div>' +
        '</article>' +
      '</section>' +
      '<section class="who-mission">' +
        '<div><p class="who-eyebrow">MISSION</p><div class="who-small-line"></div></div>' +
        '<div class="who-mission-content"><h3>REDUCE HUMAN EXPOSURE. INCREASE SITUATIONAL CONTROL.</h3>' +
          '<div class="who-mission-grid">' +
            '<div class="who-mission-item"><div class="who-icon"><img src="assets/icons/kubeca/kubeca_icons/svg/kubeca-see.svg" alt="" aria-hidden="true"></div><h4>SEE</h4><p>Real-time intelligence from complex terrain.</p></div>' +
            '<div class="who-mission-item"><div class="who-icon"><img src="assets/icons/kubeca/kubeca_icons/svg/kubeca-map.svg" alt="" aria-hidden="true"></div><h4>MAP</h4><p>Shared spatial awareness across the swarm.</p></div>' +
            '<div class="who-mission-item"><div class="who-icon"><img src="assets/icons/kubeca/kubeca_icons/svg/kubeca-coordinate.svg" alt="" aria-hidden="true"></div><h4>RELAY</h4><p>Communication through distributed aerial nodes.</p></div>' +
            '<div class="who-mission-item"><div class="who-icon"><img src="assets/icons/kubeca/kubeca_icons/svg/kubeca-act.svg" alt="" aria-hidden="true"></div><h4>DECIDE</h4><p>Operator-guided mission control.</p></div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="who-proof">' +
        '<p class="who-eyebrow">GROUND TRUTH FROM THE FIELD</p><div class="who-small-line"></div>' +
        '<h3 class="who-proof-title">WE HAVE ALREADY BUILT IN THIS REALITY.</h3>' +
        '<p class="who-proof-copy">KUBECA is shaped by practical drone development, field testing, operator feedback, and exposure to modern defense requirements.</p>' +
        '<div class="who-proof-grid">' +
          '<article><video autoplay muted loop playsinline><source src="assets/videos/founder.mp4" type="video/mp4"></video><div><h4>PLATFORM DEVELOPMENT</h4><p>Drone systems developed and tested from concept to flight.</p></div></article>' +
          '<article><video autoplay muted loop playsinline><source src="assets/videos/access.mp4" type="video/mp4"></video><div><h4>FIELD CONDITIONS</h4><p>Built around signal loss, terrain complexity, pilot overload, cost pressure, and mission stress.</p></div></article>' +
          '<article><video autoplay muted loop playsinline><source src="assets/videos/hero.mp4" type="video/mp4"></video><div><h4>OPERATOR FEEDBACK</h4><p>Continuous exchange with users facing real operational constraints.</p></div></article>' +
          '<article><video autoplay muted loop playsinline><source src="assets/videos/founder.mp4" type="video/mp4"></video><div><h4>DEFENSE CONTEXT</h4><p>Exposure to professional military environments and modern drone-warfare requirements.</p></div></article>' +
        '</div>' +
      '</section>' +
      '<footer class="who-footer"><em>KUBECA | AUTONOMOUS AERIAL INTELLIGENCE</em></footer>' +
    '</section>';
  }

  if (group.heading === 'WHY THIS MATTERS') {
    return '<section class="why-page-layout">' +
      '<header class="why-header">' +
        '<div class="why-brand"><div class="why-mark"></div><span>KUBECA</span></div>' +
        '<div class="why-section-label">02 / WHY THIS MATTERS<span></span></div>' +
      '</header>' +
      '<section class="why-hero">' +
        '<h2>THE FRAGILE<br>CONTROL LOOP</h2>' +
        '<div class="why-blue-line"></div>' +
        '<p>Current drone systems still depend on one vulnerable chain: <strong>stable signals, manual piloting, and human interpretation.</strong></p>' +
        '<p>In contested, enclosed, or fast-changing environments, this chain creates three mission-critical failure points.</p>' +
      '</section>' +
      '<section class="why-flow">' +
        '<div class="why-flow-art"><img src="assets/icons/kubeca/kubeca_icons/svg/kubeca-control-loop.svg" alt="Fragile control loop diagram"></div>' +
      '</section>' +
      '<section class="why-columns">' +
        '<article><small>01</small><div class="why-issue-head"><h4>AUTONOMY<br>BOTTLENECK</h4><img class="why-issue-icon" src="assets/icons/kubeca/kubeca_icons/svg/kubeca-menu-operator.svg" alt="" aria-hidden="true"></div><p>Too much of the mission still depends on direct human control, creating slow decision loops and limited scalability.</p></article>' +
        '<article><small>02</small><div class="why-issue-head"><h4>SIGNAL & CONTROL<br>FRAGILITY</h4><img class="why-issue-icon" src="assets/icons/kubeca/kubeca_icons/svg/kubeca-menu-rf-link.svg" alt="" aria-hidden="true"></div><p>Radio, GPS, terrain, walls, and interference can break the link. When the connection fails, missions lose precision, context, or control.</p></article>' +
        '<article><small>03</small><div class="why-issue-head"><h4>HUMAN<br>EXPOSURE</h4><img class="why-issue-icon" src="assets/icons/kubeca/kubeca_icons/svg/kubeca-menu-delayed-decisions.svg" alt="" aria-hidden="true"></div><p>Operators carry the burden of piloting, watching, remembering, reporting, and deciding—under pressure and often too close to risk.</p></article>' +
      '</section>' +
      '<section class="why-bottom">' +
        '<small>BOTTOM LINE</small>' +
        '<p>THE PROBLEM IS NOT ONLY BETTER DRONES.<br><span>THE PROBLEM IS MISSION INTELLIGENCE<br>UNDER REAL-WORLD CONSTRAINTS.</span></p>' +
      '</section>' +
      '<footer class="why-footer"><em>KUBECA | AUTONOMOUS AERIAL INTELLIGENCE</em></footer>' +
    '</section>';
  }

  var sectionMarkup = group.ids.map(function (id, index) {
    var card = deckData[id];
    if (!card) return '';
    return '<section class="deck-chapter-section' + (id === deckId ? ' is-active' : '') + '" data-deck-section="' + id + '">' +
      '<div class="deck-chapter-inner deck-layout-' + (index % 2 === 0 ? 'split' : 'offset') + '">' +
        '<div class="deck-chapter-copy">' +
          '<div class="deck-chapter-meta"><span>' + String(index + 1).padStart(2, '0') + '</span><em>' + group.heading + '</em></div>' +
          '<h3>' + card[1] + '</h3>' +
          '<p>' + card[2] + '</p>' +
          '<small>' + card[3] + '</small>' +
        '</div>' +
        '<div class="deck-chapter-visual deck-visual-' + ((index % 3) + 1) + '">' +
          renderDeckVisualMarkup(id, index, group.heading) +
        '</div>' +
      '</div>' +
    '</section>';
  }).join('');

  return '<div class="deck-chapter-shell">' +
    '<div class="deck-chapter-stack">' + sectionMarkup + '</div>' +
  '</div>';
}

function goToAdjacentDeck(direction) {
  var nextDeckId = getAdjacentDeckId(direction);
  if (nextDeckId) openDeckPanel(nextDeckId);
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
  if (group.heading === 'WHO WE ARE' || group.heading === 'WHY THIS MATTERS') {
    detailTitle.textContent = '';
    detailIntro.textContent = '';
  } else {
    detailTitle.textContent = group.heading;
    detailIntro.textContent = card[2];
  }
  detailGrid.innerHTML = renderDeckChapter(activeDeckId);

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
    var selectedSection = detailGrid ? detailGrid.querySelector('[data-deck-section="' + activeDeckId + '"]') : null;
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

function renderStoryInlineDetail() {
  if (!storyDetailInline || !storyDetailEyebrow || !storyDetailTitle || !storyDetailIntro || !storyDetailBody || !storyDetailBullets || !storyDetailWhy) return;
  var detail = detailData[activeStoryDetail] || detailData['flying-understanding'];
  storyDetailEyebrow.textContent = detail.eyebrow;
  storyDetailTitle.textContent = detail.title;
  storyDetailIntro.textContent = detail.intro;
  storyDetailBody.textContent = detail.body || '';
  storyDetailBody.hidden = !detail.body;
  storyDetailBullets.innerHTML = '';
  detail.bullets.forEach(function (bullet) {
    var item = document.createElement('li');
    item.textContent = bullet;
    storyDetailBullets.appendChild(item);
  });
  storyDetailBullets.hidden = detail.bullets.length === 0;
  storyDetailWhy.textContent = detail.why || '';
  storyDetailWhy.hidden = !detail.why;
}

function closeStoryInlineDetail() {
  if (!storyDetailInline || !storyDetailInline.classList.contains('open')) return;
  storyDetailInline.classList.remove('open');
  storyDetailInline.setAttribute('aria-hidden', 'true');
  if (storyDetailOpen) {
    storyDetailOpen.setAttribute('aria-expanded', 'false');
    storyDetailOpen.textContent = 'Open detail';
  }
}

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

function setActiveStoryScene(scene, force) {
  if (!scene || !storyTitle || !storyCopy) return;
  var nextStoryDetail = scene.getAttribute('data-detail') || 'flying-understanding';
  if (!force && nextStoryDetail === activeStoryDetail) return;

  var sceneList = Array.prototype.slice.call(scenes);
  var sceneIndex = sceneList.indexOf(scene);
  var nextStoryTitle = String(sceneIndex + 1).padStart(2, '0') + ' - ' + scene.getAttribute('data-title');
  var nextStoryCopy = scene.getAttribute('data-copy');

  closeStoryInlineDetail();
  activeStoryDetail = nextStoryDetail;

  window.clearTimeout(storyTextTimer);
  if (!storyText || force) {
    storyTitle.textContent = nextStoryTitle;
    storyCopy.textContent = nextStoryCopy;
    renderStoryInlineDetail();
    if (storyText) storyText.classList.remove('is-changing');
    return;
  }

  storyText.classList.add('is-changing');
  storyTextTimer = window.setTimeout(function () {
    storyTitle.textContent = nextStoryTitle;
    storyCopy.textContent = nextStoryCopy;
    renderStoryInlineDetail();
    storyText.classList.remove('is-changing');
  }, 360);
}

function updateStoryFromScroll() {
  if (!scenes.length || !storySection) return;
  var rect = storySection.getBoundingClientRect();
  var storyHeight = storySection.offsetHeight || window.innerHeight;
  var scrollableHeight = Math.max(storyHeight - window.innerHeight, 1);
  var progress = Math.min(Math.max((0 - rect.top) / scrollableHeight, 0), 1);
  var index = Math.round(progress * (scenes.length - 1));

  setActiveStoryScene(scenes[index], false);
}

function updateStoryPin() {
  if (!storySection || !storyText) return;
  storyText.classList.remove('is-fixed', 'is-bottom');

  if (!window.matchMedia('(min-width: 641px)').matches) return;

  var headerOffset = 58;
  var rect = storySection.getBoundingClientRect();
  if (rect.top > headerOffset) return;

  if (rect.bottom <= window.innerHeight) {
    storyText.classList.add('is-bottom');
    return;
  }

  storyText.classList.add('is-fixed');
}

function requestStoryUpdate() {
  if (storyUpdateFrame) return;
  storyUpdateFrame = window.requestAnimationFrame(function () {
    storyUpdateFrame = null;
    updateStoryPin();
    updateStoryFromScroll();
  });
}

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

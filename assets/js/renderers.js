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

var chapterMeta = {
  'WHY THIS MATTERS': { number: '01', className: 'why', label: 'WHY THIS MATTERS' },
  'THE KUBECA SYSTEM': { number: '02', className: 'build', label: 'THE KUBECA SYSTEM' },
  'WHAT WE BUILD': { number: '02', className: 'build', label: 'THE KUBECA SYSTEM' },
  'OUR PRODUCTS': { number: '03', className: 'products', label: 'OUR PRODUCTS' },
  'WHERE KUBECA CREATES VALUE': { number: '04', className: 'market', label: 'WHERE KUBECA CREATES VALUE' },
  'MARKET AREAS': { number: '04', className: 'market', label: 'WHERE KUBECA CREATES VALUE' },
  'FIELD VALIDATION': { number: '05', className: 'validation', label: 'FIELD VALIDATION' },
  'TEAM / VALIDATION': { number: '05', className: 'validation', label: 'FIELD VALIDATION' },
  'INVESTOR ROADMAP': { number: '06', className: 'finance', label: 'INVESTOR ROADMAP' },
  'CURRENT INVESTMENT FOCUS': { number: '07', className: 'finance-focus', label: 'CURRENT INVESTMENT FOCUS' },
  'CONTACT': { number: '08', className: 'cta', label: 'CONTACT' },
  'CTA': { number: '08', className: 'cta', label: 'CONTACT' }
};

function iconPath(fileName) {
  return 'assets/icons/kubeca/kubeca_icons/svg/' + fileName;
}

function whyNowIconPath(fileName) {
  return iconPath('why-now/' + fileName);
}

function renderChapterHeader(groupHeading) {
  var meta = chapterMeta[groupHeading];
  if (!meta) return '';

  return '<header class="chapter-header ' + meta.className + '-header">' +
    '<div class="chapter-brand ' + meta.className + '-brand"><div class="chapter-mark ' + meta.className + '-mark"></div><span>KUBECA</span></div>' +
    '<div class="chapter-section-label ' + meta.className + '-section-label">' + meta.number + ' / ' + meta.label + '<span></span></div>' +
  '</header>';
}

function renderImageChapterHero(groupHeading, options) {
  var paragraphs = (options.paragraphs || []).map(function (paragraph) {
    return '<p>' + paragraph + '</p>';
  }).join('');
  var sideMarkup = paragraphs ? '<div class="' + options.sideClass + ' image-chapter-side">' + paragraphs + '</div>' : '';
  var imageError = options.fallbackClass ? ' onerror="this.closest(\'.' + options.heroClass + '\').classList.add(\'' + options.fallbackClass + '\'); this.remove();"' : '';

  return '<section class="' + options.heroClass + ' image-chapter-hero">' +
    '<div class="' + options.mediaClass + ' image-chapter-media"><img src="' + options.imageSrc + '" alt="' + options.imageAlt + '"' + imageError + '></div>' +
    '<div class="' + options.copyClass + ' image-chapter-copy">' +
      '<h2>' + options.title + '</h2>' +
      '<div class="' + options.ruleClass + ' image-chapter-rule"></div>' +
      (options.lead ? '<p>' + options.lead + '</p>' : '') +
    '</div>' +
    sideMarkup +
  '</section>';
}

function usesCustomChapterPage(groupHeading) {
  return !!chapterMeta[groupHeading];
}

function renderChapterFooter(className) {
  return '<footer class="chapter-footer ' + className + '-footer"><em>KUBECA | AUTONOMOUS AERIAL INTELLIGENCE</em></footer>';
}

function renderChapterBottom(className, label, lineOne, lineTwo) {
  return '<section class="chapter-bottom ' + className + '-bottom">' +
    '<small>' + label + '</small>' +
    '<p>' + lineOne + '<br><span>' + lineTwo + '</span></p>' +
  '</section>';
}

function getChapterCards(group) {
  return group.ids.map(function (id, index) {
    var card = deckData[id];
    if (!card) return '';

    return '<article class="standard-card" data-deck-section="' + id + '">' +
      '<small>' + String(index + 1).padStart(2, '0') + '</small>' +
      '<h3>' + card[1] + '</h3>' +
      '<p>' + card[2] + '</p>' +
      '<em>' + card[3] + '</em>' +
    '</article>';
  }).join('');
}

function renderStandardChapterPage(group, options) {
  return '<section class="chapter-page chapter-page-standard chapter-page-' + options.className + '">' +
    renderChapterHeader(group.heading) +
    '<section class="standard-hero">' +
      '<h2>' + options.title + '</h2>' +
      '<div class="standard-rule"></div>' +
      '<p>' + options.lead + '</p>' +
    '</section>' +
    '<section class="standard-board standard-board-' + options.layout + '">' +
      getChapterCards(group) +
    '</section>' +
    (options.extra || '') +
    (options.includeBottomLine === false ? '' : renderChapterBottom(options.className, 'BOTTOM LINE', options.bottomLineOne, options.bottomLineTwo)) +
    renderChapterFooter(options.className) +
  '</section>';
}

function renderHowItWorksGraphic() {
  return '<section class="mission-flow-line" aria-label="Mission flow">' +
    '<span>Deploy</span><i></i>' +
    '<span>Relay</span><i></i>' +
    '<span>Explore</span><i></i>' +
    '<span>Fuse</span><i></i>' +
    '<span>Control</span>' +
  '</section>';
}

function renderCtaActions() {
  return '<section class="cta-action-panel">' +
    '<a href="mailto:contact@kubeca.com?subject=KUBECA%20Team%20Contact">Contact the team <span>-></span></a>' +
  '</section>';
}

function renderDeckChapter(deckId) {
  var group = getDeckGroup(deckId);
  if (group.heading === 'WHY THIS MATTERS') {
    return '<section class="chapter-page chapter-page-why why-repair-layout">' +
      renderChapterHeader(group.heading) +
      '<section class="why-repair-intro">' +
        '<div class="why-repair-title">' +
          '<h2>THE AUTONOMY<br>BOTTLENECK IS<br>SYSTEM COORDINATION.</h2>' +
          '<div class="why-repair-rule"></div>' +
        '</div>' +
        '<div class="why-repair-copy">' +
          '<p>Autonomous platforms are advancing quickly, but mission coordination has not kept pace. Carrier hardware, local assets, sensors, maps, relay links, and operator workflows still have to become one mission system.</p>' +
          '<p>In high-pressure environments, the problem is both physical and digital: assets need reach, continuity, shared context, and human supervision at the same time.</p>' +
          '<p><strong>KUBECA connects these layers into one supervised mission-intelligence architecture.</strong></p>' +
        '</div>' +
      '</section>' +
      '<section class="why-repair-cards">' +
        '<article><div class="why-repair-card-head"><div class="why-repair-index">01</div><i class="why-repair-icon why-icon-crosshair"></i></div><h4>REACH + DEPLOYMENT GAP</h4><p>Local assets need reach, relay, payload capacity, and deployment support before they can create useful intelligence far from the operator.</p><figure><img src="assets/images/kubeca/why-matters/limited-reach.png" alt="" aria-hidden="true"></figure></article>' +
        '<article><div class="why-repair-card-head"><div class="why-repair-index">02</div><i class="why-repair-icon why-icon-signal"></i></div><h4>DEGRADED CONTINUITY</h4><p>Range limits, terrain, structures, and communication disruption can break the mission picture.</p><figure><img src="assets/images/kubeca/why-matters/broken-continuity.png" alt="" aria-hidden="true"></figure></article>' +
        '<article><div class="why-repair-card-head"><div class="why-repair-index">03</div><i class="why-repair-icon why-icon-layers"></i></div><h4>OPERATOR OVERLOAD</h4><p>Operators must interpret multiple feeds and tools instead of supervising one coherent mission system.</p><figure><img src="assets/images/kubeca/why-matters/fragmented-control.png" alt="" aria-hidden="true"></figure></article>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'WHY NOW') {
    return '<section class="chapter-page chapter-page-now now-page-layout now-reference-layout">' +
      renderChapterHeader(group.heading) +
      renderImageChapterHero(group.heading, {
        heroClass: 'now-hero',
        mediaClass: 'now-hero-image',
        copyClass: 'now-hero-copy',
        sideClass: 'now-hero-side',
        ruleClass: 'now-small-line',
        title: 'AERIAL AUTONOMY<br>IS MOVING FROM<br>TOOLS TO SYSTEMS.',
        paragraphs: [
          'Drone operations are scaling beyond single-asset control. More platforms are entering the field, and missions are becoming longer, faster, more distributed, and more dependent on software-defined coordination.',
          'The shift is no longer about improving individual drones.',
          'It is about turning autonomy into a system layer.'
        ],
        imageSrc: 'assets/images/kubeca/why-now/tools-to-systems-hero.png',
        imageAlt: 'KUBECA aerial autonomy moving from tools to systems'
      }) +
      '<section class="now-shift">' +
        '<h3>THE SHIFT: FROM FRAGILE, SINGLE-ASSET OPERATIONS TO RESILIENT, SYSTEM-LEVEL AUTONOMY</h3>' +
        '<div class="now-shift-table">' +
          '<div class="now-shift-head now-shift-left">WHAT CHANGED</div>' +
          '<div></div>' +
          '<div class="now-shift-head now-shift-right">WHAT IT REQUIRES</div>' +
          '<article><img src="' + whyNowIconPath('more_aerial_assets.svg') + '" alt="" aria-hidden="true"><p>More aerial assets</p></article><span class="now-shift-arrow">-></span><article><p>Multi-asset coordination</p><img src="' + whyNowIconPath('multi_asset_coordination.svg') + '" alt="" aria-hidden="true"></article>' +
          '<article><img src="' + whyNowIconPath('degraded_signals.svg') + '" alt="" aria-hidden="true"><p>Degraded signals</p></article><span class="now-shift-arrow">-></span><article><p>Resilient navigation</p><img src="' + whyNowIconPath('resilient_navigation.svg') + '" alt="" aria-hidden="true"></article>' +
          '<article><img src="' + whyNowIconPath('urban_indoor_missions.svg') + '" alt="" aria-hidden="true"><p>Urban / indoor missions</p></article><span class="now-shift-arrow">-></span><article><p>Shared spatial awareness</p><img src="' + whyNowIconPath('shared_spatial_awareness.svg') + '" alt="" aria-hidden="true"></article>' +
        '</div>' +
      '</section>' +
      '<section class="now-drivers">' +
        '<h3>KEY TIMING DRIVERS</h3>' +
        '<div class="now-driver-grid">' +
          '<article><strong>01</strong><figure><img src="assets/images/kubeca/why-matters/limited-reach.png" alt="" aria-hidden="true"></figure><img class="now-driver-icon" src="' + whyNowIconPath('more_aerial_assets.svg') + '" alt="" aria-hidden="true"><h4>DRONE SCALE IS<br>ACCELERATING</h4><p>The number of aerial assets is increasing. Coordination, not hardware, becomes the bottleneck.</p></article>' +
          '<article><strong>02</strong><figure><img src="assets/images/kubeca/why-matters/broken-continuity.png" alt="" aria-hidden="true"></figure><img class="now-driver-icon" src="assets/icons/kubeca/why-matters/podcast.svg" alt="" aria-hidden="true"><h4>MISSIONS ARE OUTGROWING<br>DIRECT CONTROL</h4><p>Longer range, enclosed spaces, degraded links, and faster decisions make manual single-drone operation insufficient.</p></article>' +
        '</div>' +
      '</section>' +
      renderChapterFooter('now') +
    '</section>';
  }

  if (group.heading === 'THE KUBECA SYSTEM' || group.heading === 'WHAT WE BUILD') {
    return '<section class="chapter-page chapter-page-build system-showcase-layout">' +
      renderChapterHeader(group.heading) +
      '<section class="system-showcase-intro">' +
        '<p class="system-showcase-kicker">02 / THE KUBECA SYSTEM</p>' +
        '<h2>THE KUBECA SYSTEM: ONE MISSION LAYER FOR COORDINATED AUTONOMOUS ASSETS.</h2>' +
        '<p class="system-showcase-copy">KUBECA starts with an aerial configuration: a carrier platform, local drone agents, mission software, and human supervision. Together, these elements form one supervised mission-intelligence system - connecting reach, local sensing, spatial understanding, and operator control.</p>' +
        '<p class="system-showcase-copy">The first configuration validates the architecture in the air. The long-term platform is the coordination layer: future ground robots, additional sensors, or maritime assets can connect as mission nodes through the same supervised mission system.</p>' +
      '</section>' +
      '<section class="system-carousel" data-system-carousel role="region" aria-roledescription="carousel" aria-label="The KUBECA system">' +
        '<div class="system-carousel-slides">' +
          '<article class="system-carousel-slide is-active" data-system-slide-panel="0" role="group" aria-roledescription="slide" aria-label="1 of 3: Carrier at range">' +
            '<img src="assets/images/kubeca/system/carrier.png" alt="Carrier aircraft operating above a mountain valley">' +
            '<div class="system-carousel-caption"><small>01 /</small><h3>CARRIER AT RANGE</h3><p>The carrier platform moves local drone teams beyond normal range and maintains a resilient relay link for mission continuity.</p></div>' +
          '</article>' +
          '<article class="system-carousel-slide" data-system-slide-panel="1" role="group" aria-roledescription="slide" aria-label="2 of 3: Deployable scout agents" aria-hidden="true">' +
            '<img src="assets/images/kubeca/system/scout-agents.png" alt="Deployable drone agents operating above an urban area" loading="lazy">' +
            '<div class="system-carousel-caption"><small>02 /</small><h3>DEPLOYABLE SCOUT AGENTS</h3><p>Local drone teams explore, map, and sense close to the objective, generating the spatial context that raw video alone cannot provide.</p></div>' +
          '</article>' +
          '<article class="system-carousel-slide" data-system-slide-panel="2" role="group" aria-roledescription="slide" aria-label="3 of 3: Operator in control" aria-hidden="true">' +
            '<img src="assets/images/kubeca/system/operator-control.png" alt="Operator supervising mission intelligence screens" loading="lazy">' +
            '<div class="system-carousel-caption"><small>03 /</small><h3>OPERATOR IN CONTROL</h3><p>Mission intelligence transforms distributed sensor data into actionable answers, while operators supervise autonomy, confirm decisions, and intervene when needed.</p></div>' +
          '</article>' +
        '</div>' +
        '<div class="system-carousel-controls">' +
          '<button class="system-carousel-arrow" type="button" data-system-previous aria-label="Previous slide">&larr;</button>' +
          '<div class="system-carousel-dots" aria-label="Select a slide">' +
            '<button type="button" class="is-active" data-system-slide="0" aria-label="Show slide 1: Carrier at range" aria-current="true"><span>01</span></button>' +
            '<button type="button" data-system-slide="1" aria-label="Show slide 2: Deployable scout agents"><span>02</span></button>' +
            '<button type="button" data-system-slide="2" aria-label="Show slide 3: Operator in control"><span>03</span></button>' +
          '</div>' +
          '<p class="system-carousel-count" aria-live="polite"><span data-system-current>01</span> / 03</p>' +
          '<button class="system-carousel-arrow" type="button" data-system-next aria-label="Next slide">&rarr;</button>' +
        '</div>' +
      '</section>' +
      '<section class="system-future-teaser" aria-label="Future connected assets">' +
        '<p class="system-future-teaser-label">FUTURE EXTENSION</p>' +
        '<p class="system-future-teaser-copy">Future ground robots, maritime systems, and additional sensors can connect as mission nodes through the same supervised mission-intelligence layer.</p>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'OUR PRODUCTS') {
    return '<section class="chapter-page chapter-page-products products-deck-layout">' +
      '<header class="products-deck-intro">' +
        '<div>' +
          '<p class="products-deck-kicker">03 / OUR PRODUCTS</p>' +
          '<h2>What KUBECA is building first.</h2>' +
        '</div>' +
        '<div class="products-deck-overview">' +
          '<p>Phase 1 focuses on the aerial mission-system configuration: a carrier platform, mission modules, local drone agents, and the mission software stack.</p>' +
          '<p class="products-deck-phase">This configuration is designed to validate the core coordination layer before expanding to additional asset types.</p>' +
        '</div>' +
      '</header>' +
      '<section class="products-deck" data-products-deck aria-label="Product architecture">' +
        '<div class="products-panels">' +
          '<article class="products-panel is-active" id="product-panel-carrier" data-product-panel="0" role="tabpanel" aria-labelledby="product-tab-carrier">' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/carrier-platform.png" alt="Carrier platform and its modular deployment architecture"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The reach layer.</p><h3>Carrier Platform</h3><p class="products-summary">Extends range, supports relay connectivity, carries mission modules, and enables deployment of local drone agents.</p>' +
              '<dl class="products-details"><div><dt>Core Role</dt><dd>Extend range, maintain connectivity, support local drone deployment.</dd></div><div><dt>Configurable With</dt><dd>Relay, sensor, release, communication, and hybrid mission modules.</dd></div><div><dt>Why It Matters</dt><dd>One reusable platform supports multiple mission types without redesigning the airframe.</dd></div></dl>' +
            '</div>' +
          '</article>' +
          '<article class="products-panel" id="product-panel-modules" data-product-panel="1" role="tabpanel" aria-labelledby="product-tab-modules" aria-hidden="true" hidden>' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/mission-modules.png" alt="Interchangeable mission modules for configurable capability" loading="lazy"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The configurable mission layer.</p><h3>Mission Modules</h3><p class="products-summary">Mission capability changes through interchangeable modules, not a new aircraft for every use case.</p>' +
              '<dl class="products-details"><div><dt>Relay Module</dt><dd>Extends communication between operators and mission assets.</dd></div><div><dt>Sensor Module</dt><dd>Adds EO, thermal, mapping, or awareness payloads.</dd></div><div><dt>Release Module</dt><dd>Carries and deploys local drones near the mission area.</dd></div><div><dt>Hybrid Module</dt><dd>Combines relay, sensing, and deployment in one setup.</dd></div></dl>' +
            '</div>' +
          '</article>' +
          '<article class="products-panel" id="product-panel-drones" data-product-panel="2" role="tabpanel" aria-labelledby="product-tab-drones" aria-hidden="true" hidden>' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/local-drone-teams.png" alt="Local drone teams deployed for close-area intelligence" loading="lazy"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The close-area intelligence layer.</p><h3>Local Drone Agents</h3><p class="products-summary">Deployable drones sense, localize, map, and report local mission context near the objective.</p>' +
              '<dl class="products-details"><div><dt>FPV</dt><dd>Direct control for immediate operator-led tasks.</dd></div><div><dt>Assisted</dt><dd>Stabilized navigation and guided sensing support.</dd></div><div><dt>Autonomous Scout</dt><dd>Local exploration and spatial context generation.</dd></div><div><dt>Coordinated Team</dt><dd>Multiple assets working from shared mission intent.</dd></div></dl>' +
            '</div>' +
          '</article>' +
          '<article class="products-panel" id="product-panel-software" data-product-panel="3" role="tabpanel" aria-labelledby="product-tab-software" aria-hidden="true" hidden>' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/mission-software.png" alt="Mission software interface coordinating supervised autonomous assets" loading="lazy"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The coordination layer.</p><h3>Mission Software Stack</h3><p class="products-summary">Connects carrier agent, local drone agents, mission data, and human supervision into one shared operational picture.</p>' +
              '<dl class="products-details"><div><dt>Carrier Agent Layer</dt><dd>Reach, relay, and deployment coordination.</dd></div><div><dt>Local Drone Agent Layer</dt><dd>Sense, map, and report local mission context.</dd></div><div><dt>Mission Intelligence Layer</dt><dd>Fuse, coordinate, and supervise mission data.</dd></div><div><dt>Human Supervision Interface</dt><dd>Decide, redirect, and intervene while the system coordinates.</dd></div></dl>' +
            '</div>' +
          '</article>' +
        '</div>' +
        '<div class="products-tabs" role="tablist" aria-label="Select product view">' +
          '<button class="products-tab is-active" id="product-tab-carrier" type="button" role="tab" data-product-tab="0" aria-controls="product-panel-carrier" aria-selected="true"><small>01</small><span>Carrier Platform</span></button>' +
          '<button class="products-tab" id="product-tab-modules" type="button" role="tab" data-product-tab="1" aria-controls="product-panel-modules" aria-selected="false" tabindex="-1"><small>02</small><span>Mission Modules</span></button>' +
          '<button class="products-tab" id="product-tab-drones" type="button" role="tab" data-product-tab="2" aria-controls="product-panel-drones" aria-selected="false" tabindex="-1"><small>03</small><span>Local Drone Agents</span></button>' +
          '<button class="products-tab" id="product-tab-software" type="button" role="tab" data-product-tab="3" aria-controls="product-panel-software" aria-selected="false" tabindex="-1"><small>04</small><span>Mission Software Stack</span></button>' +
        '</div>' +
      '</section>' +
      '<section class="products-future-assets" aria-label="Future connected assets">' +
        '<p class="products-future-label">FUTURE CONNECTED ASSETS</p>' +
        '<p class="products-future-copy">The mission intelligence layer is designed to connect additional autonomous assets over time. Carrier drones, local scout teams, future ground robots, and maritime carrier systems can become connected assets inside the same supervised mission architecture.</p>' +
        '<p class="products-future-thesis">The carrier and local drones are the first configuration. The defensible platform is the mission intelligence layer that can coordinate future assets across air, ground, and maritime domains.</p>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'HOW A MISSION WORKS' || group.heading === 'HOW IT WORKS') {
    return '<section class="chapter-page chapter-page-works works-flow-layout">' +
      renderChapterHeader(group.heading) +
      '<section class="works-flow-intro">' +
        '<div class="works-flow-title">' +
          '<h2>FROM RANGE TO<br>LOCAL INTELLIGENCE.</h2>' +
          '<div class="works-flow-rule"></div>' +
        '</div>' +
        '<div class="works-flow-copy">' +
          '<p>The carrier moves local drone teams beyond normal range. Local drones explore and map the area. The system turns live sensor data into spatial context. Operators receive mission-relevant answers and remain in control.</p>' +
          '<small>DEPLOY / RELAY / EXPLORE / UNDERSTAND / CONTROL</small>' +
        '</div>' +
      '</section>' +
      '<section class="works-mission-flow" aria-label="Mission flow">' +
        '<div class="works-section-label"><h3>MISSION FLOW</h3><span></span></div>' +
        '<div class="works-flow-steps">' +
          '<article><strong>01</strong><figure><img src="assets/images/kubeca/how-it-works/icon1.png" alt="" aria-hidden="true"></figure><h4>DEPLOY</h4><p>The carrier moves local autonomous drone teams beyond normal range and positions them near the area of interest.</p></article>' +
          '<i aria-hidden="true">-></i>' +
          '<article><strong>02</strong><figure><img src="assets/images/kubeca/how-it-works/icon2.png" alt="" aria-hidden="true"></figure><h4>RELEASE + RELAY</h4><p>Local drones deploy near the mission area while the carrier remains airborne as a relay and data bridge.</p></article>' +
          '<i aria-hidden="true">-></i>' +
          '<article><strong>03</strong><figure><img src="assets/images/kubeca/how-it-works/icon3.png" alt="" aria-hidden="true"></figure><h4>EXPLORE + MAP</h4><p>Autonomous drones explore terrain, buildings, and enclosed spaces while building spatial context.</p></article>' +
          '<i aria-hidden="true">-></i>' +
          '<article class="is-understand"><strong>04</strong><figure><img src="assets/images/kubeca/how-it-works/icon4.png" alt="" aria-hidden="true"></figure><h4>UNDERSTAND</h4><p>Raw feeds become spatial context: places, paths, obstacles, objects, changes, and risk areas.</p></article>' +
          '<i aria-hidden="true">-></i>' +
          '<article><strong>05</strong><figure><img src="assets/images/kubeca/how-it-works/icon5.png" alt="" aria-hidden="true"></figure><h4>CONFIRM + CONTROL</h4><p>Operators receive answers, confirm critical actions, and remain in control.</p></article>' +
        '</div>' +
      '</section>' +
      '<section class="works-spatial-layer">' +
        '<div class="works-spatial-copy">' +
          '<small>THE UNDERSTANDING LAYER</small>' +
          '<span>SPATIAL CONTEXT</span>' +
          '<h3>DRONE FEEDS<br>TO SPATIAL CONTEXT<br>TO MISSION-RELEVANT<br>ANSWERS.</h3>' +
          '<p>The system structures live drone data into places, paths, obstacles, objects, changes, and risk areas.</p>' +
          '<p><strong>Spatial context turns exploration into operator-ready answers.</strong></p>' +
        '</div>' +
        '<div class="works-spatial-pipeline" aria-label="Spatial autonomy pipeline">' +
          '<article>' +
            '<strong>01</strong>' +
            '<h4>DRONE FEEDS</h4>' +
            '<p>Sensors, video, telemetry</p>' +
            '<figure><img src="assets/images/kubeca/how-it-works/drone-feeds-objects.png" alt="" aria-hidden="true"></figure>' +
          '</article>' +
          '<article>' +
            '<strong>02</strong>' +
            '<h4>SPATIAL CONTEXT</h4>' +
            '<p>Places, paths, obstacles, objects, changes, and risk areas</p>' +
            '<figure><img src="assets/images/kubeca/how-it-works/scene-graph.png" alt="" aria-hidden="true"></figure>' +
          '</article>' +
          '<article>' +
            '<strong>03</strong>' +
            '<h4>MISSION-RELEVANT ANSWERS</h4>' +
            '<p>Operator insights, unit actions, mission continuity</p>' +
            '<figure><img src="assets/images/kubeca/how-it-works/route-control.png" alt="" aria-hidden="true"></figure>' +
          '</article>' +
        '</div>' +
      '</section>' +
      renderChapterFooter('works') +
    '</section>';
  }

  if (group.heading === 'WHAT IT ENABLES') {
    return renderStandardChapterPage(group, {
      className: 'enables',
      layout: 'cards',
      title: 'STRUCTURED SPATIAL INTELLIGENCE<br>FROM PLACES TEAMS CANNOT SAFELY<br>OR RELIABLY REACH.',
      lead: 'KUBECA gives operators more than video. It returns spatial information: where things are, how spaces connect, what changed, where movement is possible, and where attention is needed.',
      bottomLineOne: 'THE VALUE IS NOT MORE VIDEO.',
      bottomLineTwo: 'THE VALUE IS STRUCTURED SPATIAL INTELLIGENCE DELIVERED AT RANGE.'
    });
  }

  if (group.heading === 'WHERE KUBECA CREATES VALUE' || group.heading === 'MARKET AREAS') {
    return '<section class="chapter-page chapter-page-market market-impact-layout">' +
      '<header class="market-impact-intro">' +
        '<div class="market-impact-title">' +
          '<p class="market-impact-kicker">04 / WHERE KUBECA CREATES VALUE</p>' +
          '<h2>BUILT FOR MISSIONS<br>WHERE ACCESS, RANGE<br>AND UNDERSTANDING<br>MATTER.</h2>' +
        '</div>' +
        '<div class="market-impact-copy">' +
          '<p>KUBECA begins with a defense-relevant aerial configuration for supervised intelligence at range.</p>' +
          '<p>The same mission intelligence architecture can extend over time into adjacent high-need environments where access is limited and decisions depend on structured spatial context.</p>' +
        '</div>' +
      '</header>' +
      '<section class="market-impact-tiles" aria-label="High-need markets">' +
        '<article class="market-impact-tile market-impact-tile--focus" data-deck-section="market-deep-recon"><figure class="market-impact-media"><img src="assets/images/kubeca/markets/defense-tactical-isr.png" alt="A field operator supervising a reconnaissance aircraft in remote terrain" loading="lazy"></figure><div class="market-impact-body"><p class="market-impact-tag">INITIAL FOCUS</p><div><small>01</small><h3>DEFENSE / TACTICAL ISR</h3></div><p>Long-range reconnaissance, deployable local sensing, and supervised situational awareness in contested and high-risk environments.</p></div></article>' +
        '<article class="market-impact-tile" data-deck-section="market-indoor-urban"><figure class="market-impact-media"><img src="assets/images/kubeca/markets/disaster-response-search.png" alt="Rescue responders supervising drones during a waterside search operation" loading="lazy"></figure><div class="market-impact-body"><p class="market-impact-tag">ADJACENT APPLICATION</p><div><small>02</small><h3>DISASTER RESPONSE /<br>SEARCH OPERATIONS</h3></div><p>Rapid assessment of damaged or inaccessible areas, local mapping, and safer information gathering before responders enter.</p></div></article>' +
        '<article class="market-impact-tile" data-deck-section="market-distributed-isr"><figure class="market-impact-media"><img src="assets/images/kubeca/markets/critical-infrastructure-security.png" alt="An infrastructure inspector supervising a drone beneath a bridge" loading="lazy"></figure><div class="market-impact-body"><p class="market-impact-tag">PLATFORM EXPANSION</p><div><small>03</small><h3>CRITICAL INFRASTRUCTURE<br>SECURITY</h3></div><p>Inspection, perimeter awareness, and coordinated autonomous sensing across complex sites and critical assets.</p></div></article>' +
      '</section>' +
      '<section class="market-impact-focus" aria-label="Market focus">' +
        '<p class="market-impact-statement">ONE MISSION INTELLIGENCE LAYER.<br><strong>EXPANDABLE ACROSS HIGH-NEED MISSIONS.</strong></p>' +
        '<div><small>FIRST VALIDATION PATH</small><p>Aerial Defense / Tactical ISR</p></div>' +
        '<div><small>FUTURE REACH</small><p>Disaster response and critical infrastructure security</p></div>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'FIELD VALIDATION' || group.heading === 'TEAM / VALIDATION') {
    return '<section class="chapter-page chapter-page-validation validation-proof-layout">' +
      '<section class="validation-proof-stage">' +
        '<img class="validation-proof-media" src="assets/images/kubeca/validation/fabric.png" alt="Carrier aircraft integration facility" loading="lazy" onload="this.closest(\'.validation-proof-stage\').classList.add(\'has-media\')" onerror="this.remove()">' +
        '<header class="validation-proof-hero">' +
          '<div class="validation-proof-overlay">' +
            '<p class="validation-proof-kicker">05 / FIELD VALIDATION</p>' +
            '<h2>BUILT FROM REAL<br>AUTONOMOUS SYSTEM<br>DEVELOPMENT.</h2>' +
            '<div class="validation-proof-lead">' +
              '<p>KUBECA is founded on hands-on team experience across unmanned systems development, autonomy software, field testing, operator feedback, and defense-relevant system environments.</p>' +
              '<p>This prior team experience directly informs the KUBECA mission-system architecture.</p>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<section class="validation-proof-rows" aria-label="Verified development experience">' +
          '<article data-deck-section="validation-real-system-development"><small>01</small><h3>FULL SYSTEM DEVELOPMENT</h3><p>Team experience leading complete development cycles from concept to deployment: hardware design, component sizing, flight-stack integration, software architecture, hardware/software testing, field iteration, and deployment support.</p></article>' +
          '<article><small>02</small><h3>MISSION-READY<br>UAS INTEGRATION</h3><p>Prior team experience integrating defense-relevant unmanned aerial systems with hardware, flight software, payload systems, and mission-relevant platform behavior into functional field-ready systems.</p></article>' +
          '<article><small>03</small><h3>GPS-DENIED<br>AUTONOMY</h3><p>Prior team development work in a SPRIND autonomous systems challenge, including SLAM, local mapping, GPS-denied navigation, scene-graph based spatial understanding, autonomy-stack integration, and system-level software development.</p></article>' +
          '<article><small>04</small><h3>FIELD TESTING &amp;<br>OPERATIONAL EXPOSURE</h3><p>Prior team work included systems deployed in Ukraine and systems presented and flight-tested at the NATO Mountain Warfare Centre of Excellence. Tactical drone deployment presentation delivered; Challenge Coin awarded.</p></article>' +
          '<article><small>05</small><h3>DEFENSE ECOSYSTEM<br>EXPERIENCE</h3><p>Team experience includes Bundeswehr-related working groups, discussions with the German Army Concepts and Capabilities Development Centre, collaboration with firms advising the Bundeswehr, industry trade fair representation, and operator feedback.</p></article>' +
        '</section>' +
      '</section>' +
      '<section class="validation-method-band" aria-label="How KUBECA builds">' +
        '<div class="validation-method-title"><small>HOW WE BUILD</small><h3>BUILD EARLY. TEST IN THE FIELD.<br>ITERATE FROM OPERATOR FEEDBACK.</h3></div>' +
        '<div class="validation-method-copy"><p>Proven hardware development, autonomy software, and operational feedback are applied through usable prototypes, real constraints, and fast hardware-software iteration.</p><strong>THE NEXT STEP IS THE FIRST INTEGRATED KUBECA MISSION-SYSTEM DEMONSTRATION.</strong></div>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'INVESTOR ROADMAP') {
    return '<section class="chapter-page chapter-page-finance finance-roadmap-layout">' +
      '<header class="finance-intro">' +
        '<div>' +
          '<p class="finance-kicker">06 / INVESTOR ROADMAP</p>' +
          '<h2>Capital staged<br>around risk reduction.</h2>' +
        '</div>' +
        '<p class="finance-lead">KUBECA raises against measurable milestones: hardware validation, repeatable pilot systems, and a verification pathway toward regulated scale.</p>' +
      '</header>' +
      '<section class="finance-roadmap-table" aria-label="Capital roadmap">' +
        '<div class="finance-table-head" aria-hidden="true"><span>Phase</span><span>Round</span><span>Indicative Raise</span><span>Primary Unlock</span><span>Risk Reduced</span></div>' +
        '<article>' +
          '<div class="finance-phase" data-label="Phase">01</div>' +
          '<div data-label="Round"><strong>Pre-Seed / Prototype</strong></div>' +
          '<div class="finance-raise" data-label="Indicative Raise">&euro;2-4M</div>' +
          '<p data-label="Primary Unlock">Integrated carrier-enabled hardware demonstration and partner evaluation units</p>' +
          '<p data-label="Risk Reduced">Technical integration risk</p>' +
        '</article>' +
        '<article>' +
          '<div class="finance-phase" data-label="Phase">02</div>' +
          '<div data-label="Round"><strong>Seed / Pilot Production</strong></div>' +
          '<div class="finance-raise" data-label="Indicative Raise">&euro;8-15M</div>' +
          '<p data-label="Primary Unlock">Repeatable pilot systems, Mission Intelligence v1, and early partner validation</p>' +
          '<p data-label="Risk Reduced">Production, market, and verification risk</p>' +
        '</article>' +
        '<article>' +
          '<div class="finance-phase" data-label="Phase">03</div>' +
          '<div data-label="Round"><strong>Series A / Regulated Scale</strong></div>' +
          '<div class="finance-raise" data-label="Indicative Raise">&euro;25-50M</div>' +
          '<p data-label="Primary Unlock">Verification package, certification pathway, and scalable autonomous mission-system production</p>' +
          '<p data-label="Risk Reduced">Regulatory and scale risk</p>' +
        '</article>' +
      '</section>' +
      '<section class="finance-logic" aria-label="Investment logic">' +
        '<small>INVESTMENT LOGIC</small>' +
        '<p>Each round reduces a different class of risk. Phase 1 proves the integrated system in hardware. Phase 2 makes it repeatable and pilot-ready. Phase 3 prepares verification, certification pathways, and regulated scale.</p>' +
      '</section>' +
      '<p class="finance-conclusion">The roadmap is not about building another drone. It is about proving a supervised autonomous mission system step by step.</p>' +
    '</section>';
  }

  if (group.heading === 'CURRENT INVESTMENT FOCUS') {
    return '<section class="chapter-page chapter-page-finance finance-focus-layout">' +
      '<header class="finance-intro finance-focus-intro">' +
        '<div>' +
          '<p class="finance-kicker">07 / CURRENT INVESTMENT FOCUS</p>' +
          '<h2>Pre-Seed /<br>Prototype Round</h2>' +
        '</div>' +
        '<p class="finance-lead">KUBECA is preparing an indicative &euro;2-4M Pre-Seed / Prototype round to validate the carrier-enabled mission system in hardware, build partner evaluation units, and prepare the transition to pilot production.</p>' +
      '</header>' +
      '<section class="finance-progress" aria-label="Phase 1 starting point">' +
        '<header class="finance-progress-intro">' +
          '<h3>PHASE 1 STARTING POINT</h3>' +
          '<p>The current round does not begin from zero. It builds on proven team capability and tangible KUBECA carrier-platform progress, while funding the integration and validation work required for a complete supervised mission-system demonstration.</p>' +
        '</header>' +
        '<div class="finance-progress-head" aria-hidden="true"><span>Workstream</span><span>Current Status</span><span>Next Validation Step</span></div>' +
        '<article>' +
          '<strong data-label="Workstream">Carrier Platform Design</strong>' +
          '<p data-label="Current Status"><em>COMPLETED</em>Carrier-system CAD design completed and prototype chassis built.</p>' +
          '<p data-label="Next Validation Step">Integrate mission hardware, relay architecture, and deployment mechanism.</p>' +
        '</article>' +
        '<article>' +
          '<strong data-label="Workstream">Autonomous Carrier Flight</strong>' +
          '<p data-label="Current Status"><em>DEMONSTRATED</em>First autonomous flight of the long-range carrier platform completed successfully.</p>' +
          '<p data-label="Next Validation Step">Expand testing toward integrated mission-system operations.</p>' +
        '</article>' +
        '<article>' +
          '<strong data-label="Workstream">GNSS-Denied Autonomy</strong>' +
          '<p data-label="Current Status"><em>EARLY DEMONSTRATION</em>GNSS-denied functionality demonstrated in a short test scenario.</p>' +
          '<p data-label="Next Validation Step">Field-test under representative mission constraints.</p>' +
        '</article>' +
        '<article>' +
          '<strong data-label="Workstream">Carrier GNSS-Denied Integration</strong>' +
          '<p data-label="Current Status"><em>IN PROGRESS</em>Integration into the carrier-system development path is underway.</p>' +
          '<p data-label="Next Validation Step">Validate within the integrated aerial configuration.</p>' +
        '</article>' +
        '<p class="finance-progress-close">Phase 1 converts proven capability and current carrier-platform progress into an integrated KUBECA mission-system demonstration.</p>' +
      '</section>' +
      '<section class="finance-snapshot" aria-label="Round snapshot">' +
        '<h3>ROUND SNAPSHOT</h3>' +
        '<dl>' +
          '<div><dt>Target Range</dt><dd class="finance-raise">Indicative &euro;2-4M</dd></div>' +
          '<div><dt>Runway</dt><dd>18-24 months</dd></div>' +
          '<div><dt>Structure</dt><dd>To be finalized with a lead investor; equity or convertible instrument considered</dd></div>' +
          '<div><dt>Primary Proof Point</dt><dd>Integrated hardware demonstration and partner evaluation readiness</dd></div>' +
          '<div><dt>Capital Unlock</dt><dd>Technical proof, evaluation units, and pilot-production readiness</dd></div>' +
          '<div><dt>Main Risk Reduced</dt><dd>Technical integration risk</dd></div>' +
        '</dl>' +
      '</section>' +
      '<section class="finance-use" aria-label="Indicative use of funds">' +
        '<h3>INDICATIVE USE OF FUNDS</h3>' +
        '<div class="finance-use-head" aria-hidden="true"><span>Category</span><span>Allocation</span><span>Use</span></div>' +
        '<article><strong data-label="Category">Engineering &amp; Hardware</strong><em data-label="Allocation">45-55%</em><p data-label="Use">Carrier chassis, release mechanism, relay architecture, and local drone redesign</p></article>' +
        '<article><strong data-label="Category">Testing &amp; Validation</strong><em data-label="Allocation">15-20%</em><p data-label="Use">Ground tests, flight tests, GNSS-denied field validation, partner evaluation units, and field iteration</p></article>' +
        '<article><strong data-label="Category">Software Integration</strong><em data-label="Allocation">10-15%</em><p data-label="Use">Telemetry, operator workflow, asset tracking, and mission intelligence prototype</p></article>' +
        '<article><strong data-label="Category">Team &amp; Operations</strong><em data-label="Allocation">10-15%</em><p data-label="Use">Core hires, contractors, supplier coordination, workshop, and operations setup</p></article>' +
        '<article><strong data-label="Category">Verification / Documentation</strong><em data-label="Allocation">5-10%</em><p data-label="Use">Test evidence, safety documentation, and regulatory pathway preparation</p></article>' +
      '</section>' +
      '<p class="finance-conclusion finance-focus-close">Capital is focused on hardware validation, controlled testing, and evidence required for pilot production.</p>' +
    '</section>';
  }

  if (group.heading === 'ROADMAP') {
    return renderStandardChapterPage(group, {
      className: 'roadmap',
      layout: 'stack',
      title: 'FROM FLIGHT-TESTED COMPONENTS<br>TO AN INTEGRATED MISSION SYSTEM.',
      lead: 'KUBECA is building in stages: carrier platform, local drone teams, spatial understanding, relay architecture, and operator handover.',
      bottomLineOne: 'THE NEXT PROOF POINT IS A SYSTEM DEMONSTRATION:',
      bottomLineTwo: 'CARRIER FLIGHT, LOCAL DRONE DEPLOYMENT, SPATIAL INTELLIGENCE, AND MISSION HANDOVER.'
    });
  }

  if (group.heading === 'CTA' || group.heading === 'CONTACT') {
    return '<section class="chapter-page chapter-page-cta investor-contact-layout">' +
      '<div class="investor-contact-copy">' +
        '<p class="investor-contact-kicker">08 / CONTACT</p>' +
        '<h2>DISCUSS THE<br>KUBECA SYSTEM.</h2>' +
        '<p class="investor-contact-lead">Connect with the team to discuss the mission intelligence architecture, strategic partnerships, or an investment conversation.</p>' +
        '<details class="investor-contact-reveal">' +
          '<summary>Contact the team <span aria-hidden="true">-&gt;</span></summary>' +
          '<div class="investor-contact-details">' +
            '<p>Investor and strategic partnership conversations</p>' +
            '<a href="mailto:contact@kubeca.com?subject=KUBECA%20Investor%20Conversation">contact@kubeca.com</a>' +
          '</div>' +
        '</details>' +
      '</div>' +
      '<div class="investor-contact-signal" aria-hidden="true">' +
        '<i></i><i></i><i></i><i></i><i></i>' +
      '</div>' +
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

  return '<section class="chapter-page chapter-page-generic">' +
    renderChapterHeader(group.heading) +
    '<div class="deck-chapter-shell">' +
      '<div class="deck-chapter-stack">' + sectionMarkup + '</div>' +
    '</div>' +
    renderChapterFooter('generic') +
  '</section>';
}

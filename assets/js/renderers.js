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
  'INVESTOR ROADMAP': { number: '06', className: 'finance', label: 'CAPITAL STAGED AROUND RISK REDUCTION' },
  'CAPITAL STAGED AROUND RISK REDUCTION': { number: '06', className: 'finance', label: 'CAPITAL STAGED AROUND RISK REDUCTION' },
  'CONTACT': { number: '07', className: 'cta', label: 'CONTACT' },
  'CTA': { number: '07', className: 'cta', label: 'CONTACT' }
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
    return '<section class="chapter-page chapter-page-now now-page-layout now-editorial-layout">' +
      renderChapterHeader(group.heading) +
      '<section class="now-editorial-head">' +
        '<div class="now-editorial-kicker"><span>05</span><em>WHY NOW</em></div>' +
        '<h2>The next autonomy wave is coordinated systems - not isolated vehicles.</h2>' +
      '</section>' +
      '<section class="now-editorial-grid">' +
        '<figure class="now-editorial-media">' +
          '<img src="assets/images/kubeca/why-now/tools-to-systems-hero.png" alt="Mission screen and field operations view" loading="lazy">' +
        '</figure>' +
        '<div class="now-editorial-points">' +
          '<article><h3>Market shift</h3><p>Autonomous assets are moving from single platforms to connected air, ground, and maritime systems.</p></article>' +
          '<article><h3>External signals</h3><p>DARPA programs such as OFFSET, AMASS, and ANCILLARY point toward multi-agent autonomy, cross-domain coordination, and infrastructure-light carrier deployment.</p></article>' +
          '<article><h3>KUBECA entry point</h3><p>KUBECA validates the mission layer through aerial carrier-swarm operations, then extends the same coordination model across domains.</p></article>' +
        '</div>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'THE KUBECA SYSTEM' || group.heading === 'WHAT WE BUILD') {
    return '<section class="chapter-page chapter-page-build system-showcase-layout">' +
      renderChapterHeader(group.heading) +
      '<section class="system-showcase-intro">' +
        '<p class="system-showcase-kicker">02 / THE KUBECA SYSTEM</p>' +
        '<h2>THE KUBECA SYSTEM: ONE MISSION LAYER FOR COORDINATED AUTONOMOUS ASSETS.</h2>' +
        '<p class="system-showcase-copy">Seed product: aerial carrier-swarm operations. The system integrates carrier reach, local GNSS-denied drone operation, and mission software with human supervision into one workflow.</p>' +
        '<p class="system-showcase-copy">This chapter shows the three core system blocks in operation and how they stay connected through release, relay, sensing, and supervised handover.</p>' +
      '</section>' +
      '<section class="system-carousel" data-system-carousel role="region" aria-roledescription="carousel" aria-label="The KUBECA system">' +
        '<div class="system-carousel-slides">' +
          '<article class="system-carousel-slide is-active" data-system-slide-panel="0" role="group" aria-roledescription="slide" aria-label="1 of 3: Carrier at range">' +
            '<img src="assets/images/kubeca/system/carrier.png" alt="Carrier aircraft operating above a mountain valley">' +
            '<div class="system-carousel-caption"><small>01 /</small><h3>CARRIER AT RANGE</h3><p>A GNSS-resilient carrier extends reach, transports local quadcopters, and maintains a relay/control link for mission continuity.</p></div>' +
          '</article>' +
          '<article class="system-carousel-slide" data-system-slide-panel="1" role="group" aria-roledescription="slide" aria-label="2 of 3: Deployable scout agents" aria-hidden="true">' +
            '<img src="assets/images/kubeca/system/scout-agents.png" alt="Deployable drone agents operating above an urban area" loading="lazy">' +
            '<div class="system-carousel-caption"><small>02 /</small><h3>DEPLOYABLE SCOUT AGENTS</h3><p>Released local quadcopters continue FPV, assisted sensing, mapping, or local operation in GNSS-denied environments near the mission area.</p></div>' +
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
          '<p>Phase 1 validates a carrier-enabled aerial stack: GNSS-resilient carrier platform, mission modules, GNSS-denied local quadcopters, and mission software.</p>' +
          '<p class="products-deck-phase">That validation establishes the coordination layer used to integrate additional asset types over time.</p>' +
        '</div>' +
      '</header>' +
      '<section class="products-deck" data-products-deck aria-label="Product architecture">' +
        '<div class="products-panels">' +
          '<article class="products-panel is-active" id="product-panel-carrier" data-product-panel="0" role="tabpanel" aria-labelledby="product-tab-carrier">' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/carrier-platform.png" alt="Carrier platform and its modular deployment architecture"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The GNSS-resilient reach and relay layer.</p><h3>Carrier Platform</h3><p class="products-summary">A standardized fixed-wing carrier extends mission range, maintains relay connectivity, and carries mission modules for local quadcopter release, sensing, or communication.</p>' +
              '<ul class="products-capabilities"><li>GNSS-resilient reach</li><li>Relay connectivity</li><li>Mission module carriage</li><li>Local quadcopter release</li></ul>' +
            '</div>' +
          '</article>' +
          '<article class="products-panel" id="product-panel-modules" data-product-panel="1" role="tabpanel" aria-labelledby="product-tab-modules" aria-hidden="true" hidden>' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/mission-modules.png" alt="Interchangeable mission modules for configurable capability" loading="lazy"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The configurable mission layer.</p><h3>Mission Modules</h3><p class="products-summary">Mission capability changes through interchangeable modules rather than a new aircraft for every use case.</p>' +
              '<ul class="products-capabilities"><li>Relay module</li><li>Sensor module</li><li>Release module</li><li>Hybrid payload module</li></ul>' +
            '</div>' +
          '</article>' +
          '<article class="products-panel" id="product-panel-drones" data-product-panel="2" role="tabpanel" aria-labelledby="product-tab-drones" aria-hidden="true" hidden>' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/local-drone-teams.png" alt="Local drone teams deployed for close-area intelligence" loading="lazy"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The GNSS-denied local operation layer.</p><h3>Local Drone Teams</h3><p class="products-summary">Released local quadcopters begin with FPV, assisted sensing, and GNSS-denied local operation near the objective, then progress toward autonomous scout behavior as the mission software and field validation mature.</p>' +
              '<ul class="products-capabilities"><li>FPV / assisted operation</li><li>GNSS-denied local operation</li><li>Mapping and sensing</li><li>Autonomous scout path</li></ul>' +
            '</div>' +
          '</article>' +
          '<article class="products-panel" id="product-panel-software" data-product-panel="3" role="tabpanel" aria-labelledby="product-tab-software" aria-hidden="true" hidden>' +
            '<figure class="products-media"><img src="assets/images/kubeca/products/mission-software.png" alt="Mission software interface coordinating supervised autonomous assets" loading="lazy"></figure>' +
            '<div class="products-panel-copy"><p class="products-position">The coordination layer.</p><h3>Mission Software</h3><p class="products-summary">Mission software converts carrier state, local drone feeds, maps, telemetry, and operator decisions into one supervised mission picture.</p>' +
              '<ul class="products-capabilities"><li>Asset tracking</li><li>Feed fusion</li><li>Mission context</li><li>Human supervision</li></ul>' +
            '</div>' +
          '</article>' +
        '</div>' +
        '<div class="products-tabs" role="tablist" aria-label="Select product view">' +
          '<button class="products-tab is-active" id="product-tab-carrier" type="button" role="tab" data-product-tab="0" aria-controls="product-panel-carrier" aria-selected="true"><small>01</small><span>Carrier Platform</span></button>' +
          '<button class="products-tab" id="product-tab-modules" type="button" role="tab" data-product-tab="1" aria-controls="product-panel-modules" aria-selected="false" tabindex="-1"><small>02</small><span>Mission Modules</span></button>' +
          '<button class="products-tab" id="product-tab-drones" type="button" role="tab" data-product-tab="2" aria-controls="product-panel-drones" aria-selected="false" tabindex="-1"><small>03</small><span>Local Drone Teams</span></button>' +
          '<button class="products-tab" id="product-tab-software" type="button" role="tab" data-product-tab="3" aria-controls="product-panel-software" aria-selected="false" tabindex="-1"><small>04</small><span>Mission Software</span></button>' +
        '</div>' +
      '</section>' +
      '<section class="products-future-assets" aria-label="Future connected assets">' +
        '<p class="products-future-label">FUTURE CONNECTED ASSETS</p>' +
        '<p class="products-future-copy">Technical materials are available on request for deeper architecture, validation, and integration detail.</p>' +
        '<p class="products-future-thesis">Carrier and local quadcopters are today’s validation stack. The enduring platform is the mission-intelligence layer coordinating future assets across multiple domains.</p>' +
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
          '<p class="market-impact-kicker">06</p>' +
          '<h2>BEACHHEAD +<br>EXPANSION</h2>' +
        '</div>' +
        '<div class="market-impact-copy">' +
          '<p>KUBECA focuses on missions where coordination changes outcomes: operations requiring reach, local sensing, and supervised autonomy under degraded conditions.</p>' +
        '</div>' +
      '</header>' +
      '<section class="market-impact-tiles" aria-label="High-need markets">' +
        '<article class="market-impact-tile market-impact-tile--focus" data-deck-section="market-deep-recon"><figure class="market-impact-media"><img src="assets/images/kubeca/markets/defense-tactical-isr.png" alt="A field operator supervising a reconnaissance aircraft in remote terrain" loading="lazy"></figure><div class="market-impact-body"><p class="market-impact-tag">BEACHHEAD</p><div><small>01</small><h3>DEFENSE / TACTICAL ISR</h3></div><p class="market-impact-simple">Carrier reach, local sensing, relay support, and supervised situational awareness in GNSS-denied or high-risk environments.</p></div></article>' +
        '<article class="market-impact-tile" data-deck-section="market-indoor-urban"><figure class="market-impact-media"><img src="assets/images/kubeca/markets/disaster-response-search.png" alt="Rescue responders supervising drones during a waterside search operation" loading="lazy"></figure><div class="market-impact-body"><p class="market-impact-tag">ADJACENT MARKETS</p><div><small>02</small><h3>DISASTER RESPONSE /<br>SEARCH OPERATIONS</h3></div><p class="market-impact-simple">Disaster response, search operations, infrastructure security, border monitoring, maritime inspection, and ground robotics share the same coordination problem.</p></div></article>' +
        '<article class="market-impact-tile" data-deck-section="market-distributed-isr"><figure class="market-impact-media"><img src="assets/images/kubeca/markets/critical-infrastructure-security.png" alt="An infrastructure inspector supervising a drone beneath a bridge" loading="lazy"></figure><div class="market-impact-body"><p class="market-impact-tag">PLATFORM EXPANSION</p><div><small>03</small><h3>PLATFORM EXPANSION</h3></div><p class="market-impact-simple">The long-term opportunity is not one drone category - it is the mission layer coordinating autonomous assets across air, ground, maritime systems, sensors, and operators.</p></div></article>' +
      '</section>' +
      '<section class="market-impact-focus" aria-label="Market focus">' +
        '<p class="market-impact-statement">WHY THESE MARKETS FIRST?</p>' +
        '<div><small>CORE THESIS</small><p>KUBECA targets coordination-critical operations first, then scales with the same mission layer.</p></div>' +
        '<div><small>PLATFORM LOGIC</small><p>One supervised coordination layer across missions and asset types.</p></div>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'FIELD VALIDATION' || group.heading === 'TEAM / VALIDATION') {
    return '<section class="chapter-page chapter-page-validation validation-proof-layout">' +
      '<section class="validation-proof-stage">' +
        '<img class="validation-proof-media" src="assets/images/kubeca/validation/fabric.png" alt="Carrier aircraft integration facility" loading="lazy" onload="this.closest(\'.validation-proof-stage\').classList.add(\'has-media\')" onerror="this.remove()">' +
        '<header class="validation-proof-hero">' +
          '<div class="validation-proof-overlay">' +
            '<p class="validation-proof-kicker">12</p>' +
            '<h2>WHY THIS TEAM CAN<br>EXECUTE</h2>' +
            '<div class="validation-proof-lead">' +
              '<p>The team has already worked across the core risks KUBECA needs to solve: hardware, flight integration, autonomy software, and field feedback.</p>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<section class="validation-proof-rows" aria-label="Verified development experience">' +
          '<article data-deck-section="validation-real-system-development"><small></small><div class="validation-proof-copy"><em></em><h3>Technical Execution</h3><p>Hardware design, component sizing, sensor integration, flight-stack integration, payload systems, mission-ready UAS integration, autonomy software, reinforcement learning, testing, and field iteration.</p></div></article>' +
          '<article><small></small><div class="validation-proof-copy"><em></em><h3>Autonomy + GNSS-Denied Experience</h3><p>Development work in a SPRIND autonomous systems challenge involving SLAM, local mapping, GNSS-denied navigation, spatial understanding, autonomy-stack integration, and drone-swarm architecture.</p></div></article>' +
          '<article><small></small><div class="validation-proof-copy"><em></em><h3>Field + Defense Ecosystem Exposure</h3><p>Documented work with systems deployed in Ukraine, systems presented and flight-tested at the NATO Mountain Warfare Centre of Excellence, tactical drone deployment presentation with Challenge Coin awarded, Bundeswehr-related working groups, German Army capability-development discussions, industry collaboration, trade fair representation, and operator feedback.</p></div></article>' +
        '</section>' +
      '</section>' +
      '<section class="validation-method-band" aria-label="How KUBECA builds">' +
        '<div class="validation-method-title"><small>HOW WE BUILD</small><h3>BUILD EARLY. TEST IN THE FIELD.<br>ITERATE FROM OPERATOR FEEDBACK.</h3></div>' +
        '<div class="validation-method-copy"><p>Proven hardware development, autonomy software, and operational feedback are applied through usable prototypes, real constraints, and fast hardware-software iteration.</p><strong>THE NEXT STEP IS THE FIRST INTEGRATED KUBECA MISSION-SYSTEM DEMONSTRATION.</strong></div>' +
      '</section>' +
    '</section>';
  }

  if (group.heading === 'INVESTOR ROADMAP' || group.heading === 'CAPITAL STAGED AROUND RISK REDUCTION') {
    return '<section class="chapter-page chapter-page-finance finance-roadmap-layout">' +
      '<header class="finance-intro">' +
        '<div>' +
          '<p class="finance-kicker">06 / CAPITAL STAGED AROUND RISK REDUCTION</p>' +
          '<h2>Capital staged<br>around risk reduction.</h2>' +
        '</div>' +
        '<p class="finance-lead">KUBECA is preparing an indicative &euro;5&ndash;8M Pre-Seed / Integrated Prototype round with 18-24 months runway to validate the first carrier-enabled mission-layer MVP.</p>' +
      '</header>' +
      '<section class="finance-phase-cards" aria-label="Capital roadmap">' +
        '<article>' +
          '<div class="finance-phase-card-top"><span class="finance-phase">01</span><strong>Pre-Seed / Integrated Prototype</strong></div>' +
          '<div class="finance-raise">&euro;5&ndash;8M</div>' +
          '<dl><div><dt>Goal</dt><dd>Carrier-enabled GNSS-denied deployment: carrier reach, quadcopter release, local operation, and supervised handover.</dd></div><div><dt>Risk Reduced</dt><dd>Technical integration risk + mission-layer execution risk</dd></div></dl>' +
        '</article>' +
        '<article>' +
          '<div class="finance-phase-card-top"><span class="finance-phase">02</span><strong>Seed / Pilot Systems</strong></div>' +
          '<div class="finance-raise">&euro;8&ndash;15M</div>' +
          '<dl><div><dt>Goal</dt><dd>Local drone intelligence, mapping, mission-state reporting, and early supervised coordination.</dd></div><div><dt>Risk Reduced</dt><dd>Autonomy and software risk</dd></div></dl>' +
        '</article>' +
        '<article>' +
          '<div class="finance-phase-card-top"><span class="finance-phase">03</span><strong>Series A / Regulated Scale</strong></div>' +
          '<div class="finance-raise">&euro;25&ndash;50M</div>' +
          '<dl><div><dt>Goal</dt><dd>Regulated supervised autonomous mission operations, multi-agent coordination, and platform scalability.</dd></div><div><dt>Risk Reduced</dt><dd>Scale, certification, and platform risk</dd></div></dl>' +
        '</article>' +
      '</section>' +
      '<section class="finance-snapshot finance-snapshot-compact" aria-label="Current round snapshot">' +
        '<h3>CURRENT ROUND SNAPSHOT</h3>' +
        '<dl>' +
          '<div><dt>Target Range</dt><dd class="finance-raise">Indicative &euro;5&ndash;8M</dd></div>' +
          '<div><dt>Runway</dt><dd>18-24 months</dd></div>' +
          '<div><dt>Primary Proof Point</dt><dd>Integrated flight-tested carrier-to-quadcopter handover</dd></div>' +
          '<div><dt>Main Use of Funds</dt><dd>Carrier integration, release mechanism, GNSS-denied local drone operation, relay/control workflow, software, testing, documentation</dd></div>' +
          '<div><dt>Main Risk Reduced</dt><dd>Technical integration risk + mission-layer execution risk</dd></div>' +
        '</dl>' +
      '</section>' +
      '<p class="finance-conclusion">KUBECA validates carrier-enabled deployment, matures local drones into supervised intelligent agents, and scales toward a regulated multi-agent mission-intelligence platform.</p>' +
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
        '<p class="investor-contact-kicker">07 / CONTACT</p>' +
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

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
  'HOW A MISSION WORKS': { number: '03', className: 'works', label: 'HOW A MISSION WORKS' },
  'HOW IT WORKS': { number: '03', className: 'works', label: 'HOW A MISSION WORKS' },
  'WHAT IT ENABLES': { number: '04', className: 'enables', label: 'WHAT IT ENABLES' },
  'WHERE KUBECA CREATES VALUE': { number: '05', className: 'market', label: 'WHERE KUBECA CREATES VALUE' },
  'MARKET AREAS': { number: '05', className: 'market', label: 'WHERE KUBECA CREATES VALUE' },
  'FIELD VALIDATION': { number: '06', className: 'team', label: 'FIELD VALIDATION' },
  'TEAM / VALIDATION': { number: '06', className: 'team', label: 'FIELD VALIDATION' },
  'ROADMAP': { number: '07', className: 'roadmap', label: 'ROADMAP' },
  'CTA': { number: '08', className: 'cta', label: 'CTA' }
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
    '<a href="mailto:contact@kubeca.com?subject=KUBECA%20Investor%20Access">Request investor access <span>-></span></a>' +
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
          '<h2>THE MISSION BREAKS<br>WHEN AERIAL ASSETS<br>CANNOT EVOLVE INTO<br>ONE AUTONOMOUS SYSTEM.</h2>' +
          '<div class="why-repair-rule"></div>' +
        '</div>' +
        '<div class="why-repair-copy">' +
          '<p>Small drones provide local detail, but lack reach. Carrier platforms provide distance, but not autonomous coordination. Operators are left connecting feeds, maps, telemetry, and decisions under pressure.</p>' +
          '<p><strong>The bottleneck is not more drones.<br><span>The bottleneck is the missing system layer between carrier, drones, software, and autonomy.</span></strong></p>' +
        '</div>' +
      '</section>' +
      '<section class="why-repair-cards">' +
        '<article><div class="why-repair-card-head"><div class="why-repair-index">01</div><i class="why-repair-icon why-icon-crosshair"></i></div><h4>LIMITED REACH</h4><p>Small drones create valuable local intelligence, but lose endurance, payload, and connectivity far from the operator.</p><figure><img src="assets/images/kubeca/why-matters/limited-reach.png" alt="" aria-hidden="true"></figure></article>' +
        '<article><div class="why-repair-card-head"><div class="why-repair-index">02</div><i class="why-repair-icon why-icon-layers"></i></div><h4>FRAGMENTED CONTROL</h4><p>Carrier systems, drone feeds, maps, telemetry, and decisions remain separated across tools, increasing operator workload.</p><figure><img src="assets/images/kubeca/why-matters/fragmented-control.png" alt="" aria-hidden="true"></figure></article>' +
        '<article><div class="why-repair-card-head"><div class="why-repair-index">03</div><i class="why-repair-icon why-icon-signal"></i></div><h4>BROKEN CONTINUITY</h4><p>Terrain, buildings, RF disruption, and degraded infrastructure break the mission picture between assets and operators.</p><figure><img src="assets/images/kubeca/why-matters/broken-continuity.png" alt="" aria-hidden="true"></figure></article>' +
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
        '<h2>FROM CARRIER PLATFORM TO HUMAN-SUPERVISED AUTONOMOUS MISSION SYSTEMS.</h2>' +
        '<p class="system-showcase-copy">KUBECA combines long-range carrier deployment, local drone teams, mission intelligence, and human oversight into one coordinated mission system. The key difference is not a single drone, but the system layer that keeps reach, local understanding, and operator control connected throughout the mission.</p>' +
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
      '<section class="system-future-assets" aria-label="Future connected assets">' +
        '<p class="system-future-label">FUTURE CONNECTED ASSETS</p>' +
        '<p class="system-future-copy">The mission intelligence layer is designed to connect additional autonomous assets over time. Future ground robots can extend local sensing, indoor exploration, rubble access, relay coverage, and perimeter missions within the same supervised system.</p>' +
        '<p class="system-future-thesis">The carrier and local drones are the first configuration. The platform is the mission intelligence layer that can coordinate future assets across air and ground.</p>' +
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
    return renderStandardChapterPage(group, {
      className: 'market',
      layout: 'cards',
      title: 'BUILT FOR MISSIONS WHERE<br>RANGE, ACCESS, AND UNDERSTANDING<br>DETERMINE OUTCOMES.',
      lead: 'KUBECA is built for environments where teams need spatial intelligence from places that are distant, enclosed, degraded, or unsafe to enter.',
      extra: '<section class="degraded-band"><small>BUILT FOR DEGRADED CONDITIONS</small><p>GPS, RF links, terrain, buildings, and infrastructure cannot always be assumed reliable. KUBECA is designed around mission continuity from the start.</p></section>',
      includeBottomLine: false,
      bottomLineOne: '',
      bottomLineTwo: ''
    });
  }

  if (group.heading === 'FIELD VALIDATION' || group.heading === 'TEAM / VALIDATION') {
    return renderStandardChapterPage(group, {
      className: 'team',
      layout: 'proof',
      title: 'BUILT FROM REAL SYSTEM DEVELOPMENT.<br>TESTED IN REAL CONDITIONS.',
      lead: 'KUBECA is built from hands-on experience across drone platform development, autonomy software, field testing, operator feedback, and defense-relevant constraints.',
      bottomLineOne: 'KUBECA IS NOT BUILT FROM THEORY.',
      bottomLineTwo: 'IT IS BUILT FROM HARDWARE DEVELOPMENT, SOFTWARE INTEGRATION, FIELD TESTING, AND OPERATOR FEEDBACK.'
    });
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

  if (group.heading === 'CTA') {
    return renderStandardChapterPage(group, {
      className: 'cta',
      layout: 'cta',
      title: 'BUILD THE FUTURE OF<br>AUTONOMOUS AERIAL INTELLIGENCE.',
      lead: 'KUBECA is creating the mission intelligence layer that enables decentralized aerial systems to understand, decide, and act while humans remain in control. Not isolated drones. Coordinated mission systems.',
      extra: renderCtaActions(),
      bottomLineOne: 'MISSION INTELLIGENCE.',
      bottomLineTwo: 'AT RANGE. AT SCALE.'
    });
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

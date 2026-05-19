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
  'WHO WE ARE': { number: '00', className: 'who', label: 'WHO WE ARE' },
  'WHY THIS MATTERS': { number: '01', className: 'why', label: 'WHY THIS MATTERS' },
  'WHY NOW': { number: '02', className: 'now', label: 'WHY NOW' },
  'WHAT WE BUILD': { number: '03', className: 'build', label: 'WHAT WE BUILD' },
  'HOW IT WORKS': { number: '04', className: 'works', label: 'HOW IT WORKS' },
  'WHAT IT ENABLES': { number: '05', className: 'enables', label: 'WHAT IT ENABLES' },
  'WHY WE WIN': { number: '06', className: 'win', label: 'WHY WE WIN' },
  'MARKET AREAS': { number: '07', className: 'market', label: 'MARKET AREAS' },
  'TEAM / VALIDATION': { number: '08', className: 'team', label: 'TEAM / VALIDATION' },
  'CTA': { number: '09', className: 'cta', label: 'CTA' }
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
    renderChapterBottom(options.className, 'BOTTOM LINE', options.bottomLineOne, options.bottomLineTwo) +
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
    '<a href="mailto:contact@kubeca.com?subject=KUBECA%20Mission%20Brief">Request mission brief <span>-></span></a>' +
    '<a href="mailto:contact@kubeca.com?subject=KUBECA%20Partnership">Partner with us <span>-></span></a>' +
  '</section>';
}

function renderDeckChapter(deckId) {
  var group = getDeckGroup(deckId);
  if (group.heading === 'WHO WE ARE') {
    return '<section class="chapter-page chapter-page-who who-page-layout">' +
      renderChapterHeader(group.heading) +
      renderImageChapterHero(group.heading, {
        heroClass: 'who-hero',
        mediaClass: 'who-hero-image',
        copyClass: 'who-hero-text',
        sideClass: 'who-hero-side',
        ruleClass: 'who-blue-line',
        title: 'AUTONOMOUS<br>AERIAL INTELLIGENCE<br>FOR SYSTEM-LEVEL<br>OPERATIONS',
        lead: 'KUBECA builds mission intelligence for autonomous aerial systems - connecting long-range platforms, quadcopters, micro-drones, shared maps, and human-in-the-loop control into one coordinated operational layer.',
        imageSrc: 'assets/images/kubeca/kubecaquadcopter.png',
        imageAlt: 'KUBECA quadcopter systems in hangar'
      }) +
      '<section class="who-two-column">' +
        '<article class="who-text-block">' +
          '<p class="who-eyebrow">FOUNDER THESIS</p><div class="who-small-line"></div>' +
          '<h3>THE NEXT ADVANTAGE IS NOT THE DRONE.<br>IT IS THE INTELLIGENCE THAT CONNECTS THE SYSTEM.</h3>' +
          '<div class="who-blue-line who-blue-line-small"></div>' +
          '<p>As aerial platforms become cheaper and more numerous, the decisive layer shifts from hardware to software: autonomy, resilient navigation, spatial understanding, and coordinated mission execution.</p>' +
        '</article>' +
        '<article class="who-text-block who-text-block-right">' +
          '<p class="who-eyebrow">COMPANY VISION</p><div class="who-small-line"></div>' +
          '<h3>THE AERIAL INTELLIGENCE LAYER<br>FOR AUTONOMOUS OPERATIONS.</h3>' +
          '<p>KUBECA aims to turn drones from remote-controlled tools into connected mission assets - able to map, relay, coordinate, and operate as one distributed system across open and enclosed terrain.</p>' +
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
            '<div class="who-mission-item"><div class="who-icon"><img src="' + iconPath('kubeca-see.svg') + '" alt="" aria-hidden="true"></div><h4>SEE</h4><p>Real-time intelligence from complex terrain.</p></div>' +
            '<div class="who-mission-item"><div class="who-icon"><img src="' + iconPath('kubeca-map.svg') + '" alt="" aria-hidden="true"></div><h4>MAP</h4><p>Shared spatial awareness across the swarm.</p></div>' +
            '<div class="who-mission-item"><div class="who-icon"><img src="' + iconPath('kubeca-coordinate.svg') + '" alt="" aria-hidden="true"></div><h4>RELAY</h4><p>Communication through distributed aerial nodes.</p></div>' +
            '<div class="who-mission-item"><div class="who-icon"><img src="' + iconPath('kubeca-act.svg') + '" alt="" aria-hidden="true"></div><h4>DECIDE</h4><p>Operator-guided mission control.</p></div>' +
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
      renderChapterFooter('who') +
    '</section>';
  }

  if (group.heading === 'WHY THIS MATTERS') {
    return '<section class="chapter-page chapter-page-why why-reference-layout">' +
      renderChapterHeader(group.heading) +
      '<section class="why-ref-intro">' +
        '<div class="why-ref-title">' +
          '<h2>THE MISSION<br>BREAKS WHEN<br>DRONES CANNOT<br>WORK TOGETHER.</h2>' +
          '<div class="why-ref-rule"></div>' +
        '</div>' +
        '<div class="why-ref-copy">' +
          '<p><strong>Current drone operations still depend on isolated assets, manual coordination, fragile links, and fragmented mission data.</strong></p>' +
          '<p>Small drones are limited by reach, endurance, and connectivity. Long-range platforms extend distance, but do not automatically create shared mission understanding.</p>' +
          '<p>When missions become contested, enclosed, or fast-changing, the limitation is no longer the drone alone. It is the missing system around it.</p>' +
        '</div>' +
      '</section>' +
      '<section class="why-ref-model" aria-label="Disconnected mission model">' +
        '<h3>DISCONNECTED MISSION MODEL</h3>' +
        '<div class="why-ref-model-grid">' +
          '<article><img src="air-drone-icon.svg" alt="" aria-hidden="true"><h4>LOCAL DRONES</h4><p>Limited reach, payload, battery life, and signal range constrain the mission area.</p></article>' +
          '<article><img src="plane-icon.svg" alt="" aria-hidden="true"><h4>LONG-RANGE PLATFORM</h4><p>Extended reach, but no automatic access to local detail or indoor spaces.</p></article>' +
          '<article><img src="silhouette-male-icon.svg" alt="" aria-hidden="true"><h4>OPERATOR</h4><p>Manual coordination across multiple tools and feeds creates high cognitive load.</p></article>' +
          '<article><img src="stack-icon.svg" alt="" aria-hidden="true"><h4>MISSION DATA</h4><p>Maps, video, signals, and telemetry remain fragmented across different systems.</p></article>' +
        '</div>' +
        '<div class="why-ref-connectors" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
        '<div class="why-ref-result">' +
          '<img src="' + iconPath('kubeca-menu-delayed-decisions.svg') + '" alt="" aria-hidden="true">' +
          '<div><strong>MISSION CONTINUITY BREAKS</strong><p>Gaps in reach. Gaps in information. Gaps in coordination. The mission loses time, context, and momentum.</p></div>' +
        '</div>' +
      '</section>' +
      '<section class="why-ref-issues">' +
        '<article><div class="why-ref-index">01</div><figure><img src="image1.png" alt="" aria-hidden="true"></figure><h4>LIMITED REACH</h4><p>Small drones are useful close to the mission area, but battery life, payload, and signal range limit how far they can operate from the user.</p><span><img src="air-drone-icon.svg" alt="" aria-hidden="true"></span></article>' +
        '<article><div class="why-ref-index">02</div><figure><img src="image2.png" alt="" aria-hidden="true"></figure><h4>FRAGMENTED CONTROL</h4><p>Drones, maps, video feeds, navigation, and operator decisions often remain separate. The mission depends on humans manually connecting the dots under pressure.</p><span><img src="silhouette-male-icon.svg" alt="" aria-hidden="true"></span></article>' +
        '<article><div class="why-ref-index">03</div><figure><img src="image3.png" alt="" aria-hidden="true"></figure><h4>BROKEN CONTINUITY</h4><p>GPS loss, RF disruption, terrain, buildings, and walls can break the link between assets, operators, and mission context.</p><span><img src="' + iconPath('kubeca-menu-rf-link.svg') + '" alt="" aria-hidden="true"></span></article>' +
      '</section>' +
      '<section class="why-ref-bottom">' +
        '<div><small>BOTTOM LINE</small><p>THE PROBLEM IS NOT ONLY BETTER DRONES.<br><span>THE PROBLEM IS MAKING AERIAL ASSETS<br>WORK AS ONE MISSION SYSTEM.</span></p></div>' +
        '<figure aria-hidden="true"><img src="' + iconPath('kubeca-control-loop.svg') + '" alt=""></figure>' +
      '</section>' +
      renderChapterFooter('why') +
    '</section>';
  }

  if (group.heading === 'WHY NOW') {
    return '<section class="chapter-page chapter-page-now now-page-layout">' +
      renderChapterHeader(group.heading) +
      renderImageChapterHero(group.heading, {
        heroClass: 'now-hero',
        mediaClass: 'now-hero-image',
        copyClass: 'now-hero-copy',
        sideClass: 'now-hero-side',
        ruleClass: 'now-small-line',
        title: 'AERIAL AUTONOMY<br>IS MOVING FROM<br>TOOLS TO SYSTEMS.',
        paragraphs: [
          'Drone operations are scaling while environments become more contested, complex, and infrastructure-dependent.',
          'The shift is no longer about better individual drones.',
          'It is about connecting range, local intelligence, resilient navigation, and operators into one coordinated system.'
        ],
        imageSrc: 'assets/images/kubeca/commando.png',
        imageAlt: 'KUBECA mission control operations room'
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
          '<article><img src="' + whyNowIconPath('longer_mission_distance.svg') + '" alt="" aria-hidden="true"><p>Longer mission distance</p></article><span class="now-shift-arrow">-></span><article><p>Relay and carrier architectures</p><img src="' + whyNowIconPath('relay_carrier_architectures.svg') + '" alt="" aria-hidden="true"></article>' +
          '<article><img src="' + whyNowIconPath('faster_decision_cycles.svg') + '" alt="" aria-hidden="true"><p>Faster decision cycles</p></article><span class="now-shift-arrow">-></span><article><p>Mission intelligence layer</p><img src="' + whyNowIconPath('mission_intelligence_layer.svg') + '" alt="" aria-hidden="true"></article>' +
        '</div>' +
      '</section>' +
      '<section class="now-drivers">' +
        '<h3>THREE TIMING DRIVERS</h3>' +
        '<div class="now-driver-grid">' +
          '<article><strong>01</strong><img src="' + whyNowIconPath('more_aerial_assets.svg') + '" alt="" aria-hidden="true"><h4>DRONE SCALE IS<br>ACCELERATING</h4><p>More aerial assets are entering operations. Coordination is becoming the bottleneck.</p></article>' +
          '<article><strong>02</strong><img src="' + iconPath('kubeca-menu-rf-link.svg') + '" alt="" aria-hidden="true"><h4>INFRASTRUCTURE IS<br>LESS RELIABLE</h4><p>GPS, RF, terrain, buildings, and EW degrade mission continuity.</p></article>' +
          '<article><strong>03</strong><img src="' + whyNowIconPath('mission_intelligence_layer.svg') + '" alt="" aria-hidden="true"><h4>MISSIONS ARE<br>BECOMING MULTI-LAYERED</h4><p>Open terrain, enclosed spaces, long range, and local mapping must work together.</p></article>' +
        '</div>' +
      '</section>' +
      renderChapterBottom('now', 'BOTTOM LINE', 'THE TIMING IS NOT ABOUT DRONES ALONE.', 'IT IS ABOUT AUTONOMY BECOMING A SYSTEM LAYER.') +
      renderChapterFooter('now') +
    '</section>';
  }

  if (group.heading === 'WHAT WE BUILD') {
    return '<section class="chapter-page chapter-page-build build-page-layout">' +
      renderChapterHeader(group.heading) +
      renderImageChapterHero(group.heading, {
        heroClass: 'build-hero',
        mediaClass: 'build-hero-image',
        copyClass: 'build-hero-copy',
        sideClass: 'build-hero-side',
        ruleClass: 'build-rule',
        title: 'THE KUBECA<br>SYSTEM',
        paragraphs: [
          'KUBECA connects long-range carrier drones, local drone teams, shared spatial data, and human oversight into one coordinated operating system.',
          'The carrier extends reach and acts as the relay.',
          'The software layer fuses data and coordinates action.'
        ],
        imageSrc: 'assets/images/kubeca/kubeca-system-multi.png',
        imageAlt: 'KUBECA coordinated aerial system architecture',
        fallbackClass: 'is-missing-image'
      }) +
      '<section class="build-system">' +
        '<div class="build-stack" aria-label="KUBECA system layers">' +
          '<article class="build-layer build-layer-light">' +
            '<span>01</span><div><h3>CARRIER / RELAY LAYER</h3><p>Extends reach, moves local teams into position, and maintains the secure data bridge back to the operator.</p></div>' +
            '<div class="build-visual carrier-visual"><i></i><i></i><em></em></div>' +
          '</article>' +
          '<div class="build-down"></div>' +
          '<article class="build-layer build-layer-light">' +
            '<span>02</span><div><h3>LOCAL DRONE TEAMS</h3><p>Operate close to the mission area for reconnaissance, mapping, detection, relay, and local execution.</p></div>' +
            '<div class="build-visual drone-team-visual"><i></i><i></i><i></i><em></em></div>' +
          '</article>' +
          '<div class="build-down"></div>' +
          '<article class="build-layer build-layer-core">' +
            '<span>03</span><div><h3>MISSION INTELLIGENCE LAYER</h3><p>Fuses live sensor feeds, map context, asset status, and mission objectives into coordinated actions.</p></div>' +
            '<div class="build-core-mark"><img src="' + whyNowIconPath('mission_intelligence_layer.svg') + '" alt="" aria-hidden="true"></div>' +
            '<div class="build-core-capabilities">' +
              '<span><img src="' + iconPath('kubeca-navigate.svg') + '" alt="" aria-hidden="true">Resilient Navigation</span>' +
              '<span><img src="' + iconPath('kubeca-map.svg') + '" alt="" aria-hidden="true">Mapping & Context</span>' +
              '<span><img src="' + iconPath('kubeca-coordinate.svg') + '" alt="" aria-hidden="true">Coordination</span>' +
              '<span><img src="' + iconPath('kubeca-detect.svg') + '" alt="" aria-hidden="true">Mission Logic</span>' +
            '</div>' +
          '</article>' +
          '<div class="build-down"></div>' +
          '<article class="build-layer build-layer-light">' +
            '<span>04</span><div><h3>SHARED SPATIAL DATA</h3><p>Creates one persistent operational picture across terrain, infrastructure, assets, and updates.</p></div>' +
            '<div class="build-visual map-visual"><i></i><i></i><i></i></div>' +
          '</article>' +
          '<div class="build-down"></div>' +
          '<article class="build-layer build-layer-light">' +
            '<span>05</span><div><h3>HUMAN-IN-THE-LOOP CONTROL</h3><p>Operators plan, confirm, supervise, and intervene while the system handles coordination.</p></div>' +
            '<div class="build-visual control-visual"><i></i><i></i><i></i></div>' +
          '</article>' +
        '</div>' +
      '</section>' +
      renderChapterBottom('build', 'BOTTOM LINE', 'KUBECA IS NOT BUILDING ANOTHER DRONE.', 'KUBECA IS BUILDING THE MISSION LAYER<br>THAT MAKES DRONES WORK TOGETHER.') +
      renderChapterFooter('build') +
    '</section>';
  }

  if (group.heading === 'HOW IT WORKS') {
    return renderStandardChapterPage(group, {
      className: 'works',
      layout: 'flow',
      title: 'FROM RANGE TO<br>LOCAL INTELLIGENCE.',
      lead: 'The KUBECA mission sequence is simple: deploy local drone teams at range, keep the relay alive, explore and map the area, fuse what matters, and keep operators in control.',
      extra: renderHowItWorksGraphic(),
      bottomLineOne: 'THE SYSTEM IS NOT ONLY A SET OF ASSETS.',
      bottomLineTwo: 'IT IS A MISSION FLOW FROM RANGE TO CONTROL.'
    });
  }

  if (group.heading === 'WHAT IT ENABLES') {
    return renderStandardChapterPage(group, {
      className: 'enables',
      layout: 'cards',
      title: 'LOCAL INTELLIGENCE<br>DELIVERED AT RANGE.',
      lead: 'KUBECA turns system architecture into operational outcomes: reach, shared awareness, reduced workload, safer standoff, and faster decisions.',
      bottomLineOne: 'THE VALUE IS NOT MORE VIDEO.',
      bottomLineTwo: 'THE VALUE IS STRUCTURED LOCAL INTELLIGENCE.'
    });
  }

  if (group.heading === 'WHY WE WIN') {
    return renderStandardChapterPage(group, {
      className: 'win',
      layout: 'stack',
      title: 'SOFTWARE ACROSS<br>THE MISSION STACK.',
      lead: 'The defensibility sits across carrier autonomy, local drone autonomy, mission intelligence, and the operator interface. Each layer compounds the value of the others.',
      bottomLineOne: 'THE MOAT IS NOT ONE ALGORITHM.',
      bottomLineTwo: 'IT IS SOFTWARE ACROSS THE FULL MISSION STACK.'
    });
  }

  if (group.heading === 'MARKET AREAS') {
    return renderStandardChapterPage(group, {
      className: 'market',
      layout: 'cards',
      title: 'WHERE KUBECA<br>CREATES VALUE.',
      lead: 'KUBECA is built for missions where range, signal reliability, local intelligence, and operator workload become limiting factors.',
      bottomLineOne: 'THE BEACHHEAD IS WHERE DRONE OPERATIONS BREAK.',
      bottomLineTwo: 'RANGE, SIGNALS, LOCAL INTELLIGENCE, AND WORKLOAD.'
    });
  }

  if (group.heading === 'TEAM / VALIDATION') {
    return renderStandardChapterPage(group, {
      className: 'team',
      layout: 'proof',
      title: 'BUILT BY PRACTICAL<br>DRONE AND AUTONOMY DEVELOPERS.',
      lead: 'The team story should be credible and grounded: practical drone development, flight testing, operator feedback, autonomy foundations, and software validation.',
      bottomLineOne: 'KUBECA IS BUILT FROM FIELD CONSTRAINTS.',
      bottomLineTwo: 'NOT FROM THEORETICAL AUTONOMY ALONE.'
    });
  }

  if (group.heading === 'CTA') {
    return renderStandardChapterPage(group, {
      className: 'cta',
      layout: 'cta',
      title: 'BUILD THE MISSION LAYER<br>FOR COORDINATED AERIAL AUTONOMY.',
      lead: 'We are looking for partners, operators, and investors who understand that the next leap in aerial autonomy is not only better drones - it is coordinated systems.',
      extra: renderCtaActions(),
      bottomLineOne: 'PARTNER WITH KUBECA.',
      bottomLineTwo: 'REQUEST A MISSION BRIEF.'
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

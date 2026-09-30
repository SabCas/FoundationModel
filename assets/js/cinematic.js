'use strict';

// Progressive enhancement: all chapters and links work without JavaScript.
(() => {
  const images = Array.from(document.querySelectorAll('.film-image, .cinematic-home .hero > img, .tech-hero-image'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 761px) and (min-height: 601px)');
  let frame = 0;

  function render() {
    frame = 0;
    const enabled = !motion.matches && desktop.matches;
    images.forEach((image) => {
      if (!enabled) {
        image.style.removeProperty('transform');
        return;
      }
      const scene = image.closest('.film-chapter, .hero, .tech-hero');
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      image.style.transform = `scale(${1.04 + progress * 0.045}) translateY(${(progress - 0.5) * 2}%)`;
    });
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  desktop.addEventListener('change', schedule);
  schedule();
})();

// A 10-second concept sequence; the unenhanced markup is its static final frame.
(() => {
  const film = document.querySelector('[data-mission-film]');
  if (!film) return;
  const staticView = window.matchMedia('(prefers-reduced-motion: reduce)');
  const get = (name) => film.querySelector(`.mission-${name}`);
  const button = get('toggle');
  const duration = 10000;
  let elapsed = 0;
  let previous = null;
  let frame = 0;
  let playing = false;
  let visible = false;
  let started = false;

  // Continuous curves keep position and heading smooth; releases follow the moving carrier.
  const clamp = (n) => Math.max(0, Math.min(1, n));
  const mix = (a, b, t) => a.map((value, i) => value + (b[i] - value) * t);
  function carrier(time) {
    const t = time / 1000;
    return { point: [160 + 70 * t, 245 - 65 * Math.sin(Math.PI * t / 16)],
      angle: Math.atan2(-65 * Math.PI / 16 * Math.cos(Math.PI * t / 16), 70) * 180 / Math.PI + 90 };
  }
  const destinations = [[750, 225], [875, 285], [755, 355], [650, 295]];
  const bends = [[620, 130], [820, 150], [610, 405], [570, 320]];
  const routes = destinations.map((end, index) => {
    const release = 2400 + index * 300;
    const start = carrier(release).point;
    return { release, points: [start, [start[0] + 135, start[1] - 22], bends[index], end] };
  });
  function curve(points, t) {
    const a = mix(points[0], points[1], t);
    const b = mix(points[1], points[2], t);
    const c = mix(points[2], points[3], t);
    const d = mix(a, b, t), e = mix(b, c, t);
    const point = mix(d, e, t);
    return { point, angle: Math.atan2(e[1] - d[1], e[0] - d[0]) * 180 / Math.PI + 90,
      trail: `M${points[0].join(' ')} C${a.join(' ')} ${d.join(' ')} ${point.join(' ')}` };
  }
  function draw(time) {
    const scene = time < 2200 ? 0 : time < 4200 ? 1 : time < 7800 ? 2 : 3;
    get('title').textContent = ['Reach further.', 'Deploy local autonomy.', 'Explore the surroundings.', 'One mission. Human supervision.'][scene];
    get('step').textContent = ['01 / Reach', '02 / Release', '03 / Explore', '04 / Coordinate'][scene];
    const detectionOpacity = String(clamp((time - 7200) / 600));
    get('route').style.opacity = '.45';
    get('c2').style.opacity = '1';
    get('detection-status').style.opacity = detectionOpacity;
    get('detection').style.opacity = detectionOpacity;
    const aircraft = carrier(time);
    get('aircraft').setAttribute('transform', `translate(${aircraft.point.join(' ')}) rotate(${aircraft.angle})`);
    routes.forEach(({ points, release }, index) => {
      const released = time >= release;
      const progress = clamp((time - release) / (duration - release));
      const flight = curve(points, progress);
      const drone = get(`drone-${index}`);
      drone.style.opacity = released ? '1' : '0';
      drone.setAttribute('transform', `translate(${flight.point.join(' ')}) rotate(${flight.angle}) scale(.42)`);
      const trail = get(`trail-${index}`);
      trail.style.opacity = released ? '.38' : '0';
      trail.setAttribute('d', flight.trail);
    });
  }

  function tick(now) {
    if (!playing) return;
    if (previous !== null) elapsed = Math.min(duration, elapsed + now - previous);
    previous = now;
    draw(elapsed);
    if (elapsed >= duration) { pause(); button.textContent = 'Replay animation'; return; }
    frame = requestAnimationFrame(tick);
  }
  function pause() {
    playing = false;
    previous = null;
    cancelAnimationFrame(frame);
    button.textContent = elapsed >= duration ? 'Replay animation' : 'Play animation';
  }
  function play() {
    if (staticView.matches || document.hidden) return;
    if (elapsed >= duration) elapsed = 0;
    started = true;
    playing = true;
    previous = null;
    button.textContent = 'Pause animation';
    frame = requestAnimationFrame(tick);
  }
  function preference() {
    pause();
    button.hidden = staticView.matches;
    elapsed = staticView.matches ? duration : 0;
    draw(elapsed);
    if (!staticView.matches && visible && !started) play();
  }
  button.addEventListener('click', () => playing ? pause() : play());
  staticView.addEventListener('change', preference);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  preference();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) pause();
      else if (!started) play();
    }, { threshold: .35 }).observe(film);
  }
})();

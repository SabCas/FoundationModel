'use strict';
var toggle = document.getElementById('mobileToggle');
var megaMenu = document.getElementById('megaMenu');
var menuClose = document.getElementById('menuClose');
var scenes = document.querySelectorAll('.scene');
var storyTitle = document.getElementById('storyTitle');
var storyCopy = document.getElementById('storyCopy');

function closeMenu() {
  megaMenu.classList.remove('open');
  megaMenu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
}

if (toggle && megaMenu) {
  toggle.addEventListener('click', function () {
    var open = megaMenu.classList.toggle('open');
    megaMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
if (menuClose) menuClose.addEventListener('click', closeMenu);

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    storyTitle.textContent = entry.target.getAttribute('data-title');
    storyCopy.textContent = entry.target.getAttribute('data-copy');
  });
}, { threshold: 0.6 });

scenes.forEach(function (scene) { observer.observe(scene); });

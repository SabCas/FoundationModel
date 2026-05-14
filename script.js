'use strict';
var toggle = document.getElementById('mobileToggle');
var megaMenu = document.getElementById('megaMenu');
var menuClose = document.getElementById('menuClose');
var scenes = document.querySelectorAll('.scene');
var storyTitle = document.getElementById('storyTitle');
var storyCopy = document.getElementById('storyCopy');
var gate = document.getElementById('passwordGate');
var gateForm = document.getElementById('gateForm');
var gateInput = document.getElementById('gateInput');
var gateError = document.getElementById('gateError');
var sitePassword = 'Aero2026';

function closeMenu() {
  megaMenu.classList.remove('open');
  megaMenu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
}

function unlockSite() {
  gate.classList.add('hidden');
  document.body.classList.remove('locked');
}

if (gate && gateForm && gateInput && gateError) {
  document.body.classList.add('locked');
  gateInput.focus();

  gateForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var entered = gateInput.value.trim();

    if (entered === sitePassword) {
      unlockSite();
      gateInput.value = '';
      gateError.textContent = '';
      return;
    }

    gateError.textContent = 'Incorrect password. Please try again.';
    gateInput.select();
  });
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

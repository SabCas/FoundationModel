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
var lockButton = document.getElementById('lockButton');
var toggle = document.getElementById('mobileToggle');
var megaMenu = document.getElementById('megaMenu');
var menuClose = document.getElementById('menuClose');
var founderLink = document.getElementById('founderLink');
var founderPanel = document.getElementById('founderPanel');
var founderClose = document.getElementById('founderClose');
var scenes = document.querySelectorAll('.scene');
var storyTitle = document.getElementById('storyTitle');
var storyCopy = document.getElementById('storyCopy');
var storedPassword = localStorage.getItem('sitePassword');

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

if (lockButton) {
  lockButton.addEventListener('click', function () {
    closeMenu();
    showLockScreen();
  });
}

function closeMenu() {
  megaMenu.classList.remove('open');
  megaMenu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  closeFounderPanel();
}

function openFounderPanel() {
  if (!founderPanel) return;
  founderPanel.classList.add('open');
  founderPanel.setAttribute('aria-hidden', 'false');
}

function closeFounderPanel() {
  if (!founderPanel) return;
  founderPanel.classList.remove('open');
  founderPanel.setAttribute('aria-hidden', 'true');
}

if (toggle && megaMenu) {
  toggle.addEventListener('click', function () {
    var open = megaMenu.classList.toggle('open');
    megaMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
if (menuClose) menuClose.addEventListener('click', closeMenu);

if (founderLink) {
  founderLink.addEventListener('click', function (event) {
    if (!window.matchMedia('(min-width: 761px)').matches) return;
    event.preventDefault();
    openFounderPanel();
  });
}

if (founderClose) founderClose.addEventListener('click', closeFounderPanel);

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    storyTitle.textContent = entry.target.getAttribute('data-title');
    storyCopy.textContent = entry.target.getAttribute('data-copy');
  });
}, { threshold: 0.58 });

scenes.forEach(function (scene) { observer.observe(scene); });

showLockScreen();

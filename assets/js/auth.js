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

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


(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7z" fill="currentColor"/></svg>';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  // Data Saver keeps preview loops from downloading; posters still show.
  const motionPaused = !!connection?.saveData;
  let activeScene = null, activeProject = null, returnFocus = null, returnHash = '#top', toastTimer;
  const projects = new Map(), sections = new Map();
  projects.set('showreel', { ...data.showreel, id: 'showreel', category: 'Showreel' });
  data.categories.forEach((cat, ci) => {
    cat.projects.forEach(p => projects.set(p.id, { ...p, category: cat.title, section: cat.id }));
    const section = document.createElement('section');
    section.className = 'scene chapter'; section.id = 'scene-' + cat.id; section.dataset.chapter = cat.id;
    section.setAttribute('aria-labelledby', cat.id + '-heading');
    const first = cat.projects[0];
    const next = data.categories[ci + 1];
    section.innerHTML = `
      <div class="scene-art"><img class="scene-poster" src="${escape(first.poster)}" alt="" loading="lazy"><video class="scene-video" muted playsinline preload="none" aria-hidden="true" tabindex="-1"></video></div><div class="chapter-shade"></div>
      <div class="chapter-top"><div class="chapter-category"><span class="chapter-number">${escape(cat.number)}</span><h2 id="${cat.id}-heading">${escape(cat.title)}</h2></div></div>
      <div class="project-hero" role="tabpanel" id="${cat.id}-panel" aria-labelledby="${cat.id}-tab-0"><h3 class="project-title"></h3><p class="project-summary"></p><div class="project-actions"><button class="project-launch" type="button"><span class="launch-label"></span><span class="small-play">${playIcon}</span></button></div></div>
      <div class="chapter-catalog"><div class="project-tabs" role="tablist" aria-label="Select a ${escape(cat.title.toLowerCase())} project">${cat.projects.map((p, i) => `<button class="project-tab" type="button" role="tab" id="${cat.id}-tab-${i}" aria-controls="${cat.id}-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}"><span class="thumb-wrap"><img src="${escape(p.poster)}" alt="" loading="lazy" style="object-position:${escape(p.focal || 'center')}"><span class="tab-check" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span><span class="tab-caption"><span class="tab-number">${String(i + 1).padStart(2,'0')}</span><span class="tab-name">${escape(p.title)}</span></span></button>`).join('')}</div>${cat.id === 'short-form' ? '<div class="catalog-scroll-hint"><span>DRAG TO EXPLORE</span><span class="catalog-progress" role="scrollbar" aria-label="Scroll short-form projects" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><i></i></span></div>' : ''}<div class="catalog-aside"><a class="category-next" href="#${next ? next.id : 'about'}"><span>${next ? 'Next / ' + escape(next.title) : 'Meet the artist'}</span><span aria-hidden="true">↘</span></a></div></div>`;
    const anchor = document.createElement('div'); anchor.id = cat.id; anchor.className = 'scene-anchor';
    $('#work-mount').append(anchor, section);
    sections.set(cat.id, { element: section, cat, selected: 0 });
    const tabs = $$('.project-tab', section);
    tabs.forEach((button, i) => {
      button.addEventListener('click', () => selectProject(cat.id, i));
      button.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (i - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) { event.preventDefault(); tabs[target].focus(); selectProject(cat.id, target); }
      });
    });
    const tabStrip = $('.project-tabs', section);
    tabStrip.addEventListener('wheel', event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      // Decide from the room left, not from a before/after reading: the strip scrolls smoothly, so scrollLeft lags a frame.
      const room = event.deltaY > 0 ? tabStrip.scrollWidth - tabStrip.clientWidth - tabStrip.scrollLeft : tabStrip.scrollLeft;
      if (room < 1) return;
      event.preventDefault();
      // One card per notch (the strip snaps to cards, so smaller steps would spring back); pixel-precise trackpads keep their deltas.
      const card = tabStrip.querySelector('.project-tab');
      const step = event.deltaMode === 0 && Math.abs(event.deltaY) < 50 ? event.deltaY : Math.sign(event.deltaY) * (card ? card.offsetWidth + parseFloat(getComputedStyle(tabStrip).columnGap || 0) : 200);
      tabStrip.scrollBy({left: step, behavior: 'smooth'});
    }, {passive:false});
    const progressThumb = $('.catalog-progress i', section);
    if (progressThumb) {
      const updateProgress = () => {
        const track = progressThumb.parentElement;
        const maxScroll = Math.max(1, tabStrip.scrollWidth - tabStrip.clientWidth);
        const travel = Math.max(0, track.clientWidth - progressThumb.offsetWidth);
        const ratio = tabStrip.scrollLeft / maxScroll;
        progressThumb.style.transform = `translateX(${ratio * travel}px)`;
        track.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
      };
      const seekProgress = event => {
        const track = progressThumb.parentElement;
        const rect = track.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        tabStrip.scrollLeft = ratio * (tabStrip.scrollWidth - tabStrip.clientWidth);
      };
      const track = progressThumb.parentElement;
      track.addEventListener('pointerdown', event => { track.setPointerCapture(event.pointerId); seekProgress(event); });
      track.addEventListener('pointermove', event => { if (track.hasPointerCapture(event.pointerId)) seekProgress(event); });
      track.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        tabStrip.scrollBy({left:(event.key === 'ArrowRight' ? 1 : -1) * tabStrip.clientWidth * .55,behavior:'smooth'});
      });
      tabStrip.addEventListener('scroll', updateProgress, {passive:true});
      addEventListener('resize', updateProgress, {passive:true});
      requestAnimationFrame(updateProgress);
    }
    $('.project-launch', section).addEventListener('click', event => {
      openProject(cat.projects[sections.get(cat.id).selected].id, event.currentTarget);
    });
  });
  $('.nav-count').textContent = String(projects.size - 1).padStart(2, '0');
  $('.about-bio').textContent = data.about.bio;
  $('.about-approach').textContent = data.about.approach;
  $('#about-title').replaceChildren(...data.about.headline.split('\n').map((line, i) => { const span = document.createElement('span');span.textContent = line;if (!i) { span.style.display='block';span.style.color='inherit'; } return span; }));
  $('.about-poster').src = data.about.poster;
  $('.hero-poster').src = data.showreel.poster;
  const mail = 'mailto:' + data.email;
  $$('.email-link, .contact-heading, .project-contact').forEach(a => a.href = mail);
  $('.email-link').textContent = data.email;
  $('.year').textContent = new Date().getFullYear();
  $('.about-location').textContent = data.location.toUpperCase();
  Object.entries(data.socials).forEach(([name, url]) => {
    if (!url || !/^https?:\/\//.test(url)) return;
    const a = document.createElement('a'); a.textContent = name + ' ↗'; a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; $('.social-links').append(a);
  });
  const dialog = $('.project-dialog'), player = $('.full-player');
  // A Vimeo page link, unlisted link, player link or pasted embed code all resolve to one player URL.
  function vimeoPlayerURL(value) {
    const link = String(value).replace(/&amp;/g, '&').match(/(?:https?:\/\/)?\b(?:[\w-]+\.)?vimeo\.com\/[^\s"'<>]*/i);
    if (!link) return null;
    let url; try { url = new URL(/^https?:/i.test(link[0]) ? link[0] : 'https://' + link[0]); } catch { return ''; }
    const parts = url.pathname.split('/').filter(Boolean);
    let at = parts.findIndex((part, i) => /^\d+$/.test(part) && /^videos?$/.test(parts[i - 1] || ''));
    if (at < 0) at = parts.findIndex(part => /^\d+$/.test(part));
    if (at < 0) return '';
    const hash = url.searchParams.get('h') || (/^[\da-f]{6,}$/i.test(parts[at + 1] || '') ? parts[at + 1] : '');
    const params = new URLSearchParams({autoplay: 1, playsinline: 1, dnt: 1, title: 0, byline: 0, portrait: 0, color: 'd8ff73'});
    if (hash) params.set('h', hash);
    return `https://player.vimeo.com/video/${parts[at]}?${params}`;
  }
  const previews = new Map();
  function setupPreview(video, item) {
    const src = item.preview || '';
    video.pause(); video.classList.remove('ready'); video.removeAttribute('src');
    video.dataset.media = src; video.dataset.start = item.previewStart || 0; video.dataset.length = item.previewLength ?? 5;
    video.poster = item.poster || ''; video.loop = true; video.muted = true;
    video.defaultPlaybackRate = item.playbackRate || 1;
    video.playbackRate = item.playbackRate || 1;
    video.load(); // The visible scene alone gets a video source in syncMotion().
  }
  function registerPreview(video) {
    video.addEventListener('playing', () => video.classList.add('ready'));
    video.addEventListener('error', () => video.classList.remove('ready'));
    video.addEventListener('loadedmetadata', () => {
      const start = Math.min(Number(video.dataset.start || 0), Math.max(0, video.duration - .1));
      if (start > 0) video.currentTime = start;
    });
    video.addEventListener('timeupdate', () => {
      const start = Number(video.dataset.start || 0), length = Number(video.dataset.length || 0);
      if (length > 0 && video.currentTime >= start + length && video.duration > start + length) video.currentTime = start;
    });
  }
  $$('.scene-video, .about-video').forEach(registerPreview);
  setupPreview($('.hero-video'), data.showreel); previews.set('top', $('.hero-video'));
  setupPreview($('.about-video'), {preview:data.about.video,poster:data.about.poster,previewLength:0,playbackRate:data.about.playbackRate || .72}); previews.set('about', $('.about-video'));
  function selectProject(sectionId, index) {
    const state = sections.get(sectionId); state.selected = index;
    const item = state.cat.projects[index], section = state.element;
    $('.scene-poster', section).src = item.poster;
    $('.scene-poster', section).style.setProperty('--focal', item.focal || 'center');
    $('.scene-video', section).style.setProperty('--focal', item.focal || 'center');
    $('.project-title', section).textContent = item.title;
    $('.project-summary', section).textContent = item.description;
    $('.launch-label', section).textContent = item.film ? 'Play' : 'Explore';
    $('.project-hero', section).setAttribute('aria-labelledby', `${sectionId}-tab-${index}`);
    $$('.project-tab', section).forEach((button, i) => {button.setAttribute('aria-selected', String(i === index));button.tabIndex = i === index ? 0 : -1;if(i === index) { const rail = button.parentElement; const br = button.getBoundingClientRect(), rr = rail.getBoundingClientRect(); if(br.left < rr.left) rail.scrollBy({left:br.left-rr.left,behavior:'smooth'}); else if(br.right > rr.right) rail.scrollBy({left:br.right-rr.right,behavior:'smooth'}); }});
    const video = $('.scene-video', section); setupPreview(video, item); previews.set(sectionId, video);
    if (activeScene) syncMotion();
  }
  sections.forEach((_, id) => selectProject(id, 0));
  // The intro video and the hero preview must not download at the same time: the preview waits for the hand-off.
  const introHolding = () => document.documentElement.classList.contains('intro-pending') && !document.documentElement.classList.contains('intro-handoff');
  function syncMotion() {
    previews.forEach((video, id) => {
      if (id === activeScene && !motionPaused && !document.hidden && !dialog.open && video.dataset.media && !introHolding()) {
        if (!video.getAttribute('src')) { video.src = video.dataset.media; video.load(); }
        video.play().catch(() => {});
      } else video.pause();
    });
  }
  document.addEventListener('visibilitychange', syncMotion);
  new MutationObserver(syncMotion).observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
  const scenes = $$('.scene');
  let ticking = false;
  function updateScroll() {
    ticking = false;
    const threshold = Math.min(innerHeight * .45, 400);
    let current = 'top';
    scenes.forEach(scene => { if (scene.getBoundingClientRect().top <= threshold) current = scene.dataset.chapter; });
    if (current !== activeScene) {
      activeScene = current;
      $$('.chapter-rail a').forEach(a => { if (a.dataset.chapter === current) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
      $$('.main-nav a').forEach(a => { const selected = a.dataset.nav === 'about' ? current === 'about' : !['top','about'].includes(current); if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current'); });
      syncMotion();
    }
  }
  addEventListener('scroll', () => {if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }}, { passive: true });
  addEventListener('resize', updateScroll);
  // Desktop wheel and trackpad move exactly one full section per gesture, like a vertical feed. CSS snapping alone springs a
  // single wheel notch back to the section it started from. Touch, keyboard, reduced motion and short windows (sections taller
  // than the screen) keep native scrolling. A wheel the catalogue strip used for itself has defaultPrevented set.
  const feed = matchMedia('(min-width:1001px) and (min-aspect-ratio:5/4)');
  let paging = false, lastWheel = -Infinity;
  addEventListener('wheel', event => {
    const gap = event.timeStamp - lastWheel; lastWheel = event.timeStamp;
    if (event.defaultPrevented || event.ctrlKey || !feed.matches || reduced.matches || dialog.open) return;
    if (document.documentElement.classList.contains('intro-pending') || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (scenes.some(scene => scene.offsetHeight > innerHeight + 1)) return;
    event.preventDefault();
    // One move per gesture: momentum and a fast spin are absorbed until the wheel has been quiet for 120 ms.
    if (paging || gap < 120) return;
    const tops = scenes.map(scene => scene.getBoundingClientRect().top + scrollY);
    const index = tops.reduce((best, top, i) => Math.abs(top - scrollY) < Math.abs(tops[best] - scrollY) ? i : best, 0);
    const target = Math.max(0, Math.min(scenes.length - 1, index + Math.sign(event.deltaY)));
    if (Math.abs(tops[target] - scrollY) < 2) return;
    paging = true;
    const release = () => { paging = false; clearTimeout(fallback); removeEventListener('scrollend', release); };
    const fallback = setTimeout(release, 1000);
    addEventListener('scrollend', release);
    scrollTo({top: tops[target], behavior: 'smooth'});
  }, {passive: false});
  function setNotice(title, detail) {
    $('.media-notice').hidden = false; $('.notice-title').textContent = title; $('.notice-detail').textContent = detail;
    player.hidden = true; $('.player-poster').hidden = false; filmMode(false);
  }
  function openProject(id, trigger, updateURL = true) {
    const item = projects.get(id); if (!item) return;
    if (!dialog.open) {
      returnFocus = trigger || document.activeElement; returnHash = item.section ? '#' + item.section : '#top';
      dialog.showModal(); document.body.classList.add('modal-open');
    }
    activeProject = id; syncMotion(); player.pause(); player.removeAttribute('src'); player.replaceChildren(); player.load(); $('.player-frame')?.remove(); filmMode(false);
    $('.dialog-category').textContent = item.demo ? 'SHOWREEL / PREVIEW' : item.category;
    $('#dialog-title').textContent = item.title;
    $('.detail-type').textContent = item.type || item.label || item.category;
    $('.detail-description').textContent = item.description;
    $('.detail-role').textContent = item.role || data.role;
    $('.detail-year').textContent = item.year || '';
    $('.detail-year-wrap').hidden = !item.year;
    $('.player-poster').src = item.poster; $('.player-poster').alt = item.title; $('.player-poster').hidden = false;
    player.poster = item.poster; player.hidden = false; $('.media-notice').hidden = true;
    $('.next-project').hidden = id === 'showreel';
    $('.dialog-scroll').scrollTop = 0;
    const vimeo = item.film ? vimeoPlayerURL(item.film) : null;
    if (vimeo) {
      const frame = document.createElement('iframe');
      frame.className = 'player-frame'; frame.src = vimeo; frame.title = item.title;
      frame.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media'; frame.allowFullscreen = true;
      player.hidden = true; $('.player-stage').append(frame);
    } else if (vimeo === '') setNotice('This film couldn’t load', 'Please try again later, or get in touch below.');
    else if (item.film) {
      player.src = item.film; filmMode(true);
      if (item.captions) { const track = document.createElement('track');track.kind='captions';track.src=item.captions;track.srclang=item.captionLanguage || 'en';track.label=item.captionLabel || 'English';player.append(track); }
      player.load(); player.play().catch(() => { /* Native controls remain available when autoplay is blocked. */ });
    } else setNotice('Film coming soon', 'A first look at the visual world.');
    if (updateURL) history.pushState({project:id}, '', '#project/' + encodeURIComponent(id));
    $('.dialog-close').focus({ preventScroll: true });
  }
  function closeProject(updateURL = true) {
    if (!dialog.open) return;
    exitFullscreen(); player.pause(); player.removeAttribute('src'); player.load(); $('.player-frame')?.remove(); filmMode(false);
    dialog.close(); document.body.classList.remove('modal-open'); activeProject = null;
    if (updateURL) history.replaceState(null, '', returnHash);
    syncMotion();
    if (returnFocus?.isConnected && returnFocus !== document.body) returnFocus.focus({preventScroll:true});
  }
  // Film player: our own controls over the video (acid progress line, time, sound, full screen), faded out while a film plays.
  const stage = $('.player-stage'), progress = $('.player-progress'), playedBar = $('.player-played'), bufferedBar = $('.player-buffered');
  const volumeSlider = $('.player-volume-slider'), volumeLevel = $('.player-volume-level');
  const clock = seconds => { const s = Number.isFinite(seconds) ? Math.floor(seconds) : 0; return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  let idleTimer, frameLoop = 0;
  function filmMode(on) {
    stage.classList.toggle('has-film', on);
    stage.classList.remove('is-waiting', 'ui-awake');
    if (on) wakeControls();
    paintPlayer();
  }
  function paintPlayer() {
    const duration = player.duration || 0, time = player.currentTime || 0;
    let loaded = 0;
    for (let i = 0; i < player.buffered.length; i++) if (player.buffered.start(i) <= time + .5) loaded = Math.max(loaded, player.buffered.end(i));
    playedBar.style.transform = `scaleX(${duration ? time / duration : 0})`;
    bufferedBar.style.transform = `scaleX(${duration ? Math.min(1, loaded / duration) : 0})`;
    $('.player-time').textContent = `${clock(time)} / ${clock(duration)}`;
    progress.setAttribute('aria-valuenow', String(Math.round(duration ? time / duration * 100 : 0)));
    progress.setAttribute('aria-valuetext', `${clock(time)} of ${clock(duration)}`);
    stage.classList.toggle('is-paused', player.paused);
    stage.classList.toggle('is-muted', player.muted);
    $('.player-play').setAttribute('aria-label', player.paused ? 'Play' : 'Pause');
    $('.player-mute').setAttribute('aria-label', player.muted ? 'Unmute' : 'Mute');
    const heard = player.muted ? 0 : player.volume;
    volumeLevel.style.transform = `scaleX(${heard})`;
    volumeSlider.setAttribute('aria-valuenow', String(Math.round(heard * 100)));
    volumeSlider.setAttribute('aria-valuetext', `${Math.round(heard * 100)}%`);
  }
  function wakeControls() {
    stage.classList.add('ui-awake'); clearTimeout(idleTimer);
    if (!player.paused) idleTimer = setTimeout(() => stage.classList.remove('ui-awake'), 2500);
  }
  const filmActive = () => stage.classList.contains('has-film') && !player.hidden;
  const togglePlay = () => { if (player.paused) player.play().catch(() => {}); else player.pause(); };
  const seekBy = seconds => { if (player.duration) player.currentTime = Math.max(0, Math.min(player.duration, player.currentTime + seconds)); paintPlayer(); };
  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement;
  function exitFullscreen() { if (fullscreenElement()) (document.exitFullscreen || document.webkitExitFullscreen).call(document)?.catch?.(() => {}); }
  function toggleFullscreen() {
    if (fullscreenElement()) return exitFullscreen();
    if (stage.requestFullscreen) stage.requestFullscreen().catch(() => {});
    else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
    else if (player.webkitEnterFullscreen) player.webkitEnterFullscreen(); // iPhone: the system full-screen player
  }
  ['play', 'pause', 'volumechange', 'durationchange', 'loadedmetadata', 'progress', 'seeked', 'ended'].forEach(type => player.addEventListener(type, paintPlayer));
  player.addEventListener('play', () => { wakeControls(); cancelAnimationFrame(frameLoop); const tick = () => { paintPlayer(); if (!player.paused) frameLoop = requestAnimationFrame(tick); }; tick(); });
  player.addEventListener('pause', () => { cancelAnimationFrame(frameLoop); wakeControls(); });
  player.addEventListener('waiting', () => stage.classList.add('is-waiting'));
  ['playing', 'canplay', 'pause'].forEach(type => player.addEventListener(type, () => stage.classList.remove('is-waiting')));
  let lastPointer = 'mouse';
  stage.addEventListener('pointerdown', event => { lastPointer = event.pointerType; });
  stage.addEventListener('pointermove', event => { if (event.pointerType === 'mouse' && filmActive()) wakeControls(); });
  stage.addEventListener('click', event => {
    if (!filmActive() || event.target.closest('.player-bar')) return;
    // On touch the first tap only brings the controls back; the next one plays or pauses.
    if (lastPointer === 'touch' && !stage.classList.contains('ui-awake') && !player.paused) return wakeControls();
    togglePlay(); wakeControls();
  });
  stage.addEventListener('dblclick', event => { if (filmActive() && lastPointer === 'mouse' && !event.target.closest('.player-bar')) toggleFullscreen(); });
  $('.player-play').addEventListener('click', togglePlay);
  // Volume: the slider sets the level, the speaker toggles mute. The level is remembered on this device.
  // iPhone ignores volume from script (hardware buttons only), so there the slider is hidden and mute stays.
  const toggleMute = () => { player.muted = !player.muted; if (!player.muted && player.volume === 0) player.volume = 1; };
  function setVolume(level) {
    player.volume = Math.max(0, Math.min(1, level)); player.muted = player.volume === 0;
    try { localStorage.setItem('film-volume', String(player.volume)); } catch {}
    paintPlayer();
  }
  try { const saved = parseFloat(localStorage.getItem('film-volume')); if (saved > 0 && saved <= 1) player.volume = saved; } catch {}
  const probe = document.createElement('video'); probe.volume = .5;
  if (probe.volume !== .5) stage.classList.add('no-volume');
  $('.player-mute').addEventListener('click', toggleMute);
  const slideVolume = event => { const rect = volumeSlider.getBoundingClientRect(), level = (event.clientX - rect.left) / rect.width; setVolume(level < .05 ? 0 : level); };
  volumeSlider.addEventListener('pointerdown', event => { volumeSlider.setPointerCapture(event.pointerId); stage.classList.add('is-sliding'); slideVolume(event); });
  volumeSlider.addEventListener('pointermove', event => { if (volumeSlider.hasPointerCapture(event.pointerId)) slideVolume(event); wakeControls(); });
  ['pointerup', 'pointercancel'].forEach(type => volumeSlider.addEventListener(type, () => stage.classList.remove('is-sliding')));
  $('.player-fullscreen').addEventListener('click', toggleFullscreen);
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(type => document.addEventListener(type, () => stage.classList.toggle('is-fullscreen', fullscreenElement() === stage)));
  const scrub = event => {
    const rect = progress.getBoundingClientRect();
    if (player.duration) player.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * player.duration;
    paintPlayer();
  };
  progress.addEventListener('pointerdown', event => { progress.setPointerCapture(event.pointerId); stage.classList.add('is-scrubbing'); scrub(event); });
  progress.addEventListener('pointermove', event => { if (progress.hasPointerCapture(event.pointerId)) scrub(event); wakeControls(); });
  ['pointerup', 'pointercancel'].forEach(type => progress.addEventListener(type, () => stage.classList.remove('is-scrubbing')));
  dialog.addEventListener('keydown', event => {
    if (!filmActive() || event.metaKey || event.ctrlKey || event.altKey || event.target.closest('a[href]')) return;
    const onButton = event.target.closest('button');
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const actions = {' ': togglePlay, k: togglePlay, ArrowLeft: () => seekBy(-5), ArrowRight: () => seekBy(5), m: toggleMute, f: toggleFullscreen,
      ArrowUp: () => setVolume((player.muted ? 0 : player.volume) + .1), ArrowDown: () => setVolume((player.muted ? 0 : player.volume) - .1),
      Home: () => { if (event.target === progress) { player.currentTime = 0; paintPlayer(); } }, End: () => { if (event.target === progress && player.duration) { player.currentTime = player.duration - .1; paintPlayer(); } }};
    if (event.target === volumeSlider) Object.assign(actions, {ArrowRight: actions.ArrowUp, ArrowLeft: actions.ArrowDown, Home: () => setVolume(0), End: () => setVolume(1)});
    if (!actions[key] || (onButton && (key === ' ' || key === 'Enter'))) return;
    event.preventDefault(); actions[key](); wakeControls();
  });
  player.addEventListener('error', () => {if (activeProject && player.getAttribute('src')) setNotice('This film couldn’t load', 'Please try again later, or get in touch below.');});
  player.addEventListener('playing', () => { $('.media-notice').hidden = true; $('.player-poster').hidden = true; });
  $('.dialog-close').addEventListener('click', () => closeProject());
  dialog.addEventListener('cancel', event => {event.preventDefault();closeProject();});
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = $$('button:not(:disabled), a[href], video[controls], iframe, [tabindex]', dialog).filter(el => el.tabIndex >= 0 && el.getClientRects().length && !el.closest('[hidden]'));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  $('.next-project').addEventListener('click', () => {
    const list = [...projects.keys()].filter(id => id !== 'showreel'), next = list[(list.indexOf(activeProject) + 1) % list.length];
    openProject(next, null, false); history.replaceState({project:next}, '', '#project/' + encodeURIComponent(next));
  });
  $$('[data-open]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.open, button)));
  function route() {
    const id = location.hash.startsWith('#project/') ? decodeURIComponent(location.hash.slice(9)) : null;
    if (id && projects.has(id)) {
      const item = projects.get(id);
      if (item.section) {
        const s = sections.get(item.section);selectProject(item.section, s.cat.projects.findIndex(p => p.id === id));
      }
      if (!dialog.open) document.getElementById(item.section || 'top')?.scrollIntoView({behavior:'instant'});
      openProject(id, null, false);
    } else if (dialog.open) closeProject(false);
  }
  addEventListener('hashchange', route);
  function toast(message) { clearTimeout(toastTimer); $('.toast').textContent = message;$('.toast').classList.add('visible');toastTimer=setTimeout(() => $('.toast').classList.remove('visible'), 2600); }
  $('.copy-email').addEventListener('click', async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(data.email); ok = true; } catch {
      const input = document.createElement('textarea'); input.value = data.email;input.style.cssText='position:fixed;top:0;left:-9999px';document.body.append(input);input.select();
      try {ok = document.execCommand('copy');} catch {} input.remove();$('.copy-email').focus({preventScroll:true});
    }
    toast(ok ? 'Email copied. Let’s make something.' : 'Select the email address to copy it.');
  });
  updateScroll(); route();
  if (location.hash && !location.hash.startsWith('#project/')) {
    const anchor = document.getElementById(location.hash.slice(1));
    if (anchor?.classList.contains('scene-anchor')) requestAnimationFrame(() => anchor.scrollIntoView({behavior:'instant'}));
  }
})();

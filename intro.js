(() => {
  const root = document.documentElement; if(location.search.includes('intro=1')) root.classList.add('intro-preview');
  if (!root.classList.contains('intro-pending')) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  const layer = document.createElement('div');
  layer.className = 'intro-layer';
  layer.innerHTML = '<video muted playsinline preload="auto" aria-hidden="true" src="assets/intro-v07-web.mp4"></video><div class="intro-black"></div><div class="intro-name" aria-hidden="true">BERKAY ALIOGLU</div><button class="intro-skip" type="button">Skip intro ↗</button>';
  // intro-v07-web.mp4 at 24 fps: the clips fly onto the title line from frame 118 and land at 125; frame 126 is where the
  // rendered title scan begins, and the live hero title takes over there. TITLE is the lettering's ink box in the 1280x720 frame.
  const FPS = 24, STEER_FROM = 118 / FPS, STEER_TO = 125 / FPS, REVEAL_AT = 126 / FPS;
  const TITLE = {cx: 639.5, cy: 385.5, w: 627};
  document.body.append(layer); root.classList.add('intro-live');
  const video = layer.querySelector('video'), name = layer.querySelector('.intro-name');
  video.muted = true;
  const hero = document.querySelector('#hero-title');
  const regions = [...document.querySelectorAll('main,.site-header,.chapter-rail')];
  regions.forEach(el => el.inert = true);
  let done = false, transitioning = false, fontsReady = false, requested = false, playing = false, stall;
  function align() {
    const box = hero.getBoundingClientRect(), style = getComputedStyle(hero);
    Object.assign(name.style, {left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px',font:style.font,letterSpacing:style.letterSpacing,lineHeight:style.lineHeight});
    target = null;
  }
  // While the clips gather, move and scale the video so its title lands exactly on the hero title of this screen.
  // The video fills the viewport with object-fit: cover, so a title point sits at offset + point * cover scale.
  let target = null;
  function steerTarget() {
    const range = document.createRange(); range.selectNodeContents(hero);
    const text = range.getBoundingClientRect(), vw = innerWidth, vh = innerHeight;
    const cover = Math.max(vw / 1280, vh / 720), ox = (vw - 1280 * cover) / 2, oy = (vh - 720 * cover) / 2;
    const k = text.width / (TITLE.w * cover);
    return {k, x: text.left + text.width / 2 - k * (ox + TITLE.cx * cover), y: text.top + text.height / 2 - k * (oy + TITLE.cy * cover)};
  }
  function steer(time) {
    if(time < STEER_FROM) return;
    if(!target) target = steerTarget();
    const p = Math.min(1, (time - STEER_FROM) / (STEER_TO - STEER_FROM)), e = p * p * (3 - 2 * p);
    layer.classList.add('intro-steer');
    video.style.transform = `translate(${target.x * e}px,${target.y * e}px) scale(${1 + (target.k - 1) * e})`;
  }
  function finish() {
    if(done) return;
    done = true; clearTimeout(watchdog); clearInterval(poll); clearTimeout(stall);
    // Dropping the source also cancels a download that is still running.
    video.pause(); video.removeAttribute('src'); video.load(); layer.remove();
    root.classList.remove('intro-pending','intro-live','intro-handoff'); regions.forEach(el => el.inert = false);
    window.removeEventListener('resize',align);
    document.removeEventListener('keydown',escape);
  }
  function reveal() {
    if(transitioning || done) return;
    transitioning = true; clearTimeout(stall); root.classList.add('intro-handoff'); align(); layer.classList.add('intro-reveal');
    name.replaceChildren(...Array.from(hero.textContent).map((letter,i) => {
      const span = document.createElement('span'); span.textContent = letter;
      span.className = 'iris-letter'; span.style.setProperty('--i',i);
      return span;
    }));
    const preview = document.querySelector('.hero-video');
    if(preview) preview.currentTime = 0;
    // The live title glitches in on black (letters finish at ~400 ms). Only once it stands still does the black open around it;
    // the title itself never fades, so it is never seen doubled over the hero title underneath.
    setTimeout(() => { if(!done) layer.classList.add('intro-unveil'); },420);
    setTimeout(finish,800);
  }
  function escape(e) { if(e.key === 'Escape') finish(); }
  layer.querySelector('button').addEventListener('click',finish);
  document.addEventListener('keydown',escape);
  window.addEventListener('resize',align);
  video.addEventListener('ended',reveal,{once:true});
  video.addEventListener('error',finish,{once:true});
  function frameTick(now, frame) {
    if(done || transitioning) return;
    const time = frame ? frame.mediaTime : video.currentTime;
    steer(time);
    if(time >= REVEAL_AT - .005) reveal(); else if(video.requestVideoFrameCallback) video.requestVideoFrameCallback(frameTick);
  }
  if(video.requestVideoFrameCallback) video.requestVideoFrameCallback(frameTick);
  // Browsers without per-frame callbacks steer and hand over on the coarser timeupdate clock.
  video.addEventListener('timeupdate',() => { if(transitioning || done) return; steer(video.currentTime); if(video.currentTime >= REVEAL_AT - .005) reveal(); });
  // Start with enough footage buffered to play without stalling. A connection too slow for that
  // skips straight to the site instead of holding a black screen, and so does a stall mid-intro.
  const deadline = performance.now() + 3000;
  function bufferedAhead() {
    const b = video.buffered; let end = 0;
    for(let i = 0; i < b.length; i++) if(b.start(i) <= video.currentTime + .1) end = Math.max(end, b.end(i));
    return end - video.currentTime;
  }
  function tryStart() {
    if(done || playing) return;
    if(performance.now() > deadline) return finish();
    if(requested || !fontsReady) return;
    // Browsers that only fetch after play() is called (iOS) sit idle; request playback right away there.
    if(bufferedAhead() >= 1.5 || video.networkState === video.NETWORK_IDLE) { requested = true; video.play().catch(finish); }
  }
  const poll = setInterval(tryStart, 100);
  video.addEventListener('playing',() => { playing = true; layer.classList.add('intro-playing'); clearInterval(poll); clearTimeout(stall); });
  video.addEventListener('waiting',() => { if(playing && !transitioning) { clearTimeout(stall); stall = setTimeout(finish,700); } });
  const watchdog = setTimeout(finish,12000);
  document.fonts.ready.then(() => { if(!done) { align(); fontsReady = true; tryStart(); } });
})();

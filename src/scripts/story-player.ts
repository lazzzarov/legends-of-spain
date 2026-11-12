/**
 * Story mode player for the home page. The timeline is step 1; each legend's deck follows in
 * timeline order. It never starts by itself: it starts from "Begin the story", a face on the
 * timeline, a step dot, or a #story/<slug>/<n> link. Slides advance on a timer sized to their
 * text, with Pause always visible; with reduced motion nothing advances on its own.
 */
import { parseStoryHash, storyHash, type StoryPosition } from '../lib/story';

const stage = document.querySelector<HTMLElement>('[data-story-stage]');

if (stage) {
  const $ = <T extends Element = HTMLElement>(sel: string) => stage.querySelector<T>(sel)!;
  const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = stage) => [
    ...root.querySelectorAll<T>(sel),
  ];

  const timeline = $('[data-story-timeline]');
  const decks = $$('[data-deck]');
  const slidesOf = (deck: HTMLElement) => $$('[data-slide]', deck);
  const counts = Object.fromEntries(decks.map((d) => [d.dataset.deck!, slidesOf(d).length]));
  const bar = $('[data-story-bar]');
  const live = $('[data-story-live]');
  const progress = $('[data-story-progress]');
  const toggle = $<HTMLButtonElement>('[data-story-toggle]');
  const prevButton = $<HTMLButtonElement>('[data-story-prev]');
  const dots = $$<HTMLButtonElement>('[data-story-goto]');
  const total = decks.length + 1;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isVisible = (el: Element) => !el.closest('[hidden]');

  // Loops only play when motion is welcome and the visitor hasn't asked to save data.
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  );
  function syncLoops() {
    $$<HTMLVideoElement>('[data-story-loop]').forEach((video) => {
      const show = isVisible(video) && !reduceMotion.matches && !saveData;
      if (show) void video.play().catch(() => {});
      else if (!video.paused) video.pause();
    });
  }

  // null = the timeline (step 1).
  let position: { deck: number; slide: number } | null = null;
  let playing = false;
  let timer: number | undefined;
  let startedAt = 0;
  let elapsed = 0;

  const currentSlide = () =>
    position ? slidesOf(decks[position.deck]!)[position.slide] : undefined;
  const duration = () => Number(currentSlide()?.dataset.duration ?? 8000);

  // --- Timer and progress line -----------------------------------------------------------
  function stopTimer() {
    window.clearTimeout(timer);
    timer = undefined;
  }

  function setProgress(fraction: number, animateMs = 0) {
    progress.style.transition = 'none';
    progress.style.transform = `scaleX(${fraction})`;
    if (animateMs > 0) {
      void progress.offsetWidth; // commit the start position before animating
      progress.style.transition = `transform ${animateMs}ms linear`;
      progress.style.transform = 'scaleX(1)';
    }
  }

  function run() {
    stopTimer();
    if (!playing || !position) return;
    const remaining = Math.max(0, duration() - elapsed);
    startedAt = performance.now();
    setProgress(elapsed / duration(), remaining);
    timer = window.setTimeout(() => {
      elapsed = 0;
      if (!go(1, { auto: true })) setPlaying(false);
    }, remaining);
  }

  function setPlaying(on: boolean) {
    if (on === playing) return;
    if (!on && timer !== undefined) elapsed += performance.now() - startedAt;
    playing = on;
    bar.toggleAttribute('data-playing', on);
    toggle.setAttribute('aria-label', on ? 'Pause' : 'Play');
    if (on) run();
    else {
      stopTimer();
      setProgress(position ? Math.min(1, elapsed / duration()) : 0);
    }
  }

  // --- Showing a step ----------------------------------------------------------------------
  function render(focus: boolean) {
    const inStory = position !== null;
    stage!.dataset.mode = inStory ? 'story' : 'timeline';
    timeline.hidden = inStory;
    decks.forEach((deck, i) => {
      const active = position?.deck === i;
      deck.hidden = !active;
      slidesOf(deck).forEach((slide, j) => (slide.hidden = !(active && position!.slide === j)));
    });
    $$('[data-story-when]').forEach((el) => {
      el.hidden = el.dataset.storyWhen !== (inStory ? 'story' : 'timeline');
    });

    const step = inStory ? position!.deck + 2 : 1;
    const deck = inStory ? decks[position!.deck]! : undefined;
    const slide = currentSlide();
    $('[data-story-count]').textContent = `${step} / ${total}`;
    $('[data-story-step]').textContent = deck ? deck.dataset.name! : 'The Timeline';
    $('[data-story-slide]').textContent =
      deck && slide
        ? `${position!.slide + 1} / ${slidesOf(deck).length} · ${slide.dataset.label}`
        : '';
    dots.forEach((dot, i) => {
      if (i === step - 1) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    prevButton.disabled = false;
    syncLoops();
    live.textContent =
      deck && slide ? `${deck.dataset.name}: ${slide.dataset.label}` : 'The timeline';

    if (focus) {
      if (slide)
        slide.querySelector<HTMLElement>('[tabindex="-1"]')?.focus({ preventScroll: true });
    } else if (document.activeElement && !isVisible(document.activeElement)) {
      // An automatic advance hid the element that had focus: keep focus on the controls.
      (inStory ? toggle : $('[data-story-begin]')).focus({ preventScroll: true });
    }
  }

  function syncHash(push: boolean) {
    const hash = position
      ? storyHash({ slug: decks[position.deck]!.dataset.deck!, slide: position.slide })
      : '';
    const url = `${location.pathname}${location.search}${hash}`;
    if (url === `${location.pathname}${location.search}${location.hash}`) return;
    if (push) history.pushState(null, '', url);
    else history.replaceState(null, '', url);
  }

  function show(next: typeof position, opts: { focus?: boolean; push?: boolean } = {}) {
    const entering = position === null && next !== null;
    position = next;
    elapsed = 0;
    syncHash(Boolean(opts.push ?? entering));
    render(Boolean(opts.focus));
    if (position) run();
    else {
      setPlaying(false);
      setProgress(0);
    }
  }

  /** Move by one slide. Returns false at the very end of the book. */
  function go(delta: 1 | -1, opts: { auto?: boolean } = {}): boolean {
    if (!position) {
      if (delta === 1) open(0, 0);
      return true;
    }
    const count = slidesOf(decks[position.deck]!).length;
    let { deck, slide } = position;
    slide += delta;
    if (slide >= count) {
      if (deck === decks.length - 1) return false;
      deck++;
      slide = 0;
    } else if (slide < 0) {
      if (deck === 0) {
        exit();
        return true;
      }
      deck--;
      slide = slidesOf(decks[deck]!).length - 1;
    }
    show({ deck, slide }, { focus: !opts.auto });
    return true;
  }

  function open(deck: number, slide = 0, opts: { focus?: boolean } = {}) {
    show({ deck, slide }, { focus: opts.focus ?? true });
    setPlaying(!reduceMotion.matches);
  }

  function exit() {
    const from = position ? decks[position.deck]!.dataset.deck : undefined;
    show(null);
    $$('[data-stop]').forEach((stop) =>
      stop.classList.toggle('is-current', stop.dataset.stop === from),
    );
    const face = from ? stage!.querySelector<HTMLElement>(`[data-story-open="${from}"]`) : null;
    (face ?? $('[data-story-begin]')).focus({ preventScroll: true });
  }

  const deckIndex = (slug: string) => decks.findIndex((d) => d.dataset.deck === slug);

  function fromHash(): StoryPosition | null {
    return parseStoryHash(location.hash, counts);
  }

  // --- Wiring -------------------------------------------------------------------------------
  $$('[data-story-dots], [data-story-begin]').forEach((el) => (el.hidden = false));

  $('[data-story-begin]').addEventListener('click', () => open(0));
  toggle.addEventListener('click', () => setPlaying(!playing));
  prevButton.addEventListener('click', () => go(-1));
  $('[data-story-next-slide]').addEventListener('click', () => {
    if (!go(1)) setPlaying(false);
  });

  stage.addEventListener('click', (event) => {
    const target = event.target as Element;
    const face = target.closest<HTMLAnchorElement>('[data-story-open]');
    if (face) {
      const mouse = event as MouseEvent;
      if (mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || mouse.altKey || mouse.button !== 0)
        return;
      event.preventDefault();
      open(deckIndex(face.dataset.storyOpen!));
      return;
    }
    if (target.closest('[data-story-exit]')) exit();
    else if (target.closest('[data-story-next]') && position) open(position.deck + 1);
    else {
      const dot = target.closest<HTMLButtonElement>('[data-story-goto]');
      if (dot) {
        const slug = dot.dataset.storyGoto!;
        if (slug) open(deckIndex(slug));
        else exit();
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!position || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey)
      return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    const onControl = Boolean(target.closest('button, a'));
    switch (event.key) {
      case 'ArrowRight':
      case 'PageDown':
        event.preventDefault();
        if (!go(1)) setPlaying(false);
        break;
      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault();
        go(-1);
        break;
      case ' ':
        if (onControl) return; // Space already presses the focused button or link
        event.preventDefault();
        setPlaying(!playing);
        break;
      case 'Escape':
        event.preventDefault();
        exit();
        break;
    }
  });

  // Swipe between slides on touch screens.
  let touchStart: { x: number; y: number } | null = null;
  stage.addEventListener(
    'touchstart',
    (e) => {
      if (position && e.touches.length === 1)
        touchStart = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY };
    },
    { passive: true },
  );
  stage.addEventListener('touchend', (e) => {
    if (!touchStart || !position) return;
    const dx = e.changedTouches[0]!.clientX - touchStart.x;
    const dy = e.changedTouches[0]!.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  });

  // Hidden tab: pause, so nobody returns to a story that moved on without them.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) setPlaying(false);
  });
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) setPlaying(false);
    syncLoops();
  });

  const followHash = () => {
    const target = fromHash();
    if (target) {
      const deck = deckIndex(target.slug);
      if (position?.deck !== deck || position.slide !== target.slide)
        open(deck, target.slide, { focus: false });
    } else if (position) {
      show(null);
    }
  };
  window.addEventListener('popstate', followHash);
  window.addEventListener('hashchange', followHash);
  followHash();
  render(false);
}

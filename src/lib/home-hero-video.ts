const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const STALL_TIMEOUT_MS = 4_000;
const MAX_RECOVERY_ATTEMPTS = 2;

type HeroVariant = 'desktop' | 'mobile';
type HeroVideoState =
  'loading' | 'playing' | 'poster' | 'recovering' | 'reduced-motion' | 'save-data' | 'unsupported';

type NetworkInformationWithSaveData = {
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationWithSaveData;
};

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
};

const addMediaQueryListener = (
  query: MediaQueryList,
  listener: (event: MediaQueryListEvent) => void,
) => {
  if (
    typeof (query as MediaQueryList & { addEventListener?: unknown }).addEventListener ===
    'function'
  ) {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }

  const legacyQuery = query as unknown as {
    addListener: (callback: (event: MediaQueryListEvent) => void) => void;
    removeListener: (callback: (event: MediaQueryListEvent) => void) => void;
  };
  legacyQuery.addListener(listener);
  return () => legacyQuery.removeListener(listener);
};

const getSource = (video: HTMLVideoElement, variant: HeroVariant) => {
  const mp4 = video.dataset[variant === 'mobile' ? 'srcMobileMp4' : 'srcDesktopMp4'];
  const webm = video.dataset[variant === 'mobile' ? 'srcMobileWebm' : 'srcDesktopWebm'];

  if (mp4 && video.canPlayType('video/mp4')) return mp4;
  if (webm && video.canPlayType('video/webm')) return webm;
  return mp4 ?? webm ?? null;
};

const getPoster = (video: HTMLVideoElement, variant: HeroVariant) =>
  video.dataset[variant === 'mobile' ? 'posterMobile' : 'posterDesktop'] ?? null;

export const initHomeHeroVideo = () => {
  const root = document.querySelector<HTMLElement>('[data-home-hero-media]');
  const video = root?.querySelector<VideoWithFrameCallback>('[data-home-hero-video]');
  if (!root || !video) return;

  const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const saveData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);

  let currentVariant: HeroVariant | null = null;
  let currentSource: string | null = null;
  let recoveryAttempts = 0;
  let isIntersecting = true;
  let frameCallbackPending = false;
  let stallTimer: number | undefined;
  let recoveryTimer: number | undefined;

  const setState = (state: HeroVideoState) => {
    root.dataset.videoState = state;
  };

  const clearStallTimer = () => {
    window.clearTimeout(stallTimer);
    stallTimer = undefined;
  };

  const clearTimers = () => {
    clearStallTimer();
    window.clearTimeout(recoveryTimer);
    recoveryTimer = undefined;
  };

  const shouldPlay = () =>
    !reducedMotionQuery.matches && !saveData && isIntersecting && !document.hidden;

  const markPresentedFrame = () => {
    if (video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
    recoveryAttempts = 0;
    clearTimers();
    setState('playing');
  };

  const waitForPresentedFrame = () => {
    if (frameCallbackPending) return;

    if (typeof video.requestVideoFrameCallback === 'function') {
      frameCallbackPending = true;
      video.requestVideoFrameCallback(() => {
        frameCallbackPending = false;
        markPresentedFrame();
      });
      return;
    }

    if (video.currentTime > 0) markPresentedFrame();
  };

  const configureSource = (forceReload = false) => {
    const variant: HeroVariant = mobileQuery.matches ? 'mobile' : 'desktop';
    const source = getSource(video, variant);
    const poster = getPoster(video, variant);

    root.dataset.videoVariant = variant;
    if (poster) video.poster = poster;

    if (!source) {
      currentSource = null;
      setState('unsupported');
      return false;
    }

    if (!forceReload && currentVariant === variant && currentSource === source) return true;

    video.pause();
    setState(forceReload ? 'recovering' : 'loading');
    currentVariant = variant;
    currentSource = source;
    root.dataset.videoSource = source;

    const recoveryUrl =
      forceReload && recoveryAttempts > 0
        ? `${source}${source.includes('?') ? '&' : '?'}recovery=${recoveryAttempts}`
        : source;
    video.src = recoveryUrl;
    video.load();
    return true;
  };

  const attemptPlayback = async () => {
    if (reducedMotionQuery.matches) {
      video.pause();
      setState('reduced-motion');
      return;
    }

    if (saveData) {
      video.pause();
      setState('save-data');
      return;
    }

    if (!shouldPlay()) {
      video.pause();
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    if (!configureSource()) return;

    try {
      await video.play();
      waitForPresentedFrame();
    } catch {
      setState('poster');
    }
  };

  const recoverPlayback = () => {
    if (!shouldPlay() || recoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
      setState('poster');
      return;
    }

    recoveryAttempts += 1;
    clearTimers();
    setState('recovering');
    configureSource(true);
    recoveryTimer = window.setTimeout(() => void attemptPlayback(), 250 * recoveryAttempts);
  };

  const scheduleStallRecovery = () => {
    if (!shouldPlay() || stallTimer !== undefined) return;
    stallTimer = window.setTimeout(() => {
      stallTimer = undefined;
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) recoverPlayback();
    }, STALL_TIMEOUT_MS);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearTimers();
      video.pause();
      return;
    }
    void attemptPlayback();
  };

  const handlePageHide = () => {
    clearTimers();
    video.pause();
  };

  const handlePageShow = () => {
    if (video.readyState === HTMLMediaElement.HAVE_NOTHING && currentSource) {
      configureSource(true);
    }
    void attemptPlayback();
  };

  const handleVariantChange = () => {
    recoveryAttempts = 0;
    currentVariant = null;
    currentSource = null;
    clearTimers();
    setState('poster');

    if (reducedMotionQuery.matches) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    void attemptPlayback();
  };

  const handleCanPlay = () => clearStallTimer();

  const observer = new IntersectionObserver(
    ([entry]) => {
      isIntersecting = Boolean(entry?.isIntersecting);
      if (!isIntersecting) {
        clearTimers();
        video.pause();
        return;
      }
      void attemptPlayback();
    },
    { threshold: 0.05 },
  );

  video.addEventListener('playing', waitForPresentedFrame);
  video.addEventListener('timeupdate', markPresentedFrame);
  video.addEventListener('canplay', handleCanPlay);
  video.addEventListener('waiting', scheduleStallRecovery);
  video.addEventListener('stalled', scheduleStallRecovery);
  video.addEventListener('error', recoverPlayback);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', handlePageHide);
  window.addEventListener('pageshow', handlePageShow);
  const removeMobileListener = addMediaQueryListener(mobileQuery, handleVariantChange);
  const removeMotionListener = addMediaQueryListener(reducedMotionQuery, handleVariantChange);
  observer.observe(root);

  void attemptPlayback();

  return () => {
    clearTimers();
    observer.disconnect();
    removeMobileListener();
    removeMotionListener();
    video.pause();
    video.removeEventListener('playing', waitForPresentedFrame);
    video.removeEventListener('timeupdate', markPresentedFrame);
    video.removeEventListener('canplay', handleCanPlay);
    video.removeEventListener('waiting', scheduleStallRecovery);
    video.removeEventListener('stalled', scheduleStallRecovery);
    video.removeEventListener('error', recoverPlayback);
    video.removeAttribute('src');
    video.load();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pagehide', handlePageHide);
    window.removeEventListener('pageshow', handlePageShow);
  };
};

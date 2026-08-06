type NavigatorWithSaveData = Navigator & {
  connection?: { saveData?: boolean };
};

export function initActualMediaVideos(rootNode: ParentNode = document) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean((navigator as NavigatorWithSaveData).connection?.saveData);

  rootNode.querySelectorAll<HTMLElement>('[data-actual-video]').forEach((root) => {
    if (root.dataset.videoInitialized === 'true') return;

    const video = root.querySelector<HTMLVideoElement>('[data-actual-video-element]');
    if (!video) return;
    root.dataset.videoInitialized = 'true';

    let isVisible = false;
    let userPaused = false;
    const videoDescription = root.dataset.videoDescription ?? 'event detail';

    const setState = (state: string) => {
      root.dataset.videoState = state;
    };

    const setControlState = (paused: boolean) => {
      root.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} motion: ${videoDescription}`);
    };

    const disableMotionControl = (state: 'reduced-motion' | 'save-data') => {
      video.pause();
      root.removeAttribute('role');
      root.removeAttribute('aria-label');
      root.removeAttribute('tabindex');
      setState(state);
    };

    const disableUnavailableControl = () => {
      video.pause();
      root.removeAttribute('role');
      root.removeAttribute('aria-label');
      root.removeAttribute('tabindex');
      setState('unsupported');
    };

    const loadVideo = () => {
      if (video.getAttribute('src')) return true;
      const source = video.dataset.srcMp4;
      if (!source || !video.canPlayType('video/mp4')) return false;
      video.src = source;
      video.load();
      return true;
    };

    const attemptPlayback = async () => {
      if (reducedMotion.matches) {
        disableMotionControl('reduced-motion');
        return;
      }
      if (saveData) {
        disableMotionControl('save-data');
        return;
      }

      root.setAttribute('role', 'button');
      root.setAttribute('tabindex', '0');
      setControlState(video.paused);
      if (!isVisible || document.hidden || userPaused) {
        video.pause();
        return;
      }
      if (!loadVideo()) {
        disableUnavailableControl();
        return;
      }

      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setState('playing');
        setControlState(false);
        return;
      }
      setState('loading');
      try {
        await video.play();
        setState('playing');
        setControlState(false);
      } catch {
        setState('poster');
        setControlState(true);
      }
    };

    const togglePlayback = () => {
      if (video.paused) {
        userPaused = false;
        void attemptPlayback();
        return;
      }
      userPaused = true;
      video.pause();
      setState('paused');
      setControlState(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (!isVisible) {
          video.pause();
          setState('paused');
          setControlState(true);
          return;
        }
        void attemptPlayback();
      },
      { rootMargin: '120px 0px', threshold: 0.2 },
    );

    video.addEventListener('playing', () => {
      setState('playing');
      setControlState(false);
    });
    video.addEventListener('error', () => {
      setState('poster');
      setControlState(true);
    });
    root.addEventListener('click', togglePlayback);
    root.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      togglePlayback();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else void attemptPlayback();
    });
    window.addEventListener('pagehide', () => video.pause());
    window.addEventListener('pageshow', () => void attemptPlayback());
    reducedMotion.addEventListener('change', () => void attemptPlayback());
    observer.observe(root);
  });
}

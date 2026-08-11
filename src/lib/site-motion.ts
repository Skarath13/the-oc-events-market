export function initSiteMotion(rootNode: Document | HTMLElement = document) {
  const targets = Array.from(rootNode.querySelectorAll<HTMLElement>('[data-site-reveal]'));
  if (targets.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = (target: HTMLElement) => {
    target.dataset.siteReveal = 'visible';
  };
  const revealAll = () => {
    document.body.removeAttribute('data-site-motion');
    targets.forEach(reveal);
  };

  if (reducedMotion.matches || typeof window.IntersectionObserver !== 'function') {
    revealAll();
    return;
  }

  const viewportRevealLine = () => window.innerHeight * 0.92;
  const pendingTargets = new Set(
    targets.filter((target) => {
      const bounds = target.getBoundingClientRect();
      if (bounds.top <= viewportRevealLine() && bounds.bottom >= 0) {
        reveal(target);
        return false;
      }
      return true;
    }),
  );

  document.body.dataset.siteMotion = 'ready';

  let scrollFrame = 0;
  const revealTarget = (target: HTMLElement) => {
    reveal(target);
    pendingTargets.delete(target);
    observer.unobserve(target);
    if (pendingTargets.size === 0) {
      window.removeEventListener('scroll', onScroll);
      rootNode.removeEventListener('focusin', onFocusIn);
      window.cancelAnimationFrame(scrollFrame);
    }
  };
  const revealPassedTargets = () => {
    scrollFrame = 0;
    for (const target of pendingTargets) {
      if (target.getBoundingClientRect().top <= viewportRevealLine()) revealTarget(target);
    }
  };
  function onScroll() {
    if (scrollFrame !== 0) return;
    scrollFrame = window.requestAnimationFrame(revealPassedTargets);
  }
  function onFocusIn(event: Event) {
    const focused = event.target;
    if (!(focused instanceof Element)) return;
    const target = focused.closest<HTMLElement>('[data-site-reveal]');
    if (target && pendingTargets.has(target)) revealTarget(target);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealTarget(entry.target as HTMLElement);
      }
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.01 },
  );

  pendingTargets.forEach((target) => observer.observe(target));
  window.addEventListener('scroll', onScroll, { passive: true });
  rootNode.addEventListener('focusin', onFocusIn);
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    window.removeEventListener('scroll', onScroll);
    rootNode.removeEventListener('focusin', onFocusIn);
    window.cancelAnimationFrame(scrollFrame);
    revealAll();
  });
}

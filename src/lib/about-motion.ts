export function initAboutMotion(rootNode: ParentNode = document) {
  const targets = Array.from(rootNode.querySelectorAll<HTMLElement>('[data-about-reveal]'));
  if (targets.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = (target: HTMLElement) => {
    target.dataset.aboutReveal = 'visible';
  };
  const revealAll = () => {
    document.body.removeAttribute('data-about-motion');
    targets.forEach(reveal);
  };

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  const viewportRevealLine = window.innerHeight * 0.92;
  const pendingTargets = targets.filter((target) => {
    const bounds = target.getBoundingClientRect();
    if (bounds.top <= viewportRevealLine && bounds.bottom >= 0) {
      reveal(target);
      return false;
    }
    return true;
  });

  document.body.dataset.aboutMotion = 'ready';

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  pendingTargets.forEach((target) => observer.observe(target));
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    revealAll();
  });
}

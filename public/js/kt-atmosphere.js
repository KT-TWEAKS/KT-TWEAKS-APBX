export function shouldAnimate({ reducedMotion, hidden, focusMode }) {
  return !reducedMotion && !hidden && !focusMode;
}

if (typeof document !== 'undefined') {
  const canvas = document.querySelector('[data-kt-atmosphere]');
  if (canvas instanceof HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let particles = [];

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * scale));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context?.setTransform(scale, 0, 0, scale, 0, 0);
      const count = Math.min(44, Math.max(18, Math.round(window.innerWidth / 34)));
      particles = Array.from({ length: count }, (_, index) => ({ x: ((index * 71) % window.innerWidth) + 4, y: ((index * 113) % window.innerHeight) + 4, radius: 0.6 + (index % 4) * 0.35, drift: 0.05 + (index % 5) * 0.018, phase: index * 0.74 }));
    };

    const paint = (time) => {
      if (!context) return;
      const focusMode = document.body.classList.contains('focus-mode');
      if (!shouldAnimate({ reducedMotion: media.matches, hidden: document.hidden, focusMode })) { frame = 0; return; }
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle) => {
        const y = (particle.y - time * particle.drift * 0.026 + window.innerHeight) % window.innerHeight;
        const alpha = 0.14 + Math.sin(time * 0.001 + particle.phase) * 0.08;
        context.beginPath();
        context.fillStyle = `rgba(197, 165, 255, ${alpha})`;
        context.arc(particle.x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(paint);
    };
    const start = () => { if (!frame) frame = window.requestAnimationFrame(paint); };
    const refresh = () => { window.cancelAnimationFrame(frame); frame = 0; start(); };
    resize(); start();
    window.addEventListener('resize', () => { resize(); refresh(); }, { passive: true });
    document.addEventListener('visibilitychange', refresh);
    media.addEventListener?.('change', refresh);
  }
}

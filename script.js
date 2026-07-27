// ============================================================
// Nav: sticky background state + mobile toggle
// ============================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

const onScrollNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
};
onScrollNav();
window.addEventListener('scroll', onScrollNav, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Scroll "scrubber" — progress bar + playhead styled like a
// video editing timeline scrubber (signature element)
// ============================================================
const scrubberFill = document.getElementById('scrubberFill');
const scrubberPlayhead = document.getElementById('scrubberPlayhead');

const updateScrubber = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrubberFill.style.width = progress + '%';
  scrubberPlayhead.style.left = progress + '%';
};
updateScrubber();
window.addEventListener('scroll', updateScrubber, { passive: true });
window.addEventListener('resize', updateScrubber);

// ============================================================
// Reveal-on-scroll animations
// ============================================================
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ============================================================
// Reel thumbnails: placeholder click handler
// (wire up real YouTube embeds/links here later)
// ============================================================
document.querySelectorAll('.reel-thumb').forEach(thumb => {
  const trigger = () => {
    // Replace with: window.open('YOUR_YOUTUBE_URL', '_blank')
    console.log('Play project:', thumb.getAttribute('aria-label'));
  };
  thumb.addEventListener('click', trigger);
  thumb.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger();
    }
  });
});

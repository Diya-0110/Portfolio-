// ============================================================
// Project data
// ============================================================
const projects = [
  {
    title: "Dot & Key",
    category: "AI Brand Strategy",
    url: "https://youtu.be/sWrJrOZKcLA",
    id: "sWrJrOZKcLA",
    desc: "An independent AI-driven exploration of how a modern skincare identity could tell its story differently — reimagining brand strategy through cinematic visual language."
  },
  {
    title: "Birbhum",
    category: "Documentary",
    url: "https://youtu.be/2-mHbZySU8I",
    id: "2-mHbZySU8I",
    desc: "A cinematic AI documentary tracing the culture, craft and identity of Birbhum, West Bengal — history rendered through generative imagery."
  },
  {
    title: "AI Lab",
    category: "Future Education",
    url: "https://youtu.be/oYCRyEDsTuM",
    id: "oYCRyEDsTuM",
    desc: "A speculative look at what classrooms could become when AI reshapes how curiosity is taught."
  },
  {
    title: "History's Biggest Lies — Episode 3",
    category: "History Documentary",
    url: "https://youtu.be/oYCRyEDsTuM",
    id: "oYCRyEDsTuM",
    desc: "Part three of a documentary series unraveling the myths history chose to remember."
  },
  {
    title: "History's Biggest Lies — Episode 2",
    category: "History Documentary",
    url: "https://youtu.be/oU_Vd_gymiE",
    id: "oU_Vd_gymiE",
    desc: "Part two of the series, tracing how a single distortion can reshape decades of belief."
  },
  {
    title: "History's Biggest Lies — Episode 1",
    category: "History Documentary",
    url: "https://youtu.be/SWn6p2_IwUU",
    id: "SWn6p2_IwUU",
    desc: "The series opener — a cinematic investigation into one of history's most repeated lies."
  },
  {
    title: "Dinosaur Planet",
    category: "AI Documentary",
    url: "https://youtu.be/ZiCUU2EcUzM",
    id: "ZiCUU2EcUzM",
    desc: "A world-building experiment imagining prehistoric life through generative cinematography."
  },
  {
    title: "The Great Indian Maggi Riot",
    category: "Speculative Documentary",
    url: "https://youtu.be/2xRxy5b1OEQ",
    id: "2xRxy5b1OEQ",
    desc: "A speculative documentary reimagining one of India's biggest consumer controversies as investigative cinema."
  },
  {
    title: "LEGO",
    category: "AI Film",
    url: "https://youtu.be/Jiv6xIN8zQA",
    id: "Jiv6xIN8zQA",
    desc: "A LEGO-inspired concept film visualizing the future of AI-powered education."
  },
  {
    title: "Blue Tokai × Morphy Richards",
    category: "Brand Film",
    url: "https://youtube.com/shorts/jBSMz7vzjcM",
    id: "jBSMz7vzjcM",
    desc: "An independently conceived brand film pairing two everyday rituals — coffee and appliances — into one cinematic short."
  },
  {
    title: "Brain Rot",
    category: "Satirical AI Short",
    url: "https://youtube.com/shorts/fD1KBMJcr8o",
    id: "fD1KBMJcr8o",
    desc: "A satirical short poking fun at internet culture, made entirely with generative video."
  },
  {
    title: "3D Plant Cell",
    category: "Educational Visualization",
    url: "https://youtube.com/shorts/TDeeg4QdNm0",
    id: "TDeeg4QdNm0",
    desc: "An interactive 3D visualization turning a biology textbook diagram into an explorable cinematic experience."
  },
  {
    title: "Dada Dev Series",
    category: "Educational Playlist",
    url: "https://youtube.com/playlist?list=PLZ8ONE5qeEVk",
    id: null,
    desc: "An ongoing playlist breaking down how AI tools actually get built, one experiment at a time."
  }
];

const playIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const arrowIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>`;

const grid = document.getElementById('projectGrid');

const cardsHtml = projects.map(p => {
  const thumbSrc = p.id
    ? `https://img.youtube.com/vi/${p.id}/maxresdefault.jpg`
    : '';
  const thumbInner = p.id
    ? `<img src="${thumbSrc}" alt="${p.title} thumbnail" loading="lazy" data-video-id="${p.id}">`
    : `<span class="project-thumb-fallback">${p.category}</span>`;

  return `
    <article class="project-card reveal" data-reveal>
      <a class="project-thumb" href="${p.url}" target="_blank" rel="noopener" aria-label="Watch ${p.title} on YouTube">
        ${thumbInner}
        <span class="play-btn">${playIcon}</span>
      </a>
      <div class="project-body">
        <p class="project-category">${p.category}</p>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <a class="project-link" href="${p.url}" target="_blank" rel="noopener">Watch on YouTube ${arrowIcon}</a>
      </div>
    </article>
  `;
}).join('');

grid.innerHTML = cardsHtml;

// Fallback chain for YouTube thumbnails: maxres -> hq -> mq -> default
grid.querySelectorAll('img[data-video-id]').forEach(img => {
  const id = img.getAttribute('data-video-id');
  const fallbacks = [
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/default.jpg`
  ];
  img.addEventListener('error', function onError() {
    const next = fallbacks.shift();
    if (next) {
      img.src = next;
    } else {
      img.removeEventListener('error', onError);
    }
  });
});

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
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ============================================================
// Scene rail — active section tracking (signature nav element)
// ============================================================
const sceneLinks = document.querySelectorAll('.scene-rail a');
const sections = ['hero', 'work', 'about', 'contact'].map(id => document.getElementById(id));

if ('IntersectionObserver' in window && sceneLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        sceneLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => section && sectionObserver.observe(section));
}

// ============================================================
// Opening title card — remove from DOM after animation completes
// ============================================================
const titlecard = document.getElementById('titlecard');
if (titlecard) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    titlecard.remove();
  } else {
    setTimeout(() => titlecard.remove(), 2400);
  }
}

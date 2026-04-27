/**
 * ============================================================
 *  GRUPO SOLUCIONES ÉLITE — app.js
 *  Three.js 3D Drone · Mouse parallax · Scroll animations
 *  Counter · FAQ accordion · WhatsApp · Nav · Cursor glow
 * ============================================================
 */

'use strict';

/* ── Helpers ────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;

/* ── SVG Icon Map ───────────────────────────────────────── */
const ICONS = {
  camera: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  leaf: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22c5.333-5.333 8-10.667 8-16a8 8 0 0112 0c0 5.333-2.667 10.667-8 16"/><path d="M2 22l10-10"/></svg>`,
  inspect: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  map: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  home: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  shield: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  award: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  rocket: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  database: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  lightning: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  building: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2" width="18" height="20" rx="1"/><path d="M9 22V12h6v10"/><rect x="7" y="6" width="3" height="3"/><rect x="14" y="6" width="3" height="3"/><rect x="7" y="13" width="3" height="3"/><rect x="14" y="13" width="3" height="3"/></svg>`,
  sun: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  target: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  eye: `<svg class="card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .95h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
};

/* ============================================================
   1. SEO — canonical, og:url, og:image, JSON-LD (desde data.js)
   ============================================================ */
function initSEO() {
  const url = (GSE.siteUrl || '').replace(/\/$/, '');
  const e   = GSE.empresa;
  const image = url + '/img/gse-favicon.png';

  /* ── Canonical ────────────────────────────────────────── */
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url + '/';

  /* ── Helper: actualiza o crea una <meta> ──────────────── */
  const setMeta = (selector, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      // selector tiene forma [property="og:url"] o [name="twitter:image"]
      const m = selector.match(/\[([^=]+)="([^"]+)"\]/);
      if (m) el.setAttribute(m[1], m[2]);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  setMeta('meta[property="og:url"]',    url + '/');
  setMeta('meta[property="og:image"]',  image);
  setMeta('meta[name="twitter:image"]', image);

  /* ── JSON-LD LocalBusiness ────────────────────────────── */
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: e.nombre,
    description: e.descripcion,
    url: url + '/',
    logo: url + '/img/gse-logo.png',
    image: image,
    telephone: e.whatsapp,
    email: e.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Pedro Sula',
      addressRegion: 'Cortés',
      addressCountry: 'HN',
    },
    areaServed: { '@type': 'Country', name: 'Honduras' },
    sameAs: [
      'https://www.instagram.com/' + e.instagram,
      'https://www.facebook.com/' + e.facebook,
    ],
    openingHours: 'Mo-Fr 08:00-17:00',
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios con Drones',
      itemListElement: GSE.servicios.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.titulo },
      })),
    },
  };

  /* ── JSON-LD FAQPage (las preguntas de data.js sirven para Google) ── */
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GSE.preguntas.map(q => ({
      '@type': 'Question',
      name: q.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: q.respuesta },
    })),
  };

  [localBusiness, faqPage].forEach(schema => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  });
}

/* ============================================================
   2. CONTENT POPULATION  (from data.js → GSE)
   ============================================================ */
function populateContent() {
  const d = GSE;
  const wa = `https://wa.me/${d.empresa.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(d.empresa.whatsappMensaje)}`;

  // --- Nav ----
  const brand = $('#nav-brand');
  if (brand) brand.textContent = d.empresa.nombre;

  // WhatsApp links
  ['#nav-wa-btn','#hero-wa-btn','#mob-wa-btn','#contact-wa-btn','#floating-wa'].forEach(id => {
    const el = $(id);
    if (el) el.href = wa;
  });

  // --- Hero ---
  const badge = $('#hero-badge');
  if (badge) badge.textContent = d.hero.badge;

  const title = $('#hero-title');
  if (title) title.innerHTML =
    `${d.hero.titulo}<br><span class="highlight">${d.hero.tituloDestacado}</span>`;

  const sub = $('#hero-sub');
  if (sub) sub.textContent = d.hero.subtitulo;

  const btnP = $('#hero-btn-primary');
  if (btnP) btnP.textContent = d.hero.botonPrimario;

  const btnS = $('#hero-btn-secondary');
  if (btnS) btnS.textContent = d.hero.botonSecundario;

  // --- Services ---
  const grid = $('#servicesGrid');
  if (grid) {
    grid.innerHTML = d.servicios.map((s, i) => `
      <article class="service-card reveal-up" role="listitem" style="transition-delay:${i * 0.07}s">
        <div class="service-icon">${ICONS[s.icono] || ''}</div>
        <h3 class="service-title">${s.titulo}</h3>
        <p class="service-desc">${s.descripcion}</p>
        <ul class="service-features">
          ${s.caracteristicas.map(f => `<li class="feature-item">${f}</li>`).join('')}
        </ul>
      </article>`).join('');
  }

  // --- Why Us ---
  const whyGrid = $('#whyGrid');
  if (whyGrid) {
    whyGrid.innerHTML = d.porQueNosotros.map((w, i) => `
      <article class="why-card reveal-up" role="listitem" style="transition-delay:${i * 0.09}s">
        <div class="why-icon">${ICONS[w.icono] || ''}</div>
        <h3 class="why-title">${w.titulo}</h3>
        <p class="why-desc">${w.descripcion}</p>
      </article>`).join('');
  }

  // --- Mission & Vision ---
  const mvGrid = $('#mvGrid');
  if (mvGrid) {
    const mv = d.misionVision;
    mvGrid.innerHTML = [mv.mision, mv.vision].map((item, i) => `
      <article class="mv-card reveal-up" style="transition-delay:${i * 0.15}s">
        <div class="mv-icon">${ICONS[item.icono] || ''}</div>
        <h3 class="mv-title">${item.titulo}</h3>
        <p class="mv-text">&ldquo;${item.texto}&rdquo;</p>
      </article>`).join('');
  }

  // --- FAQ ---
  const faqEl = $('#faqContainer');
  if (faqEl) {
    faqEl.innerHTML = d.preguntas.map((q, i) => `
      <div class="faq-item reveal-up" role="listitem" style="transition-delay:${i * 0.06}s">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${i}">
          <span>${q.pregunta}</span>
          <span class="faq-chevron" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </button>
        <div class="faq-answer" id="faq-ans-${i}" role="region">
          <p>${q.respuesta}</p>
        </div>
      </div>`).join('');
    initFAQ();
  }

  // --- Contact ---
  const cTitle = $('#contact-title');
  if (cTitle) cTitle.innerHTML = d.contacto.titulo.replace('Elevarte', '<span class="highlight" style="-webkit-text-fill-color:inherit;color:var(--c-gold)">Elevarte</span>');
  const cSub = $('#contact-sub');
  if (cSub) cSub.textContent = d.contacto.subtitulo;
  const cBtn = $('#contact-btn-text');
  if (cBtn) cBtn.textContent = d.contacto.boton;

  const cDetails = $('#contactDetails');
  if (cDetails) {
    const items = [
      { icon: ICONS.phone, text: d.empresa.telefono, href: `tel:${d.empresa.telefono.replace(/\s/,'')}` },
      { icon: ICONS.mail,  text: d.empresa.email,    href: `mailto:${d.empresa.email}` },
      { icon: ICONS.pin,   text: d.empresa.ubicacion, href: '#' },
    ];
    cDetails.innerHTML = items.map(it => `
      <a class="contact-chip" href="${it.href}" ${it.href !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        ${it.icon} ${it.text}
      </a>`).join('');
  }

  // --- Footer ---
  const fName = $('#footer-name');   if (fName) fName.textContent = d.empresa.nombre;
  const fSlog = $('#footer-slogan'); if (fSlog) fSlog.textContent = d.empresa.slogan;
  const fCopy = $('#footer-copy');   if (fCopy) fCopy.textContent = d.footer.texto;
}

/* ============================================================
   2. NAVIGATION
   ============================================================ */
function initNav() {
  const nav  = $('#navbar');
  const ham  = $('#hamburger');
  const menu = $('#mobileMenu');

  // Scroll: add glass effect
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Navbar blanco cuando se está sobre el hero con video de fondo
  const heroSection = $('#hero');
  if (heroSection) {
    const heroNavObs = new IntersectionObserver(([entry]) => {
      const hasVideo = heroSection.classList.contains('hero--dark-bg');
      nav.classList.toggle('nav--over-hero', entry.isIntersecting && hasVideo);
    }, { threshold: 0.15 });
    heroNavObs.observe(heroSection);
  }

  // Hamburger
  if (ham && menu) {
    ham.addEventListener('click', () => {
      const isOpen = ham.classList.toggle('open');
      ham.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        menu.removeAttribute('hidden');
      } else {
        menu.setAttribute('hidden', '');
      }
    });

    // Close on link click
    $$('.mob-link', menu).forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        menu.setAttribute('hidden', '');
      });
    });
  }

  // Smooth scroll for all internal anchors
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = $(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ============================================================
   3. CURSOR GLOW
   ============================================================ */
function initCursorGlow() {
  const glow = $('#cursorGlow');
  if (!glow || window.matchMedia('(pointer:coarse)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let tx = cx, ty = cy;

  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  (function animGlow() {
    cx = lerp(cx, tx, 0.08);
    cy = lerp(cy, ty, 0.08);
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animGlow);
  })();
}

/* ============================================================
   4. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe static elements
  $$('.reveal-up, .reveal-left, .section-header').forEach(el => {
    if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-left')) {
      el.classList.add('reveal-up');
    }
    io.observe(el);
  });

  // Re-observe after dynamic content is rendered
  const reObserve = () => {
    $$('.service-card, .why-card, .faq-item, .mv-card').forEach(el => io.observe(el));
  };
  setTimeout(reObserve, 100);

  // Hero items appear immediately
  setTimeout(() => {
    $$('#hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 200);
}

/* ============================================================
   5. COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.dataset.target;
      const isNumeric = /^[\d.]+$/.test(raw.replace(/[+,%]/g, ''));
      if (!isNumeric) return; // leave as-is (e.g. "24/7")

      const suffix  = raw.replace(/[\d.]/g, '');
      const end     = parseFloat(raw);
      const dur     = 1800;
      let   start   = null;

      const step = ts => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / dur, 1);
        // ease-out expo
        const ease = prog === 1 ? 1 : 1 - Math.pow(2, -10 * prog);
        const val  = Math.round(end * ease);
        el.textContent = val + suffix;
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });

  const observe = () => $$('.counter').forEach(el => counterIO.observe(el));
  setTimeout(observe, 150);
}

/* ============================================================
   6. FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all others
    $$('.faq-item.open').forEach(open => {
      if (open !== item) {
        open.classList.remove('open');
        open.querySelector('.faq-answer').style.maxHeight = '0';
        open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current
    item.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));

    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0';
    }
  });
}

/* ============================================================
   7. THREE.JS — 3D DRONE
   ============================================================ */
function initDrone() {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — 3D drone disabled');
    return;
  }

  const canvas = $('#droneCanvas');
  if (!canvas) return;

  // ── Renderer ──────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping     = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // ── Scene & Camera ────────────────────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 200);

  // Position camera so drone appears in upper-right viewport area
  camera.position.set(0, 0, 7);
  camera.lookAt(0, 0, 0);

  // ── Lighting ──────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);

  const sunLight = new THREE.DirectionalLight(0xfff8f0, 1.4);
  sunLight.position.set(6, 10, 6);
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0xd4e8ff, 0.5);
  fillLight.position.set(-8, 3, -4);
  scene.add(fillLight);

  const goldLight = new THREE.PointLight(0xC9A84C, 3, 12);
  goldLight.position.set(2, 3, 4);
  scene.add(goldLight);

  const rimLight = new THREE.PointLight(0x4B5320, 1.5, 10);
  rimLight.position.set(-3, -2, -3);
  scene.add(rimLight);

  // ── Materials ─────────────────────────────────────────────
  const matDark = new THREE.MeshStandardMaterial({
    color: 0x1a1f2e, metalness: 0.88, roughness: 0.18,
  });
  const matGold = new THREE.MeshStandardMaterial({
    color: 0xC9A84C, metalness: 0.95, roughness: 0.08,
  });
  const matGray = new THREE.MeshStandardMaterial({
    color: 0x2e2e3a, metalness: 0.72, roughness: 0.28,
  });
  const matProp = new THREE.MeshStandardMaterial({
    color: 0x0d0d12, metalness: 0.25, roughness: 0.55,
    transparent: true, opacity: 0.86,
  });
  const matLens = new THREE.MeshPhysicalMaterial({
    color: 0x5599dd, metalness: 0, roughness: 0,
    transmission: 0.88, transparent: true, ior: 1.5,
  });
  const matLedGreen = new THREE.MeshStandardMaterial({
    color: 0x00ff66, emissive: 0x00ff66, emissiveIntensity: 3,
  });
  const matLedRed = new THREE.MeshStandardMaterial({
    color: 0xff2222, emissive: 0xff2222, emissiveIntensity: 3,
  });

  // ── Helper to build mesh ──────────────────────────────────
  const mesh = (geo, mat, { x=0,y=0,z=0, rx=0,ry=0,rz=0, sx=1,sy=1,sz=1 } = {}) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.scale.set(sx, sy, sz);
    return m;
  };

  // ── Build Drone ───────────────────────────────────────────
  const droneGroup  = new THREE.Group();
  const propGroups  = [];

  // — Body —
  droneGroup.add(mesh(new THREE.BoxGeometry(0.42, 0.14, 0.42), matDark));

  // Top gold plate
  droneGroup.add(mesh(new THREE.BoxGeometry(0.36, 0.036, 0.36), matGold, { y: 0.088 }));

  // Top dome / sensor
  droneGroup.add(mesh(new THREE.SphereGeometry(0.075, 20, 12, 0, Math.PI*2, 0, Math.PI/2), matGold, { y: 0.106 }));

  // Battery pack
  droneGroup.add(mesh(new THREE.BoxGeometry(0.24, 0.1, 0.30), matGray, { y: -0.12 }));

  // Antennas
  const antGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.22, 6);
  droneGroup.add(mesh(antGeo, matGold, { x:  0.09, y: 0.21, z: -0.11, rz:  0.22 }));
  droneGroup.add(mesh(antGeo, matGold, { x: -0.09, y: 0.21, z: -0.11, rz: -0.22 }));

  // — Arms & Props — at 45° / 135° / 225° / 315°
  const ARM_LEN  = 0.62;
  const ARM_ANG  = [Math.PI*0.25, Math.PI*0.75, Math.PI*1.25, Math.PI*1.75];
  const UP_VEC   = new THREE.Vector3(0, 1, 0);

  ARM_ANG.forEach((angle, i) => {
    const cx = Math.cos(angle);
    const cz = Math.sin(angle);

    // Arm cylinder (Y-axis → rotated to XZ plane)
    const armGeo = new THREE.CylinderGeometry(0.017, 0.017, ARM_LEN, 8);
    const armMesh = new THREE.Mesh(armGeo, matDark);
    armMesh.quaternion.setFromUnitVectors(UP_VEC, new THREE.Vector3(cx, 0, cz));
    armMesh.position.set(cx * ARM_LEN * 0.5, 0, cz * ARM_LEN * 0.5);
    droneGroup.add(armMesh);

    // Motor housing (outer)
    const tipX = cx * ARM_LEN;
    const tipZ = cz * ARM_LEN;
    droneGroup.add(mesh(new THREE.CylinderGeometry(0.062, 0.055, 0.07, 16), matGold, { x:tipX, y:0.038, z:tipZ }));
    // Motor inner
    droneGroup.add(mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.042, 16), matDark, { x:tipX, y:0.054, z:tipZ }));

    // LEDs at arm tips
    const ledMat = i < 2 ? matLedGreen : matLedRed;
    droneGroup.add(mesh(new THREE.SphereGeometry(0.013, 8, 8), ledMat, { x:tipX, y:0.045, z:tipZ }));

    // Propeller group
    const pg = new THREE.Group();
    pg.position.set(tipX, 0.10, tipZ);

    // 2 blades
    for (let b = 0; b < 2; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.009, 0.052), matProp);
      blade.rotation.y = b * Math.PI;
      blade.rotation.x = b % 2 === 0 ? 0.13 : -0.13;
      pg.add(blade);
    }

    droneGroup.add(pg);
    propGroups.push({ grp: pg, dir: i % 2 === 0 ? 1 : -1 });
  });

  // — Gimbal stem —
  droneGroup.add(mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.16, 8), matDark, { y: -0.20 }));

  // — Camera ball —
  droneGroup.add(mesh(new THREE.SphereGeometry(0.068, 24, 24), matGray, { y: -0.285 }));

  // — Lens —
  const lensM = mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.052, 16), matLens, {
    x: 0.042, y: -0.285, rz: Math.PI / 2,
  });
  droneGroup.add(lensM);

  // — Landing legs —
  const legPositions = [[-0.13,-0.13],[0.13,-0.13],[-0.13,0.13],[0.13,0.13]];
  legPositions.forEach(([lx, lz]) => {
    droneGroup.add(mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.26, 6), matDark, { x:lx, y:-0.24, z:lz }));
    droneGroup.add(mesh(new THREE.SphereGeometry(0.02, 8, 8), matDark, { x:lx, y:-0.37, z:lz }));
  });

  // — Position drone: upper-right area so it doesn't cover text —
  // In screen space: center-right, high up
  droneGroup.position.set(0, 0.4, 0);
  droneGroup.scale.setScalar(1.25);

  scene.add(droneGroup);

  // ── Mouse tracking ────────────────────────────────────────
  let mouse   = { x: 0, y: 0 };
  let smooth  = { x: 0, y: 0 };
  let lastMouseY = 0;

  const onMouseMove = e => {
    // Normalize: -1 to 1
    mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    lastMouseY = e.clientY;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // En móvil no seguimos el touch — el dron se queda fijo
  const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // ── Clock & state ─────────────────────────────────────────
  const clock = new THREE.Clock();
  let   frameId = 0;

  // ── Render loop ───────────────────────────────────────────
  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth lerp mouse (solo desktop)
    if (!isMobile) {
      smooth.x = lerp(smooth.x, mouse.x, 0.045);
      smooth.y = lerp(smooth.y, mouse.y, 0.045);
    }

    // Float: sine wave
    const floatY = Math.sin(t * 0.75) * 0.12 + Math.cos(t * 0.38) * 0.05;

    if (isMobile) {
      // Móvil: dron fijo en esquina superior-derecha, flota suavemente
      droneGroup.position.x = lerp(droneGroup.position.x,  0.55, 0.04);
      droneGroup.position.y = lerp(droneGroup.position.y,  0.60 + floatY, 0.04);
      droneGroup.position.z = lerp(droneGroup.position.z,  0, 0.04);
      droneGroup.rotation.x = lerp(droneGroup.rotation.x,  0.08, 0.04);
      droneGroup.rotation.y = lerp(droneGroup.rotation.y,  t * 0.04, 0.04);
      droneGroup.rotation.z = lerp(droneGroup.rotation.z,  0, 0.04);
    } else {
      // Desktop: sigue al mouse
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const targetX = smooth.x * halfW * 0.82;
      const targetYPos = smooth.y * halfH * 0.82 + 0.99 + floatY;
      droneGroup.position.x = lerp(droneGroup.position.x, targetX, 0.08);
      droneGroup.position.y = lerp(droneGroup.position.y, targetYPos, 0.08);
      droneGroup.position.z = lerp(droneGroup.position.z, smooth.x * 0.15, 0.06);
      // Tilt con el mouse
      droneGroup.rotation.x = lerp(droneGroup.rotation.x,  smooth.y * 0.22, 0.06);
      droneGroup.rotation.y = lerp(droneGroup.rotation.y, -smooth.x * 0.30 + t * 0.04, 0.06);
      droneGroup.rotation.z = lerp(droneGroup.rotation.z, -smooth.x * 0.10, 0.06);
    }

    // Spin propellers (speed varies with mouse movement)
    const speed = 0.30 + Math.abs(smooth.x) * 0.15;
    propGroups.forEach(({ grp, dir }) => {
      grp.rotation.y += speed * dir;
    });

    // Gold light pulse
    goldLight.intensity = 2.2 + Math.sin(t * 1.8) * 0.8;

    // Rim light follow
    rimLight.position.x = -smooth.x * 4;

    renderer.render(scene, camera);
  }

  animate();

  // ── Resize ────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  // Canvas siempre visible — el dron sigue al cursor en toda la página
  canvas.style.opacity = '1';
  canvas.style.pointerEvents = 'none';
}

/* ============================================================
   8. PARALLAX — subtle background on scroll
   ============================================================ */
function initParallax() {
  const orbs = $$('.hero-bg-orbs .orb');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.12;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ============================================================
   9. CARD MAGNETIC EFFECT
   ============================================================ */
function initMagneticCards() {
  $$('.service-card, .why-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2);
      const dy  = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `
        translateY(-8px)
        perspective(600px)
        rotateY(${dx * 5}deg)
        rotateX(${-dy * 4}deg)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .6s var(--ease-spring)';
      setTimeout(() => card.style.transition = '', 600);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ============================================================
   10. BUTTON RIPPLE EFFECT
   ============================================================ */
function initRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.glass-btn');
    if (!btn) return;

    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      left:${x}px;top:${y}px;
      width:4px;height:4px;
      border-radius:50%;
      background:rgba(255,255,255,0.5);
      transform:translate(-50%,-50%) scale(0);
      animation:rippleAnim .55s ease-out forwards;
      pointer-events:none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Inject ripple keyframe
  if (!$('#rippleStyle')) {
    const s = document.createElement('style');
    s.id = 'rippleStyle';
    s.textContent = `
      @keyframes rippleAnim {
        to { transform:translate(-50%,-50%) scale(60); opacity:0; }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ============================================================
   11. SECTION PROGRESS INDICATOR (nav underline)
   ============================================================ */
function initSectionHighlight() {
  const sections = $$('section[id]');
  const links    = $$('.nav-link');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => {
        const active = a.getAttribute('href') === `#${id}`;
        a.style.color   = active ? 'var(--c-gold)' : '';
        a.style.opacity = active ? '1' : '';
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
}

/* ============================================================
   12. TYPING ANIMATION (hero title)
   ============================================================ */
function initTypingEffect() {
  // Subtle shimmer on highlight spans
  $$('.highlight').forEach(el => {
    el.style.backgroundSize = '200% 100%';
    el.style.animation = 'shimmer 3s linear infinite';
  });

  if (!$('#shimmerStyle')) {
    const s = document.createElement('style');
    s.id = 'shimmerStyle';
    s.textContent = `
      @keyframes shimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ============================================================
   13. CONTACT FORM — populate select + AJAX Netlify submit
   ============================================================ */
function initContactForm() {
  const form    = $('#contactForm');
  const success = $('#formSuccess');
  if (!form) return;

  // Populate service select from GSE data
  const sel = form.querySelector('#f-service');
  if (sel) {
    GSE.servicios.forEach(s => {
      const opt = document.createElement('option');
      opt.value       = s.titulo;
      opt.textContent = s.titulo;
      sel.appendChild(opt);
    });
  }

  // AJAX submit to Netlify
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn   = $('#submitBtn');
    const label = $('#submit-label');
    if (btn) btn.disabled = true;
    if (label) label.textContent = 'Enviando...';

    try {
      await fetch('/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    new URLSearchParams(new FormData(form)).toString(),
      });
      form.hidden = true;
      if (success) success.removeAttribute('hidden');
    } catch {
      if (btn)   btn.disabled = false;
      if (label) label.textContent = 'Error — intenta de nuevo';
    }
  });
}

/* ============================================================
   14. HERO THEME — detecta video de fondo y ajusta texto
   ============================================================ */
function initHeroTheme() {
  const hero  = $('#hero');
  const video = hero ? hero.querySelector('.hero-bg-video') : null;
  if (!hero || !video) return;

  const activate = () => hero.classList.add('hero--dark-bg');
  const deactivate = () => hero.classList.remove('hero--dark-bg');

  // Si el src ya está definido en el HTML, activamos de inmediato
  const source = video.querySelector('source');
  if (source && source.src) activate();

  // Confirmamos cuando el video carga datos reales
  video.addEventListener('loadeddata', activate, { once: true });
  // Si falla (ej: archivo no existe) revertimos
  video.addEventListener('error', deactivate, { once: true });
}

/* ============================================================
   15. DRONE MODEL-VIEWER — mouse tracking en desktop + hélices
   ============================================================ */
function initDroneModelViewer() {
  const viewer = document.getElementById('droneModel');
  const wrap   = document.getElementById('heroDroneFloat');
  if (!viewer || !wrap) return;

  // Asignar el modelo desde data.js (cambia GSE.drone3DModel para cambiar el archivo)
  if (typeof GSE !== 'undefined' && GSE.drone3DModel) {
    viewer.setAttribute('src', GSE.drone3DModel);
  }

  // Hélices: activar animaciones cuando cargue el modelo
  const startAnims = () => {
    const anims = viewer.availableAnimations;
    if (anims && anims.length > 0) {
      const propAnim = anims.find(a => /prop|rotor|spin|helix/i.test(a)) || anims[0];
      viewer.animationName = propAnim;
      viewer.play({ repetitions: Infinity });
    }
  };
  if (viewer.loaded) startAnims();
  else viewer.addEventListener('load', startAnims, { once: true });

  const isMobile = window.matchMedia('(hover:none) and (pointer:coarse)').matches;
  if (isMobile) {
    // Móvil: esquina fija, solo rotación 360° continua
    initDroneFixedSpin(viewer, wrap);
    return;
  }

  const followMouse = typeof GSE !== 'undefined' ? GSE.droneFollowsMouse !== false : true;
  if (followMouse) {
    initDroneMouseTrack(viewer, wrap);
  } else {
    initDroneFixedSpin(viewer, wrap);
  }
}

function initDroneMouseTrack(viewer, wrap) {
  const W = wrap.offsetWidth  || 300;
  const H = wrap.offsetHeight || 300;

  // Posición inicial: derecha-centro de la pantalla
  let tX = window.innerWidth  * 0.72;
  let tY = window.innerHeight * 0.30;
  let cX = tX, cY = tY;

  // Ángulos de cámara
  let tTheta = 0, tPhi = 75;
  let cTheta = 0, cPhi = 75;

  // Giro 360° continuo — acumulador que nunca para
  let autoSpin   = 0;    // ángulo acumulado (crece sin límite)
  let mouseOffsetTheta = 0, targetMouseOffset = 0;
  let idlePhi = 75;
  let mouseActive = false;
  let mouseIdleTimer = null;
  let lastFrame = performance.now();

  window.addEventListener('mousemove', e => {
    mouseActive = true;
    clearTimeout(mouseIdleTimer);
    mouseIdleTimer = setTimeout(() => { mouseActive = false; }, 2000);

    tX = e.clientX - W * 0.08;
    tY = e.clientY - H * 1.05;

    const nx =  (e.clientX / window.innerWidth  - 0.5) * 2;
    const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
    // Offset del mouse encima del giro base (±180° extra)
    targetMouseOffset = nx * 180;
    tPhi = 75 - ny * 55;  // ±55° vertical
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    mouseActive = false;
    tX = window.innerWidth  * 0.80;
    tY = window.innerHeight * 0.30;
    targetMouseOffset = 0;
    tPhi = 75;
  });

  wrap.style.right     = 'auto';
  wrap.style.top       = 'auto';
  wrap.style.transform = 'none';

  (function animDrone() {
    requestAnimationFrame(animDrone);
    const now  = performance.now();
    const dt   = Math.min((now - lastFrame) / 1000, 0.05); // segundos, máx 50ms
    lastFrame  = now;
    const t    = now / 1000;

    // Giro base continuo: 40°/s = vuelta completa en 9 s
    autoSpin += dt * 40;

    // Suavizar el offset del mouse
    mouseOffsetTheta = lerp(mouseOffsetTheta, mouseActive ? targetMouseOffset : 0, 0.06);

    // Phi: oscila ±12° sobre la posición del mouse para dar sensación de vuelo
    const targetPhi = (mouseActive ? tPhi : 75) + Math.sin(t * 0.9) * 12;

    cX = lerp(cX, tX, 0.08);
    cY = lerp(cY, tY, 0.08);
    cPhi = lerp(cPhi, targetPhi, 0.05);

    const finalTheta = autoSpin + mouseOffsetTheta;

    wrap.style.left = `${cX}px`;
    wrap.style.top  = `${cY}px`;
    viewer.cameraOrbit = `${finalTheta.toFixed(2)}deg ${cPhi.toFixed(2)}deg 105%`;
  })();
}

// Modo fijo: esquina superior derecha, rota 360°, sigue el scroll
function initDroneFixedSpin(viewer, wrap) {
  let autoSpin = 0;
  let lastFrame = performance.now();

  // Desactivar posicionamiento JS — dejar que CSS (fixed top-right) lo posicione
  wrap.style.left      = 'auto';
  wrap.style.top       = 'auto';
  wrap.style.right     = 'clamp(16px, 4vw, 60px)';
  wrap.style.top       = '2%';

  (function animFixed() {
    requestAnimationFrame(animFixed);
    const now = performance.now();
    const dt  = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;
    const t   = now / 1000;

    autoSpin += dt * 40; // 40°/s = vuelta completa cada ~9 s
    const phi = 75 + Math.sin(t * 0.7) * 15; // flotación vertical ±15°

    viewer.cameraOrbit = `${autoSpin.toFixed(2)}deg ${phi.toFixed(2)}deg 105%`;
  })();
}

/* ============================================================
   INIT — DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 0. SEO — canonical, og:url, og:image, JSON-LD desde data.js
  initSEO();

  // 1. Populate all content from data.js
  populateContent();

  // 2. Navigation behaviors
  initNav();

  // 3. Cursor glow (desktop only)
  initCursorGlow();

  // 4. Scroll reveal
  initScrollReveal();

  // 6. Parallax background
  initParallax();

  // 7. Ripple on buttons
  initRipple();

  // 8. Magnetic card tilt
  initMagneticCards();

  // 9. Active nav section
  initSectionHighlight();

  // 10. Highlight shimmer
  initTypingEffect();

  // 11. Contact form (Netlify AJAX)
  initContactForm();

  // 12. Drone 3D — model-viewer con mouse tracking y hélices
  initDroneModelViewer();

  // 13. Hero theme — texto claro si hay video de fondo
  initHeroTheme();
});

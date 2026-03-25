/* =====================================================
   PORTFOLIO — main.js
   ===================================================== */

// ── Navigation scroll state ──────────────────────────
const navbar    = document.getElementById('navbar');
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
if (navBurger && navMobile) {
  navBurger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    navBurger.classList.toggle('active', open);
    navBurger.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navMobile.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navBurger.classList.remove('active');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Active nav link ──────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[href]').forEach(link => {
  const href = link.getAttribute('href').split('#')[0];
  link.classList.toggle('active', href === currentPage);
});

// ── Scroll reveal ────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Also trigger for elements already in viewport on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 80);
});

// ── Skill bars animation ─────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill[data-width]');
if (skillFills.length) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(bar => skillObserver.observe(bar));
}

// ── Portfolio filter ─────────────────────────────────
const filterBtns    = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.style.transition = 'opacity .25s ease';
      if (show) {
        card.style.display = '';
        requestAnimationFrame(() => { card.style.opacity = '1'; });
      } else {
        card.style.opacity = '0';
        setTimeout(() => { card.style.display = 'none'; }, 260);
      }
    });
  });
});

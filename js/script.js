// ==========================================================
// BARNUKA — script.js
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Config ---------- */
  const WHATSAPP_LINK = 'https://chat.whatsapp.com/H9EcWsIiSov3H6viHPfjno';

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky Header Shadow on Scroll ---------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Back to Top ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = header.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Scroll Reveal Animations ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedEls.forEach(el => observer.observe(el));

  /* ---------- Toast Notification ---------- */
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ---------- Order Now Buttons -> WhatsApp ---------- */
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-product') || 'a product';
      const message = `Hi Barnuka! I'd like to order ${productName} (5 KG). Please share availability and price.`;
      const url = `${WHATSAPP_LINK}`;

      showToast(`Opening WhatsApp to order ${productName}...`);

      // Open WhatsApp group link (pre-filled text isn't supported on group invite links,
      // so we inform the user via toast and open the group).
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

});

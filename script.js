/**
 * PREMIUM CLIMATE COMFORT - Clean Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      // Hamburger animation
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';

        // Style for mobile open menu
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';

        // Hide menu
        navLinks.style.display = 'none';
      }
    });

    // Close menu on link click (mobile)
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          const spans = mobileToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
          navLinks.style.display = 'none';
        }
      });
    });

    // Reset styles on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
      } else if (!navLinks.classList.contains('active')) {
        navLinks.style.display = 'none';
      }
    });
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once for performance
        }
      });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers or reduced motion preference
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 4. Booking Form Submission Simulation
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');

  if (bookingForm && submitBtn) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.innerText;

      // Loading state
      submitBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite;">↻</span> Processing...';
      submitBtn.style.opacity = '0.8';
      submitBtn.style.pointerEvents = 'none';

      // Simulate API logic
      setTimeout(() => {
        submitBtn.innerText = 'Request Sent!';
        submitBtn.style.backgroundColor = '#10B981'; // Green success
        bookingForm.reset();

        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }, 3000);
      }, 1000);
    });

    // Add spinner keyframes dynamically
    const style = document.createElement('style');
    style.innerHTML = '@keyframes spin { 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }
});

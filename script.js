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

  // 4. EmailJS Initialization & Booking Form
  (function() {
    // Replace with your actual EmailJS Public Key
    emailjs.init({
      publicKey: "SJYzCD-ZeIoNKuWTo",
    });
  })();

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerText;
      
      // Loading state
      submitBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite;">↻</span> Sending...';
      submitBtn.disabled = true;

      // Prepare template parameters
      const templateParams = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        address: document.getElementById('address').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value
      };

      // Send via EmailJS
      // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual IDs
      emailjs.send('service_fa49917', 'template_enakqmn', templateParams)
        .then(function() {
          alert("✅ Your booking request has been sent successfully. Our technician will contact you soon.");
          bookingForm.reset();
        }, function(error) {
          alert("❌ Failed to send booking request. Please try again.");
          console.log('FAILED...', error);
        })
        .finally(function() {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Animation Helper for Loading Spinner (if not already present)
  if (!document.getElementById('form-spin-style')) {
    const style = document.createElement('style');
    style.id = 'form-spin-style';
    style.innerHTML = '@keyframes spin { 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  // 5. Feedback Form Submission
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = feedbackForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      // Loading state
      submitBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite;">↻</span> Sending...';
      submitBtn.style.opacity = '0.8';
      submitBtn.style.pointerEvents = 'none';

      // Simulate API logic
      setTimeout(() => {
        submitBtn.innerText = 'Feedback Sent, Thank You!';
        submitBtn.style.backgroundColor = '#10B981'; // Green success
        feedbackForm.reset();

        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }, 3000);
      }, 1000);
    });
  }
  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
});

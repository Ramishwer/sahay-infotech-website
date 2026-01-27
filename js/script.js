// ===================================
// MOBILE MENU TOGGLE
// ===================================

function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// ===================================
// DROPDOWN TOGGLE FOR MOBILE
// ===================================

document.querySelectorAll('.dropdown > .nav-link').forEach(dropdownLink => {
  dropdownLink.addEventListener('click', function(e) {
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = this.parentElement;
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      
      // Toggle active class
      dropdown.classList.toggle('active');
      
      // Close other dropdowns
      document.querySelectorAll('.dropdown.active').forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('active');
        }
      });
    }
  });
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    // Don't close if it's a dropdown toggle on mobile
    if (!link.parentElement.classList.contains('dropdown') || window.innerWidth > 768) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 768) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  }
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===================================

function setActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Set active nav on page load
window.addEventListener('load', setActiveNav);

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================

function showMessage(formId, message, type) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const messageDiv = form.querySelector('.form-message');
  if (!messageDiv) {
    const newDiv = document.createElement('div');
    newDiv.className = 'form-message';
    form.insertBefore(newDiv, form.firstChild);
    messageDiv = newDiv;
  }
  
  messageDiv.textContent = message;
  messageDiv.className = `form-message ${type} show`;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.classList.remove('show');
  }, 5000);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = 'var(--danger)';
    } else {
      input.style.borderColor = '';
    }
    
    // Check email format
    if (input.type === 'email' && input.value && !validateEmail(input.value)) {
      isValid = false;
      input.style.borderColor = 'var(--danger)';
    }
  });
  
  return isValid;
}

function handleFormSubmit(e, formId) {
  e.preventDefault();
  
  if (!validateForm(formId)) {
    showMessage(formId, 'Please fill in all required fields correctly.', 'error');
    return;
  }
  
  // Simulate form submission
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  
  // Show success message
  showMessage(formId, 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
  
  // Reset form
  form.reset();
  
  // In a real application, you would send the form data to a server here
  // Example:
  // fetch('/api/contact', {
  //   method: 'POST',
  //   body: formData
  // }).then(...).catch(...)
}

// Attach form handlers
window.addEventListener('load', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact-form'));
  }
  
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => handleFormSubmit(e, 'newsletter-form'));
  }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

function animateOnScroll() {
  const elements = document.querySelectorAll('.card, .feature-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  elements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
}

window.addEventListener('load', animateOnScroll);

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Scroll to top button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show scroll to top button
function handleScrollButton() {
  const scrollButton = document.getElementById('scroll-to-top');
  if (!scrollButton) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  });
  
  scrollButton.addEventListener('click', scrollToTop);
}

window.addEventListener('load', handleScrollButton);

// ===================================
// PAGE TRANSITION ANIMATION
// ===================================

window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.3s';
});
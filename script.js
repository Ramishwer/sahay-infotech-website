// Toggle mobile menu
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Scroll to contact section
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({
    behavior: 'smooth'
  });
}

// Handle form submission
function submitForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Show success message
  const successMsg = document.createElement('div');
  successMsg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(16, 185, 129, 0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;
  successMsg.textContent = '✓ Thank you! Your message has been sent. We\'ll get back to you soon.';
  document.body.appendChild(successMsg);
  
  // Clear form
  form.reset();
  
  // Remove success message after 4 seconds
  setTimeout(() => {
    successMsg.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => successMsg.remove(), 300);
  }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add scroll animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service and portfolio cards
document.querySelectorAll('.service-card, .portfolio-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

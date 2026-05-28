// Intersection Observer for Reveal-on-Scroll animations
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => obs.observe(el));
setTimeout(() => document.querySelectorAll('#home .rv').forEach(el => el.classList.add('on')), 120);

// Click to Copy Functionality for Email and Phone Number
document.querySelectorAll('.clickable-direct').forEach(element => {
  element.addEventListener('click', async function() {
    const textToCopy = this.getAttribute('data-copy');
    const valSpan = this.querySelector('.direct-contact-val');
    
    if (!textToCopy) return;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      
      if (valSpan) {
        const originalText = valSpan.textContent;
        valSpan.textContent = 'Copied!';
        valSpan.style.color = 'var(--accent)';
        
        setTimeout(() => {
          valSpan.textContent = originalText;
          valSpan.style.color = '';
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  });
});

// EmailJS Setup and Form Submission Handling
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// Initialize EmailJS if keys are configured
if (typeof emailjs !== 'undefined' && PUBLIC_KEY && !PUBLIC_KEY.startsWith('YOUR_')) {
  emailjs.init(PUBLIC_KEY);
}

document.getElementById('cf').addEventListener('submit', function(e) {
  e.preventDefault();
  const fs = document.getElementById('fs');
  const btn = this.querySelector('.btn-submit-accent');
  
  // Style feedback text (using dark green for readability on green background)
  fs.style.color = '#062f17';
  fs.textContent = 'Sending message...';
  
  if (btn) btn.style.pointerEvents = 'none';

  // Helper function to handle submission success
  const handleSuccess = () => {
    fs.style.color = '#062f17';
    fs.textContent = '✓ Message sent! I\'ll get back to you soon.';
    this.reset();
    if (btn) btn.style.pointerEvents = 'auto';
  };

  // Helper function to handle submission error
  const handleError = (errorDetails) => {
    console.error('Email sending failed:', errorDetails);
    fs.style.color = '#7f1d1d';
    fs.textContent = 'Failed to send — please email me directly.';
    if (btn) btn.style.pointerEvents = 'auto';
  };

  // Check if keys are set. If not, simulate successfully sending for portfolio demonstration.
  if (!PUBLIC_KEY || PUBLIC_KEY.startsWith('YOUR_') || SERVICE_ID.startsWith('YOUR_') || typeof emailjs === 'undefined') {
    console.warn('EmailJS keys are not configured yet. Simulating success response for portfolio demo.');
    setTimeout(() => {
      handleSuccess();
    }, 1200);
  } else {
    // Send using real EmailJS service
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(
      () => {
        handleSuccess();
      },
      (error) => {
        handleError(error);
      }
    );
  }
});
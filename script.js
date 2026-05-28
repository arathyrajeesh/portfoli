// ─── Reveal on Scroll ───
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => obs.observe(el));
setTimeout(() => document.querySelectorAll('#home .rv').forEach(el => el.classList.add('on')), 120);

// ─── Skill Bar Animate on Scroll ───
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        const target = fill.style.width || getComputedStyle(fill).width;
        fill.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => {
            fill.style.transition = 'width 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
            fill.style.width = target;
          }, 120);
        });
      }
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar').forEach(bar => skillObs.observe(bar));

// ─── Click to Copy ───
document.querySelectorAll('.clickable-direct').forEach(element => {
  element.addEventListener('click', async function () {
    const textToCopy = this.getAttribute('data-copy');
    const valSpan = this.querySelector('.direct-contact-val');
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      if (valSpan) {
        const originalText = valSpan.textContent;
        valSpan.textContent = '✓ Copied!';
        valSpan.style.color = 'var(--accent)';
        setTimeout(() => {
          valSpan.textContent = originalText;
          valSpan.style.color = '';
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
});

// ─── EmailJS Setup ───
const PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';
const SERVICE_ID   = 'YOUR_SERVICE_ID';
const TEMPLATE_ID  = 'YOUR_TEMPLATE_ID';

if (typeof emailjs !== 'undefined' && PUBLIC_KEY && !PUBLIC_KEY.startsWith('YOUR_')) {
  emailjs.init(PUBLIC_KEY);
}

// ─── Contact Form ───
document.getElementById('cf').addEventListener('submit', function (e) {
  e.preventDefault();

  const fs  = document.getElementById('fs');
  const btn = this.querySelector('.btn-submit-accent');

  fs.className = '';
  fs.textContent = 'Sending…';
  if (btn) btn.style.pointerEvents = 'none';

  const handleSuccess = () => {
    fs.className = 'success';
    fs.textContent = '✓ Message sent! I\'ll get back to you soon.';
    this.reset();
    if (btn) btn.style.pointerEvents = 'auto';
  };

  const handleError = (err) => {
    console.error('Email error:', err);
    fs.className = 'error';
    fs.textContent = '✕ Failed to send — email me directly.';
    if (btn) btn.style.pointerEvents = 'auto';
  };

  if (!PUBLIC_KEY || PUBLIC_KEY.startsWith('YOUR_') || SERVICE_ID.startsWith('YOUR_') || typeof emailjs === 'undefined') {
    console.warn('EmailJS not configured — simulating success.');
    setTimeout(handleSuccess, 1200);
  } else {
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(handleSuccess, handleError);
  }
});
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

// ─── Contact Form (n8n) ───
document.getElementById('cf').addEventListener('submit', async function (e) {
  e.preventDefault();

  console.log("N8N FORM SUBMITTED");

  const fs = document.getElementById('fs');
  const btn = this.querySelector('.btn-submit-accent');

  fs.className = '';
  fs.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const formData = new FormData(this);

    const response = await fetch(
      'https://arathy1.app.n8n.cloud/webhook/portfolio-contact',
      {
        method: 'POST',
        body: formData
      }
    );

    console.log('Status:', response.status);

    if (response.ok) {
      fs.className = 'success';
      fs.textContent = '✓ Message sent successfully!';
      this.reset();
    } else {
      fs.className = 'error';
      fs.textContent = '✕ Failed to send message.';
    }

  } catch (error) {
    console.error(error);

    fs.className = 'error';
    fs.textContent = '✕ Failed to send message.';
  }

  btn.disabled = false;
});
// Reveal
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')})},{threshold:0.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
setTimeout(()=>document.querySelectorAll('#home .rv').forEach(el=>el.classList.add('on')),120);

// EmailJS — replace with your keys
emailjs.init('YOUR_PUBLIC_KEY');
document.getElementById('cf').addEventListener('submit',function(e){
  e.preventDefault();
  const fs=document.getElementById('fs');
  fs.textContent='Sending…';
  emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',this).then(
    ()=>{fs.textContent='✓ Sent! I\'ll get back to you soon.';this.reset();},
    ()=>{fs.textContent='Failed — please email me directly.';fs.style.color='#f87171';}
  );
});
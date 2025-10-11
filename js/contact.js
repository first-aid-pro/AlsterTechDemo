// Contact form behaviour (frontend-only demo)
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('contactMsg');
  const clearBtn = document.getElementById('clearBtn');

  function show(text, ok=true){
    msg.textContent = text;
    msg.style.color = ok ? 'green' : 'red';
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = {
      name: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      subject: form.elements['subject'].value.trim(),
      message: form.elements['message'].value.trim(),
      created: new Date().toISOString()
    };
    if(!data.name || !data.email || !data.message){ show('Bitte alle Pflichtfelder ausfüllen.', false); return; }
    // basic email check
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)){ show('Bitte eine gültige E‑Mail Adresse eingeben.', false); return; }

    // store to localStorage as demo (not sent to server)
    const submissions = JSON.parse(localStorage.getItem('contact_submissions')||'[]');
    submissions.push(data);
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));

    show('Deine Nachricht wurde (demo) gespeichert — wir melden uns bald.');
    form.reset();
  });

  clearBtn.addEventListener('click', ()=>{ form.reset(); msg.textContent = ''; });
});

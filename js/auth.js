document.addEventListener('DOMContentLoaded', ()=>{
document.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const msg = document.getElementById('authMsg');

  function showMsg(text, ok=true){
    msg.textContent = text;
    msg.style.color = ok ? 'green' : 'red';
  }

  if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const username = signupForm.elements['username'].value.trim();
      if(!username){ showMsg('Bitte einen Benutzernamen eingeben.', false); return; }
      showMsg('Registrierung simuliert. Du kannst dich jetzt einloggen.');
      signupForm.reset();
    });
  }

  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const username = loginForm.elements['username'].value.trim();
      if(!username){ showMsg('Bitte Benutzernamen eingeben.', false); return; }
      showMsg('Login simuliert – erfolgreich.');
      loginForm.reset();
    });
  }
});

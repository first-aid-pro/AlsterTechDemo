// Simulated auth UI: no network calls, only visual feedback
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
      // Simulate success without storing anything
      const username = signupForm.elements['username'].value.trim();
      if(!username){ showMsg('Bitte einen Benutzernamen eingeben.', false); return; }
      showMsg('Registrierung simuliert. Du kannst dich jetzt einloggen.');
      signupForm.reset();
    });
  }

  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      // Simulate login success for any non-empty input
      const username = loginForm.elements['username'].value.trim();
      if(!username){ showMsg('Bitte Benutzernamen eingeben.', false); return; }
      showMsg('Login simuliert – erfolgreich.');
      loginForm.reset();
    });
  }
});

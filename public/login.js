const form = document.getElementById('login-form');

form.addEventListener('submit', function(event) {
   event.preventDefault();

   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   if (email === '' || password === '') {
     return;
   }

   const isFirstTime = localStorage.getItem('isFirstTime');

   if ((email === 'jose.sawada@datarain.com.br' && password === 'datarain') || 
   (email === 'francisco.silva@datarain.com.br' && password === 'datarain')) {
     if (isFirstTime === null) {
       localStorage.setItem('isFirstTime', 'false');
       alert('Welcome! This is your first time logging in.');
       window.location.href = 'table.html';
     } else {
       window.location.href = 'table.html';
     }
   } else {
     alert('E-mail ou senha inválida, favor coloque o email ou senha certa para login');
   }   
});

const iElement = document.querySelector('i');
const passwordInput = document.querySelector('input[type="password"]');

iElement.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-eye')) {
    e.target.classList.remove('fa-eye');
    e.target.classList.add('fa-eye-slash');
    passwordInput.type = "text";
  } else {
    e.target.classList.remove('fa-eye-slash');
    e.target.classList.add('fa-eye');
    passwordInput.type = "password";
  }
})
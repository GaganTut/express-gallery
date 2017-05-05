/*jshint esversion: 6*/
const checkPass = () => {
  let pass1 = document.querySelector('#pass1');
  let pass2 = document.querySelector('#pass2');
  let message = document.querySelector('#confirmMessage');
  let btn = document.querySelector('#createUserBtn');
  if (pass1.value === pass2.value) {
      pass2.style.backgroundColor = 'green';
      message.style.color = 'green';
      message.innerHTML = "Passwords Match!";
      btn.disabled = false;
  } else {
      pass2.style.backgroundColor = 'rgba(255,0,0,0.5)';
      message.style.color = 'rgba(255,0,0,0.5)';
      message.innerHTML = "Passwords Do Not Match!";
      btn.disabled = true;
  }
};
/*jshint esversion: 6*/
const checkPass = () => {
  let pass1 = document.getElementById('pass1');
  let pass2 = document.getElementById('pass2');
  let message = document.getElementById('confirmMessage');
  if (pass1.value == pass2.value) {
      pass2.style.backgroundColor = 'green';
      message.style.color = 'green';
      message.innerHTML = "Passwords Match!";
  } else {
      pass2.style.backgroundColor = 'red';
      message.style.color = 'red';
      message.innerHTML = "Passwords Do Not Match!";
  }
};
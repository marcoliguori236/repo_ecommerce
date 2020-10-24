//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//autenticacion google
function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile();
  localStorage.setItem('User-Logged', JSON.stringify({ email: profile.getEmail() }))

  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

document.addEventListener("DOMContentLoaded", function (e) {

  let loginNeed = localStorage.getItem('login-need');

  if (loginNeed) {
    loginNeed = JSON.parse(loginNeed);
    document.getElementById("alert").innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <span id="msg">${loginNeed.msg}</span>
    <a href="#" class="close" data-dismiss="alert">&times;</a>
    </div>
    
    `
  }

  //entrega 2
  document.getElementById("submitBtn").addEventListener("click", function (e) {

    let inputEmail = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("inputPassword");
    let camposCompletos = true;

    if (inputEmail.value === '') {
      inputEmail.classList.add("invalid");
      camposCompletos = false;
    }

    if (inputPassword.value === '') {
      inputPassword.classList.add("invalid");
      camposCompletos = false;
    }
    
    if (camposCompletos) {

      localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value }))
      
      if (loginNeed) {
        localStorage.removeItem("login-need");
        window.location = loginNeed.from;

      }else{
        window.location = 'login.html';
      }
      
    }else{
      alert("Datos incompletos, revisa los campos")
  }

  });

});
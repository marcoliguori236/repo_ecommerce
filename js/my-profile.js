document.addEventListener('DOMContentLoaded', function (e) {

    let userLogged = localStorage.getItem('User-Logged');

  if (!userLogged) {
    localStorage.setItem('login-need', JSON.stringify({
      from: "my-profile.html",
      msg: "¡Debes haber ingresado con tu cuenta para ver tu perfil!"
    }));
    window.location = "index.html"
  }

    let perfil = localStorage.getItem('perfil');

    if (perfil) {

        perfil = JSON.parse(perfil);

        if (perfil.imgUrl != "") {
            document.getElementById("imgPerfil").src = perfil.imgUrl;
        }

        document.getElementById('imgUrl').value = perfil.imgUrl;
        document.getElementById('nombre').value = perfil.nombre;
        document.getElementById('apellido').value = perfil.apellido;
        document.getElementById('edad').value = perfil.edad;
        document.getElementById('email').value = perfil.email;
        document.getElementById('tel').value = perfil.tel;

    }

    document.getElementById('guardar').addEventListener("click", function (e) {

        let passValidation = true;
  
        if (passValidation) {
            localStorage.setItem('perfil', JSON.stringify({
                imgUrl: imgUrl.value,
                nombre: nombre.value,
                apellido: apellido.value,
                edad: edad.value,
                email: email.value,
                tel: tel.value
            }));
            document.getElementById("perfil").innerHTML = `
            <div class="alert alert-success alert-dismissible show" role="alert">
                <strong>Se han realizado con exito los cambios</strong>
                <button type="button" onclick="window.location='my-profile.html'" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>  
            </div>
                    `;
        }

    })

})

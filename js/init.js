const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  // 23/08/2020
  let userLogged = localStorage.getItem('User-Logged');
  let ingresar = document.getElementById('ingresar');
  let desplegable = document.getElementById('desplegable');

  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    desplegable.innerHTML += `<div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">` + userLogged.email + `
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="cart.html">Ver carrito</a>
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" id="salir">Cerrar sesión</a>
    </div>
  </div>
</div>`

    document.getElementById("salir").addEventListener("click", function () {
      localStorage.removeItem("User-Logged");
      window.location.href = 'index.html';
    });

  } else {
    ingresar.innerHTML += `<button class="btn btn-primary btn-lg" onclick="window.location.href='index.html'">Ingresar</button>`
  }

});

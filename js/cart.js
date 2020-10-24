//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var prodCompradosArray = [];

function calcTotal() {
  let total = 0;

  let subs = document.getElementsByClassName("subtotal");

  for (let i = 0; i < subs.length; i++) {

    total += parseInt(subs[i].innerHTML);

  }

  document.getElementById("total").innerHTML = `${total} UYU  (Cotización dolar: 40 UYU)`;

  calcEnvio();

}

function calcSubtotal(unitCost, i) {

  let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);

  subtotal = cantidad * unitCost;

  document.getElementById(`prodSubtotal${i}`).innerHTML = subtotal;

  calcTotal();
}

function conversorMoneda(moneda, costoUnit) {
  if (moneda == 'USD') {
    return costoUnit * 40;
  } else {
    return costoUnit;
  }
}

function showProdComprados(array) {
  let contenido = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    let costoPesos = conversorMoneda(product.currency, product.unitCost);

    let subUY = costoPesos * product.count;

    contenido += `<tr>
                      <td><img src="${product.src}" style="width:100px" /></td>

                      <td>${product.name}</td>

                      <td>En stock</td>

                      <td>
                      <input class="form-control" onchange="calcSubtotal(${costoPesos}, ${i})"
                                        type="number" id="cantidad${i}" value="${product.count}" min="1" required></td>
      
                     <td class="text-right"><span class="subtotal" id="prodSubtotal${i}">${subUY}</span><span class="currency"> UYU</span></td>

                     <td>${product.unitCost} ${product.currency}</td>

                     <td class="text-right"><button class="btn btn-sm btn-danger" onclick="eliminar(${i})"><i class="fa fa-trash"></i> </button> </td>
                   </tr>
                  
                  `;

    document.getElementById("listado").innerHTML = contenido;
  }

  calcTotal();


}

function calcEnvio() {
  let totalEnvio = 0;
  let total = parseInt(document.getElementById("total").innerHTML);
  let diasEnvio = document.getElementsByName("envio");
  let envio;

  for (let i = 0; i < diasEnvio.length; i++) {
    if (diasEnvio[i].checked) {
      envio = parseInt(diasEnvio[i].value);
    }

  }

  porcEnvio = (total * envio) / 100;
  totalEnvio = total + porcEnvio;

  document.getElementById("envio").innerHTML = `${porcEnvio} UYU`;

  document.getElementById("totalEnvio").innerHTML = `${totalEnvio} UYU`;

}

//eliminar articulos del carrito
function eliminar(i) {
  if (prodCompradosArray.length > 1) {
    prodCompradosArray.splice(i, 1);
    showProdComprados(prodCompradosArray);

  } else {
    document.getElementById("carroVacio").innerHTML =
      `<div class="container-fluid mt-100">
                                                  <div class="row">
                                                    <div class="col-md-12">
                                                      <div class="card">
                                                          <div class="card-header">
                                                              <h5>Carro</h5>
                                                          </div>
                                                          <div class="card-body cart">
                                                              <div class="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3">
                                                                  <h3><strong>¡Su carro está vacío!</strong></h3>
                                                                  <h4>Añada articulos a su carro</h4> <a href="products.html" class="btn btn-primary cart-btn-transform m-3" data-abc="true">Continuar comprando</a>
                                                              </div>
                                                          </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                               </div>
                                              
                                              `
  }
}

function ok() {
  window.location = "login.html";
}

function seleccionarPago() {
  var pagos = document.getElementsByName("formaPago");
  for (var i = 0; i < pagos.length; i++) {
    if (pagos[i].checked && (pagos[i].value) == "1") {

      document.getElementById("datosTarjeta").classList.remove("d-none");
      document.getElementById("datosBanco").classList.add("d-none");



    } else if (pagos[i].checked && (pagos[i].value) == "2") {

      document.getElementById("datosTarjeta").classList.add("d-none");
      document.getElementById("datosBanco").classList.remove("d-none");

    }
  }
}

let tiposPago = document.getElementsByName("formaPago");
for (var i = 0; i < tiposPago.length; i++) {
  tiposPago[i].addEventListener("change", function () {
    seleccionarPago();
  });

}

function pagoValido() {
  let numTarjeta = document.getElementById("numTarjeta").value;
  let titularTarjeta = document.getElementById("titularTarjeta").value;
  let segTarjeta = document.getElementById("segTarjeta").value;
  let cuenta = document.getElementById("cuenta").value;
  let formaPago = document.getElementsByName("formaPago");
  let pagoValidado = false;

  for (var i = 0; i < formaPago.length; i++) {
    if (formaPago[i].checked && (formaPago[i].value) == "1") {
      if (numTarjeta == "" || titularTarjeta == "" || segTarjeta == "") {
        pagoValidado = false;
      } else {
        pagoValidado = true;
      }

    } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
      if (cuenta == "") {
        pagoValidado = false;
      } else {
        pagoValidado = true;
      }

    }

  }

  return pagoValidado;
}

document.addEventListener("DOMContentLoaded", function (e) {

  let userLogged = localStorage.getItem('User-Logged');
  if (!userLogged) {
    localStorage.setItem('login-need', JSON.stringify({
      from: "cart.html",
      msg: "¡Debes haber ingresado con tu cuenta para ver tu carro!"
    }));
    window.location = "index.html"
  }


  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prodCompradosArray = resultObj.data.articles;

      showProdComprados(prodCompradosArray);

      calcEnvio();
    }

  });

  let elements = document.getElementsByName("envio");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("change", function () {

      calcEnvio();
    });
  }

  let form = document.getElementById('needs-validation');

  form.addEventListener('submit', function (event) {

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      if (pagoValido()) {
        document.getElementById("btnPago").classList.remove("btn-primary");
        document.getElementById("btnPago").classList.remove("btn-danger");
        document.getElementById("btnPago").classList.add("btn-success");

      } else {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById("btnPago").classList.remove("btn-primary");
        document.getElementById("btnPago").classList.remove("btn-success");
        document.getElementById("btnPago").classList.add("btn-danger");
      }

      form.classList.add('was-validated'); 

    } else {

      if (pagoValido()) {
        document.getElementById("btnPago").classList.remove("btn-primary");
        document.getElementById("btnPago").classList.remove("btn-danger");
        document.getElementById("btnPago").classList.add("btn-success");


      } else {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById("btnPago").classList.remove("btn-primary");
        document.getElementById("btnPago").classList.remove("btn-success");
        document.getElementById("btnPago").classList.add("btn-danger");

      }

      form.classList.add('was-validated'); 

  
    }

   /* document.getElementById("carroVacio").innerHTML = `
      <div class="alert alert-success alert-dismissible show" role="alert">
        <strong>¡Su compra fue ingresada con éxito!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>  
      </div>
      `;
  
*/

  });

});    
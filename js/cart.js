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

function conversorMoneda(moneda, costoUnit){
  if (moneda == 'USD'){
    return costoUnit * 40;
  } else{
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
                                        type="number" id="cantidad${i}" value="${product.count}" min="1"></td>
      
                     <td class="text-right"><span class="subtotal" id="prodSubtotal${i}">${subUY}</span><span class="currency"> UYU</span></td>

                     <td>${product.unitCost} ${product.currency}</td>

                     <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
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

document.addEventListener("DOMContentLoaded", function (e) {

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

    if (form.checkValidity() == false){
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');

  });

});    
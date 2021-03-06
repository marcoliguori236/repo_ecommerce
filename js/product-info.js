//Entrega 3
var product = {};
var commentsArray = [];


function showProduct(product, arrayComments) {
    //let imagesArray = product.images;
    let comentarios = "";
    let productNameHTML = document.getElementById("productName");
    let productDescriptionHTML = document.getElementById("productDescription");
    let productCostHTML = document.getElementById("productCost");
    let productCountHTML = document.getElementById("soldCount");

    productNameHTML.innerHTML = product.name;
    productDescriptionHTML.innerHTML = product.description;
    productCostHTML.innerHTML = product.cost + " " + product.currency;
    productCountHTML.innerHTML = product.soldCount + " " + "unidades";


    for (let comment in arrayComments) {
        auxComment = arrayComments[comment];
        let score = "";

        for (let i = 1; i <= auxComment.score; i++) {
            score += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = auxComment.score + 1; i <= 5; i++) {
            score += `<span class="fa fa-star"></span>`;
        }

        comentarios += `
                <div class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ auxComment.user + '  ' + score + `</h4>
                             <p>`+ auxComment.description + `</p>
                         </div>    
                             <small class="text-muted">` + auxComment.dateTime.split(' ')[0] + `</small>
                          </div>

                      </div>
                   </div>
               </div>
              `
        document.getElementById("cat-list-container").innerHTML = comentarios;


    }

}

function showRelatedProducts(productsArray, relatedProdsArray) {
    let contenido = `<hr>`;

    relatedProdsArray.forEach(function (i) {
        contenido += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productsArray[i].imgSrc + `" class="img-thumbnail">
                </div>
            <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4>`+ productsArray[i].name + ' - ' + productsArray[i].currency + '  ' + productsArray[i].cost + `</h4>
                     <p>`+ productsArray[i].description + `</p>
                 </div>    
                     <small class="text-muted">` + productsArray[i].soldCount + ' vendidos' + `</small>
                  </div>

              </div>
           </div>
       </div>
      `


    });

    document.getElementById("relatedProds").innerHTML = contenido;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            product = resultObj.data;

        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            commentsArray = resultObj.data;

            //Muestro las imagenes en forma de galería
            showProduct(product, commentsArray);
        }
    });

    //Entrega 4 - Pauta individual    
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showRelatedProducts(productsArray, product.relatedProducts);
        }


    })


    //Pauta grupal 4
    let userLogged = localStorage.getItem('User-Logged');

    if (userLogged) {
        document.getElementById("newCommentContent").style = "display: inline-block"
    } else {
        document.getElementById("anonComment").style = "display: inline-block"
    }

    //Desafiate 3
    document.getElementById("enviarComm").addEventListener("click", function () {
        let now = new Date();
        let auxDateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

        //Formateo la fecha acorde al JSON: PRODUCT_INFO_COMMENTS_URL 
        if (now.getMonth() < 10 && now.getDate() < 10) {
            auxDateTime = `${now.getFullYear()}-0${now.getMonth() + 1}-0${now.getDate()}`;
        } else if (now.getDate() < 10) {
            auxDateTime = `${now.getFullYear()}-${now.getMonth() + 1}-0${now.getDate()}`;
        } else if (now.getMonth() < 10) {
            auxDateTime = `${now.getFullYear()}-0${now.getMonth() + 1}-${now.getDate()}`;

        }

        let stars = document.getElementsByName('rating');
        let selected = "";
        for (let input of stars) {
            if (input.checked) {
                selected = input.value;
            }
        }


        let newComment = {

            score: parseInt(selected),
            description: document.getElementById('newComm').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: auxDateTime
        };

        commentsArray.push(newComment);
        showProduct(product, commentsArray);
    })

});

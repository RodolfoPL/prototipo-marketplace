//No carga usando las variables de entorno
var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.DOMINIO,
    databaseURL: process.env.DBURL,
    projectId: process.env.PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var productos = [];
var database = firebase.database();
var productos_ref = database.ref('/Productos');
var dbContent;

const getProductData = ()=> {
    let nombre = $("#product-name").val();
    let descripcion = $("#product-description").val();
    let precio = $("#product-price").val();
    let locacion = $("#product-ubication").val();
    let imagen = $("#product-image").val();
    let producto = { nombre, descripcion, precio, locacion};

    //productos.push(producto);
    console.log(producto);
    alert("agregado");
    productos_ref.push(producto);
}

$("#agregar").on("click", () => {
    getProductData();
});

const load = (archivo) => {
    $("#contenedor").load(archivo, () => {
        console.log(archivo);
        if (archivo == "marketplace.html") {
            llenacatalogo();
            console.log("catalogo");
        }
        else if(archivo == "subir_archivo.html"){
            $("#agregar").on("click", () => {
                getProductData();
            });
        }
    });
}

function link(elemento) {
    $(".nav-item").removeClass("active");
    $(elemento).closest(".nav-item").addClass("active");
}

load("marketplace.html");

productos_ref.on("value", (snapshot) => {
    $("#contenedor-productos").empty();
    console.log(snapshot.val());
    dbContent = snapshot.val();
    llenacatalogo();
});

const llenacatalogo = () => {
    $.each(dbContent, (key, value) => {
        $("#contenedor-productos").append(
            `<div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card">
                    <img src="https://picsum.photos/200" class="card-img-top" alt="Producto">
                    <div class="card-body">
                        <h5 class="card-title">${value.nombre}</h5>
                        <p class="card-text">${value.descripcion}.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${value.locacion}</li>
                        <li class="list-group-item">Costo: ${value.precio}</li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn btn-success btn-lg btn-block">Comprar</button>
                    </div>
                </div>
            </div>`
        );
    });
}


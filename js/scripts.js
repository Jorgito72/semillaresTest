/*!
* Start Bootstrap - Business Frontpage v5.0.8 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

let productos = [];

fetch("https://sheet.best/api/sheets/f90b26f3-ed56-49f5-88a1-d1855123ee7d")
    .then(res => res.json())
    .then(data => {
        productos = data;
        //
        cargarProductos(productos);
        console.log(data);
        console.log(productos);
    });

const grilla_tienda= document.getElementById("grilla-tienda");
const botonesCategorias = document.querySelectorAll(".botones-categorias");
let productosEnCarrito = [];
const numerito = document.getElementById("numerito");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

function cargarProductos(productosElegidos) {
    grilla_tienda.innerHTML = "";


    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        strImgDriveF="http://drive.google.com/uc?export=view&id="+JSON.stringify(producto.imagen).slice(33, 66);
        console.log(producto)
console.log("imagen");
console.log(strImgDriveF);
        div.classList.add("mb-5");
        div.classList.add("col");

        div.innerHTML = `
        <div class="col-3 bg-gris-claro carta-producto">
                             
        <div class="row ">
            <div class="col-4">
                <img src="${strImgDriveF}" alt="imagen de${producto.titulo}">
            </div>
            <div class="col">
                <h5>${producto.titulo}</h5>
                <p>00 Unidades</p>
            </div>
        </div>

        <div class="row d-flex justify-content-around align-items-center px-0 mt-5 mb-0">
            <div class="col d-flex"><a href=""><button>Agregar al carro</button></a></div>
            <div class="col d-flex">
                <div class="input-group">
                      <span class="input-group-btn">
                          <button type="button" class="btn  btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                              <span class="glyphicon glyphicon-minus"></span>
                          </button>
                      </span>
                      <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
                      <span class="input-group-btn">
                          <button type="button" class="btn  btn-number" data-type="plus" data-field="quant[1]">
                              <span class="glyphicon glyphicon-plus"></span>
                          </button>
                      </span>
                  </div>
            </div>
        </div>
    </div>
      `;
       grilla_tienda.append(div);
//     <div class="card h-100">
//     <!-- Product image-->
//     <img class="card-img-top rounded-0" src="${producto.imagen}" alt="..." />
//     <!-- Product details-->
//     <div class="card-body p-4">
//         <div class="text-center">
//             <!-- Product name-->
//             <h5 class="fw-bolder">${producto.nombre}</h5>
//             <!-- Product price-->
//            <div><span> $ </span> ${producto.precio}
//            </div>
//         </div>
//     </div>
//     <!-- Product actions-->
//     <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//         <div class="text-center"><button class="btn btn-outline-dark mt-auto producto-agregar" id="${producto.id}" href="">Ver Opciones</button></div>
//     </div>
// </div>

  
   


    });
    actualizarBotonesAgregar();

}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        // botonesCategorias.forEach(boton => boton.classList.remove("active"));
        //e.currentTarget.classList.add("active"); 
        console.log("anda");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            //console.log(productoCategoria);

            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);
            // console.log("funciona");
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
            //console.log("tercera");
        };


    })
});

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (productosEnCarritoLS) {
     productosEnCarrito = productosEnCarritoLS;

    actualizarNumerito();
}
else {
    productosEnCarrito = [];
}

//agrega productos al carrito.

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    // console.log(productoAgregado)
    
   
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
         productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    //modifica la cantidad de productos existentes en el carrito  
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};


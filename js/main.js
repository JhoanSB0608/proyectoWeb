// Inicializar variables
let productos = [];

// Obtener productos del archivo JSON y cargar los productos en la página
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });

// Seleccionar elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Ocultar menú lateral al hacer clic en una categoría
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

/**
 * Función para cargar productos en el contenedor
 * @param {Array} productosElegidos - Lista de productos a mostrar
 */
function cargarProductos(productosElegidos) {
    // Limpiar el contenedor de productos
    contenedorProductos.innerHTML = "";

    // Crear y añadir cada producto al contenedor de productos
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    // Actualizar botones de agregar al carrito
    actualizarBotonesAgregar();
}

// Función para cargar productos en el contenedor
export function cargarProductos(productosElegidos) {
    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

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
    actualizarBotonesAgregar(botonesAgregar);
}

// Función para actualizar los botones de agregar al carrito
function actualizarBotonesAgregar(botonesAgregar) {
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    // Mostrar notificación de producto agregado
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #6b6b6b, #b0b0b0)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){} // Callback después de hacer clic
    }).showToast();

    // Obtener ID del producto y agregarlo al carrito
    const idBoton = e.currentTarget.id;
    const productoAgregado = data.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // Actualizar el número de productos en el carrito y guardarlo en el almacenamiento local
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
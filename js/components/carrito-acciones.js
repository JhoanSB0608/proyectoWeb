class CarritoAcciones extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.handleClick.bind(this)); // Enlaza el contexto de handleClick
    }

    handleClick(event) {
        const button = event.target.closest('button');
        if (!button) return;

        if (button.id === 'carrito-acciones-vaciar') {
            this.vaciarCarrito(); // Llama al método vaciarCarrito
        } else if (button.id === 'carrito-acciones-comprar') {
            this.comprarCarrito(); // Llama al método comprarCarrito
        }
    }

    vaciarCarrito() {
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'question',
            html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                productosEnCarrito.length = 0;
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
            }
        });
    }

    comprarCarrito() {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
        const contenedorCarritoProductos = document.querySelector("#carrito-productos");
        const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
        const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
    }

    render() {
        this.innerHTML = `
            <div class="carrito-acciones-izquierda">
                <button id="carrito-acciones-vaciar" class="carrito-acciones-vaciar">Vaciar carrito</button>
            </div>
            <div class="carrito-acciones-derecha">
                <div class="carrito-acciones-total">
                    <p>Total:</p>
                    <p id="total">$0</p>
                </div>
                <button id="carrito-acciones-comprar" class="carrito-acciones-comprar">Comprar ahora</button>
            </div>
        `;
    }
}

customElements.define('carrito-acciones', CarritoAcciones);
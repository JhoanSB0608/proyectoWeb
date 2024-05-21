class CarritoComprado extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <p id="carrito-comprado" class="carrito-comprado disabled">¡Gracias por tu compra! <i class="bi bi-emoji-laughing"></i></p>
        `;
    }
}

customElements.define('carrito-comprado', CarritoComprado);

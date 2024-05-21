class AsideComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.innerHTML = `
            <aside>
                <button class="close-menu" id="close-menu">
                    <i class="bi bi-x"></i>
                </button>
                <header>
                    <h1 class="logo">CampusShop</h1>
                </header>
                <nav>
                    <ul class="menu">
                        <li>
                            <button id="todos" class="boton-menu boton-categoria active">
                                <img width="40" height="40" color="white" src="https://img.icons8.com/fluency-systems-regular/48/border-all--v2.png"
                                alt="border-all--v2" /> Todos los productos
                            </button>
                        </li>
                        <li>
                            <button id="abrigos" class="boton-menu boton-categoria">
                                <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/coat.png" alt="coat" /> Abrigos
                            </button>
                        </li>
                        <li>
                            <button id="camisetas" class="boton-menu boton-categoria">
                                <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/t-shirt--v1.png"
                                alt="t-shirt--v1" /> Camisetas
                            </button>
                        </li>
                        <li>
                            <button id="pantalones" class="boton-menu boton-categoria">
                                <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/trousers.png" alt="trousers" /> Pantalones
                            </button>
                        </li>
                        <li>
                            <a class="boton-menu boton-carrito" href="./carrito.html">
                                <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/shopping-cart.png"
                            alt="shopping-cart" /> Carrito <span id="numerito" class="numerito">0</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <footer>
                    <p class="texto-footer">© 2024 AMIRI By JhoanSB</p>
                </footer>
            </aside>
        `;
    }

    addEventListeners() {
        const closeMenuButton = this.querySelector("#close-menu");
        if (closeMenuButton) {
            closeMenuButton.addEventListener("click", () => {
                this.classList.remove("aside-visible");
            });
        }
    }
}

customElements.define('aside-component', AsideComponent);
// Importa los módulos necesarios desde la biblioteca lit
import { LitElement, css, html } from 'lit';
// Importa la biblioteca SweetAlert2 para mostrar mensajes emergentes
import Swal from 'sweetalert2';
// Importa la función getProducts del archivo getdata.js
import { getProducts } from "./getdata.js";

// Define la clase del componente personalizado Myelement
class Myelement extends LitElement {
    // Define las propiedades del componente
    static get properties() {
        return {
            // Categoría activa actualmente
            activeCategory: { type: String },
            // Vista actual: 'products' o 'cart'
            view: { type: String },
            // Elementos del carrito
            cartItems: { type: Array },
            // Productos disponibles
            products: { type: Array },
            // Indica si el menú está abierto o cerrado
            menuOpen: { type: Boolean }
        };
    }

    // Constructor de la clase
    constructor() {
        super();
        // Inicializa las propiedades del componente
        this.activeCategory = 'all'; // Inicia con la categoría 'all'
        this.view = 'products'; // Inicia mostrando los productos
        this.cartItems = []; // Inicializa el carrito como vacío
        this.products = []; // Inicializa los productos como vacío
        this.menuOpen = false; // Inicializa el menú como cerrado
        // Llama a la función para obtener los productos al crear el componente
        this.obtenerDataProductos();
    }


    // Método llamado cuando el componente se conecta al DOM
    connectedCallback() {
        super.connectedCallback();
        // Llama a la función para obtener los productos al conectarse al DOM
        this.obtenerDataProductos();
    }


    // Función asincrónica para obtener los productos
    async obtenerDataProductos() {
        try {
            // Obtiene los productos utilizando la función getProducts() del archivo getdata.js
            this.products = await getProducts();
            // Solicita una actualización del componente para reflejar los cambios
            this.requestUpdate();
        } catch (error) {
            // Muestra un mensaje de error si ocurre algún problema al obtener los productos
            console.error('Error al obtener los productos:', error);
        }
    }
    
    render() {
        return html`
            <div class="wrapper">
                <header class="header__Mobile">
                    <h1 class="logo">CampusShop</h1>
                    <button class="open__menue" @click="${this.openMenu}">
                        <img class="menu__svg" src="./public/menu.svg" alt="">
                    </button>
                </header>
                <aside class="${this.menuOpen ? 'aside-visible' : ''}">
                    <header class="header__menue">
                        <h1 class="logo">CampusShop</h1>
                        <button class="close__menue" @click="${this.closeMenu}">
                            <img class="closeMenu__svg" src="./public/closeMenu__svg.svg" alt="">
                        </button>
                    </header>
                    <nav>
                        <ul class="menue">
                            <li><button class="button__Category ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('all')}><img width="40" height="40" color="white" src="https://img.icons8.com/fluency-systems-regular/48/border-all--v2.png"
                            alt="border-all--v2" />All products</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'abrigos' ? 'active' : ''}" @click=${() => this.changeCategory('abrigos')}><img color="white" width="40" height="40" src="https://img.icons8.com/glyph-neue/64/coat.png" alt="coat" />Abrigos</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'camisas' ? 'active' : ''}" @click=${() => this.changeCategory('camisas')}><img width="40" height="40" src="https://img.icons8.com/ios-filled/50/t-shirt--v1.png"
                            alt="t-shirt--v1" />Camisetas</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'pantalones' ? 'active' : ''}" @click=${() => this.changeCategory('pantalones')}><img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/trousers.png" alt="trousers" />Pantalones</button></li>
                            <li style="width: 100%;">
                                <a class="cart__Button ${this.view === 'cart' ? 'active' : ''}" @click=${this.viewCart}> <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/shopping-cart.png"
                                alt="shopping-cart" />
                                    Carrito
                                    <span class="number">${this.cartItems.length}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <footer>
                        <p class="footer__text">© 2024 AMIRI By JhoanSB0608</p>
                    </footer>
                </aside>
                <main>
                    ${this.view === 'products' ? this.renderProducts() : this.renderCart()}
                </main>
            </div>
        `;
    }

    // Método para cambiar a la vista del carrito
    viewCart() {
        this.activeCategory = null;
        this.view = 'cart';
        this.menuOpen = false;
        this.requestUpdate();
    }

    // Método para cambiar la categoría de productos
    changeCategory(category) {
        this.activeCategory = category;
        this.view = 'products';
        this.menuOpen = false;
        this.requestUpdate();
    }

   // Método para renderizar la vista de productos
    renderProducts() {
        const filteredProducts = this.products.filter(product => this.activeCategory === 'all' || product.category === this.activeCategory);
        // console.log('Active Category:', this.activeCategory);
        return html`
            <h2 class="principal__Title">${this.activeCategory === 'all' ? 'Todos los productos' : this.activeCategory.charAt(0).toUpperCase() + this.activeCategory.slice(1)}</h2>
            <div class="product__container">
                ${filteredProducts.map(product => html`
                    <div class="products">
                        <img class="product__Image" src=${product.image} alt="">
                        <div class="product__Details">
                            <h3 class="product__Title">${product.title}</h3>
                            <p class="product__Price">$${product.price}</p>
                            <button class="add__product" @click=${() => this.addToCart(product)}>Agregar</button>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    // Método para renderizar la vista del carrito
    renderCart() {
        const total = this.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

        return html`
            <h2 class="principal__Title">Carrito de Compras</h2>
            ${this.cartItems.length > 0 ? html`
                <div class="cart__Container"> 
                    ${this.cartItems.map(item => html`
                    <div class="product__Cart"> 
                        <img class="cart__Image" src="${item.image}" alt="">
                        <div class="content__Product">
                            <small>Product</small>    
                            <h3>${item.title}</h3>
                        </div>
                        <div class="cart__Amount">
                            <small>Amount</small>
                            <p>${item.quantity}</p>
                        </div>
                        <div class="cart__Price">
                            <small>Price</small>
                            <p>$${item.price}</p>
                        </div>
                        <div class="cart__Subtotal">
                            <small>Subtotal</small>
                            <p>$${item.subtotal}</p>
                        </div>
                        <button class="cart__Delete" @click=${() => this.removeFromCart(item.id)}>
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                    `)}
                </div>
                <div class="cart__Actions">
                    <div class="cart__Actions_Left">
                        <button class="cart__Actions_Delete" @click=${this.emptyCart}>Vaciar Carrito</button>
                    </div>
                    <div class="cart__Actions_Right">
                        <div class="cart__Actions_Total">
                            <p>Total:</p>
                            <p>$${total}</p>
                        </div>
                        <button class="cart__Actions_Buy" @click=${() => this.compra()}>Buy now!</button>
                    </div>
                </div>
            ` : html`<div class="kitty"><p>Tu carrito está vacío. . .</p><img class="Cat" src="./public/Cat.svg" alt=""></div>`}
        `;
    }

    // Método para eliminar un elemento del carrito
    removeFromCart(productId) {
        const itemIndex = this.cartItems.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (this.cartItems[itemIndex].quantity > 1) {
                this.cartItems[itemIndex].quantity -= 1;
                this.cartItems[itemIndex].subtotal = this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price;
            } else {
                this.cartItems = this.cartItems.filter(item => item.id !== productId);
            }
        }
        this.requestUpdate();
        this.removed();
    }

   // Método para vaciar el carrito
    emptyCart() {
        this.cartItems = [];
        this.requestUpdate();
        this.vaciarCarrito();
    }

    // Método para agregar un producto al carrito
    addToCart(product) {
        // Muestra un mensaje indicando que el producto ha sido agregado
        added();
        const cartItem = this.cartItems.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity += 1;
            cartItem.subtotal = cartItem.quantity * cartItem.price;
        } else {
            this.cartItems = [
                ...this.cartItems,
                { ...product, quantity: 1, subtotal: product.price }
            ];
        }
        this.requestUpdate();
    }

    openMenu() {
        this.menuOpen = true;
        this.requestUpdate();
    }

    closeMenu() {
        this.menuOpen = false;
        this.requestUpdate();
    }

// Método para mostrar un mensaje cuando se elimina un producto del carrito
    removed() {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Producto Eliminado"
        });
    }

    // Método para la compra
    compra() {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Compra exitosa"
        });
    }

    // Método para vaciar el carrito con confirmación del usuario
    emptyCart() {
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'question',
            html: `Se van a borrar ${this.cartItems.length} productos.`,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                this.vaciarCarrito();
            }
        });
    }    
    
    async vaciarCarrito() {
        const productosEnCarrito = JSON.parse(localStorage.getItem('cart')) || [];
        return new Promise((resolve, reject) => {
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
                    localStorage.setItem("cart", JSON.stringify(productosEnCarrito));
                    this.cartItems = []; // Limpiar el carrito localmente
                    this.requestUpdate(); // Actualizar la vista
                    resolve(); // Resolver la promesa después de vaciar el carrito
                } else {
                    reject(); // Rechazar la promesa si se cancela la acción
                }
            });
        });
    }

    static styles = css`
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr;
        background-color: var(--clr-main);
    }
    
    aside {
        padding: 1rem;
        padding-right:0;
        color: var(--clr-white);
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    
    .logo {
        font-weight: 800;
        font-size: 2rem;
        text-align:center;
        text-shadow: 0 0 30px #fff, 0 0 60px #929292, 0 0 90px #929292, 0 0 120px #929292, 0 0 150px #929292;
    }
    .button__Category{
        background-color:transparent;
        border:0;
        color:var(--clr-white);
        font-size:1rem;
        cursor:pointer;
        gap:1rem;
        font-weight:600;
        padding:1rem;
        width:100%;
        text-align:center;
        text-shadow: 0 0 30px #fff, 0 0 60px #929292, 0 0 90px #929292, 0 0 120px #929292, 0 0 150px #929292;
    }

    .button__Category img { 
        filter: brightness(0) invert(1);
        transition: filter 0.3s ease;
        float: left;
    }
    .button__Category:hover img { 
        filter: brightness(0) invert(0);
        float: left;
    }

    .button__Category.active img { 
        filter: brightness(0) invert(0);
        float: left;
    }
    .button__Category.active::before img { 
        filter: brightness(0) invert(0);
        float: left;
    }
    .button__Category.active::after img { 
        filter: brightness(0) invert(0);
        float: left;
    }
    

    .cart__Button img { 
        filter: brightness(0) invert(1);
        transition: filter 0.3s ease;
        float: left;
    }
    .cart__Button:hover img { 
        filter: brightness(0) invert(0);
        float: left;
    }

    .cart__Button.active img { 
        filter: brightness(0) invert(0);
        float: left;
    }
    .cart__Button.active::before img { 
        filter: brightness(0) invert(0);
        float: left;
    }
    .cart__Button.active::after img { 
        filter: brightness(0) invert(0);
        float: left;
    }

    .button__Category:hover{
        background-color:var(--clr-main-light);
        color:var(--clr-main);
        width:100%;
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
        position:relative;
    }

    .button__Category.active{
        background-color:var(--clr-main-light);
        color:var(--clr-main);
        width:100%;
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
        position:relative;
    }
    .button__Category.active::before{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        bottom:100%;    
        right:0;
        background-color:transparent;
        border-bottom-right-radius:.7rem;
        box-shadow:0 1rem 0 var(--clr-white);
    }

    .button__Category.active::after{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        top:100%;
        right:0;
        background-color:transparent;
        border-top-right-radius:.7rem;
        box-shadow:0 -1rem 0 var(--clr-white);
    }

    .cart__Button {
        text-align:center;
        background-color: transparent;
        border: 0;
        color: var(--clr-main-light);
        font-size: 1rem;
        cursor: pointer;
        gap: 1rem;
        font-weight: 600;
        padding: 1rem;
        display: block; 
        text-shadow: 0 0 30px #fff, 0 0 60px #929292, 0 0 90px #929292, 0 0 120px #929292, 0 0 150px #929292;
    }
    .cart__Button.active {
        background-color: var(--clr-main-light);
        color: var(--clr-main);
        width: 90%;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        position: relative;
    }
    .cart__Button.active::before{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        bottom:100%;    
        right:0;
        background-color:transparent;
        border-bottom-right-radius:.7rem;
        box-shadow:0 1rem 0 var(--clr-white);
    }

    .cart__Button.active::after{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        top:100%;
        right:0;
        background-color:transparent;
        border-top-right-radius:.7rem;
        box-shadow:0 -1rem 0 var(--clr-white);
    }
    .cart__Button.active .number{
        background-color:var(--clr-main);
        color:var(--clr-main-light);
    }
    

    .cart__Button:hover {
        background-color:var(--clr-main-light);
        color:var(--clr-main);
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
        position:relative;
    }

    .number{
        background-color:var(--clr-white);
        color:var(--clr-main);
        padding:0 .25rem;
        border-radius:.25rem;
        border:black 1.5px solid;
    }

    .menue{
        list-style:none;
        display:flex;
        flex-direction:column;
        gap:1rem;
    }

    
    .footer__text{
        font-size: .85rem;
        text-align:center;
        color:var(--clr-main-light);
        text-shadow: 0 0 30px #fff, 0 0 60px #929292, 0 0 90px #929292, 0 0 120px #929292, 0 0 150px #929292;
    }
    
    main {
        background-color: var(--clr-main-light);
        margin: 1rem;
        margin-left: 0;
        border-radius: 2rem;
        padding: 3rem;
        box-shadow: 1px 1px 5px #d3d3d3, 2px 2px 10px #c0c0c0, 4px 4px 15px #a9a9a9;

    }
    
    .principal__Title {
        color: var(--clr-main);
        margin-bottom: 2.5rem;
        text-shadow: 0 0 30px #fff, 0 0 60px #929292, 0 0 90px #929292, 0 0 120px #929292, 0 0 150px #929292;
    }
    
    .product__container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem; 
        box-shadow: 1px 1px 5px #d3d3d3, 2px 2px 10px #c0c0c0, 4px 4px 15px #a9a9a9;
    }
    
    .products {
        background-color: black ;
        padding: 1rem;
        border-radius: 1rem;
        text-align: center;
        text-shadow: 0 0 30px #fff, 0 0 60px #929292, 0 0 90px #929292, 0 0 120px #929292, 0 0 150px #929292;
    }
    .products:hover{
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
    
    .product__Image {
        width: 100%;
        height: 275px;
        border-radius: 1rem;
    }
    
    .product__Details {
        margin-top: .8rem;
    }
    
    .product__Title {
        color:var(--clr-white);
        font-size: 1.1rem;
        margin-bottom: .2rem;
    }
    
    .product__Price {
        color: var(--clr-white);
        font-weight: bold;
        margin-bottom: .8rem;
    }
    
    .add__product {
        background-color: transparent;
        color: var(--clr-white);
        font-weight:600;
        padding: .5rem 1rem;
        border-radius: .7rem;
        cursor: pointer;
        transition: background-color .3s;
        border: 2px solid var(--clr-white);
    }
    
    .add__product:hover {
        background-color: var(--clr-white);
        color:var(--clr-main);
    }

    /*_______________________________________________________________________________________________________________________________________*/  
    /*CART CSS*/    
    
    
    .container__ProductCart{
        display:flex;
        flex-direction:column;
        gap:1rem;
    }
    
    .product__Cart{
        display:flex;
        justify-content:space-between;
        align-items:center;
        background-color:black;
        color:white;
        padding:.5rem;
        padding-right:1.5rem;
        border-radius:1rem;
    }
    
    .cart__Image{
        width: 7rem;
        border-radius: 1rem;
    }
    
    .product__Cart small{
        font-size: .75rem;
    }
    
    .cart__Delete{
        background-color:transparent;
        cursor: pointer;
        color: white;
        font-size: 3rem;
        width: 50px;
        height: 50px;
    }
    
    .cart__Container{
        display:flex;
        flex-direction:column;
        gap:1.5rem;
    }
    
    .cart__Actions{
        display:flex;
        justify-content:space-between;
        margin-top:1rem;
    }
    
    .cart__Actions_Delete{
        border:0;
        background-color:gray;
        padding:0.7rem;
        border-radius:1rem;
        color:var(--clr-white);
        text-transform:upperCase;
        cursor:pointer;
    }
    
    .cart__Actions_Delete:hover{
        background-color:var(--crl-white);
        color:gray;
        border:2px solid gray;
        
    }

    .cart__Actions_Right{
        display:flex;
    }

    .cart__Actions_Total{
        display:flex;
        background-color:gray;
        border-top-left-radius:0.7rem;
        border-bottom-left-radius:0.7rem;
        color:var(--clr-white);
        text-transform:upperCase;
        padding:0.2rem;
        gap:1rem;
    }

    .cart__Actions_Buy{
        border:0;
        background-color:black;
        padding:1rem;
        color:var(--clr-white);
        text-transform:upperCase;
        cursor:pointer;
        border-top-right-radius:0.7rem;
        border-bottom-right-radius:0.7rem;
        
    }
    .cart__Actions_Buy:hover{
        background-color:var(--clr-white);
        color:gray;
        border:2px solid gray;        
    } 

    .kitty{
        display:flex;
        align-items:center;
    }
    .kitty p{
        margin-right:.3rem;
        font-size:1.1rem;
    }
    .header__Mobile{
        display:none;
    }
    .close__menue{
        display:none;
    }
    /*_______________________________________________________________________________________________________________________________________*/  
    /* MEDIAQUIERIE*/
    @media screen and (max-width: 700px){
        .wrapper{
            min-height:100vh;
            display:flex;
            flex-direction:column;
        }
        .logo{
            font-size:1.5rem;
            margin-bottom:0;
        }
        aside{
            position:fixed;
            z-index:9;
            background-color:var(--clr-main);
            left:0; /* Ajustado para que el aside ocupe todo el ancho */
            box-shadow:0 0 0 100vmax rgba(0, 0, 0, .75);
            transform:translateX(-100%);
            opacity:0;
            visibility:hidden;
            transition:.2s;
            width:50%; /* Asegura que el aside ocupe todo el ancho */
            display:flex;
            flex-direction:column;
        }
        .aside-visible{
            transform:translateX(0%);
            opacity:1;
            visibility:visible;
        }
        main{
            margin:1rem;
            padding:1.5rem;
        }
        .product__container{
            grid-template-columns:1fr;
        }
        .button__Category.active::before,
        .button__Category.active::after,
        .cart__Button.active::before,
        .cart__Button.active::after{
            display:none
        }
        .cart__Button.active{
            width:84%; /* Asegura que el botón ocupe todo el ancho */
        }
        .cart__Button:hover{
            width:84%;
        }
        .header__Mobile{
            display:flex;
            padding:1rem;
            justify-content:space-between;
            align-items:center;
        }
        .header__Mobile .logo{
            color:var(--clr-white);
        }
        .menue{
            gap:2rem;
            padding:0;
            margin:0; /* Elimina el margen de la lista */
            width:100%; /* Asegura que la lista ocupe todo el ancho */
        }
        .open__menue,
        .close__menue{
            background-color:transparent;
            color:var(--clr-white);
            border:none;
            cursor:pointer;
        }
        .menu__svg{
            width:2.5rem;
        }
        .close__menue{
            display:block;
            height:0;
        }
        .header__menue{
            display:flex;
            width:100%;
            justify-content: space-between;
            align-items: center;
        }
        ul{
            margin:0;
            padding:0; /* Elimina el padding de la lista */
            width:100%; /* Asegura que la lista ocupe todo el ancho */
        }
        nav{
            width:100%; /* Asegura que el nav ocupe todo el ancho */
        }
        .menue {
            list-style:none;
            padding:0; /* Elimina el padding de la lista */
            margin:0; /* Elimina el margen de la lista */
            width:100%; /* Asegura que la lista ocupe todo el ancho */
        }
        .button__Category{
            width:100%; /* Asegura que los botones ocupen todo el ancho */
        }
        .cart__Button{
            width:84%; /* Asegura que los botones ocupen todo el ancho */
        }

        .cart__Image{
            width: 40%; /* Asegura que el botón ocupe todo el ancho */
            margin-bottom:1rem;
        }
        .product__Cart{
            padding: 1.5rem;
            flex-wrap: wrap;
        }
        .principal__Title {
            margin-bottom: 1.5rem;
        }
        .cart__Actions_Right {
            display: flex;
            width: 64%;
            margin-left: 1rem;
        }
        .cart__Actions_Delete {
            padding:.9rem;
        }
        .content__Product{
            font-size: 0.9rem;
            margin-right: 0.5rem;
            width: 46%;
        }

        .cart__Amount,
        .cart__Price,
        .cart__Subtotal{
            font-size:.8rem;
            margin-right: .5rem;
        }
   
        .cart__Delete i {
            width: 50px;
            height: 50px;
            color: white;
            font-size: 3rem;
        }
        cart__Delete .bx bx-trash {
            color: white;
        }
    }
    `;
}

const added = async () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Producto Agregado Exitosamente"
    });
}



customElements.define('my-element', Myelement);
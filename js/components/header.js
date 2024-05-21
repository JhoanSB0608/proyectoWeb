class HeaderComponent extends HTMLElement {
    connectedCallback() {
        const openMenuButton = this.querySelector("#open-menu");
        openMenuButton.addEventListener("click", this.openMenu.bind(this));
        this.innerHTML = `
            <header class="header-mobile">
                <h1 class="logo">CampusShop</h1>
                <button class="open-menu" id="open-menu">
                    <i class="bi bi-list"></i>
                </button>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
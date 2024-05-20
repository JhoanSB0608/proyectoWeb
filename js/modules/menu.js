// Selecciona el elemento del DOM con el ID "open-menu"
const openMenu = document.querySelector("#open-menu");
// Selecciona el elemento del DOM con el ID "close-menu"
const closeMenu = document.querySelector("#close-menu");
// Selecciona el elemento del DOM que es una etiqueta <aside>
const aside = document.querySelector("aside");

// Añade un evento 'click' al botón de abrir menú
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

// Añade un evento 'click' al botón de cerrar menú
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})
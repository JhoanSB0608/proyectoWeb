export async function getProducts() {
    try {
        const response = await fetch("http://localhost:3000/productos");
        const data = await response.json();
        return data.map(item => ({
            id: item.id,
            title: item.titulo,
            image: item.imagen,
            image2: item.imagen2,
            category: item.categoria.id,
            price: item.precio
        }));
    } catch (error) {
        console.error('Error loading products:', error);
        throw error; // Asegúrate de propagar el error para manejarlo en `obtenerDataProductos()`
    }
}
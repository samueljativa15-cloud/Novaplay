
// ======================================
// NOVAPLAY - FUNCIONES PRINCIPALES
// ======================================

// NORMALIZAR TEXTO
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ======================================
// 1. BUSCADOR DE VIDEOJUEGOS
// ======================================

const searchInput = document.getElementById("gameSearch");
const gameCards = document.querySelectorAll(".game-card");
const noResults = document.getElementById("noResults");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        const searchText = normalizarTexto(searchInput.value);
        let visibleGames = 0;

        gameCards.forEach(function (card) {

            const gameName = normalizarTexto(card.textContent);

            card.hidden = !gameName.includes(searchText);

            if (!card.hidden) {
                visibleGames++;
            }

        });

        if (noResults) {
            noResults.hidden = visibleGames !== 0;
        }

    });
}


// ======================================
// 2. INFORMACION DE VIDEOJUEGOS
// ======================================

const infoButtons = document.querySelectorAll(".game-info-btn");

infoButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card = button.closest(".game-card");
        const details = card.querySelector(".game-details");

        details.hidden = !details.hidden;

        button.textContent = details.hidden
            ? "Ver información"
            : "Cerrar información";

        button.setAttribute(
            "aria-expanded",
            String(!details.hidden)
        );

    });

});


// ======================================
// 3. FILTROS DE LA TIENDA
// ======================================

const storeButtons = document.querySelectorAll(".store-filter");
const productCards = document.querySelectorAll(".product-card");

const productSearch = document.getElementById("productSearch");
const productNoResults = document.getElementById("productNoResults");

let selectedCategory = "all";

function filterProducts() {

    const searchText = productSearch
        ? normalizarTexto(productSearch.value)
        : "";

    let visibleProducts = 0;

    productCards.forEach(function (product) {

        const category = product.dataset.category;
        const name = normalizarTexto(
            product.dataset.name + " " + product.textContent
        );

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch = name.includes(searchText);

        product.hidden = !(matchesCategory && matchesSearch);

        if (!product.hidden) {
            visibleProducts++;
        }

    });

    if (productNoResults) {
        productNoResults.hidden = visibleProducts !== 0;
    }

}


// Botones de categorías

storeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory = button.dataset.category;

        storeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();

    });

});


// Buscador de productos

if (productSearch) {
    productSearch.addEventListener("input", filterProducts);
}


// ======================================
// 4. CARRITO DE COMPRAS
// ======================================

let cart = [];

const cartCount = document.getElementById("cartCount");
const cartSummary = document.getElementById("cartSummary");

const addCartButtons = document.querySelectorAll(".add-cart-btn");


// Actualizar carrito

function updateCart() {

    const totalItems = cart.length;

    const totalPrice = cart.reduce(function (total, product) {
        return total + product.price;
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cartSummary) {

        if (totalItems === 0) {

            cartSummary.textContent =
                "Tu carrito está vacío. ¡Explora los productos!";

        } else {

            cartSummary.innerHTML = `
                <h3>Tu carrito</h3>
                <p>Productos agregados: ${totalItems}</p>
                <p>Total: $${totalPrice.toLocaleString("es-CO")} COP</p>
            `;

        }

    }

}


// Agregar productos

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productName = button.dataset.product;
        const productPrice = Number(button.dataset.price);

        if (!productName || !Number.isFinite(productPrice)) {
            return;
        }

        cart.push({
            name: productName,
            price: productPrice
        });

        updateCart();

        button.textContent = "✓ Agregado";

        setTimeout(function () {
            button.textContent = "＋ Agregar al carrito";
        }, 1000);

    });

});


// ======================================
// 5. MENSAJE DE INICIO
// ======================================

console.log("NovaPlay está funcionando correctamente.");


// Inicializar carrito

updateCart();




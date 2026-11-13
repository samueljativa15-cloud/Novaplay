
// =================================
// NOVAPLAY - FUNCIONES PRINCIPALES
// =================================


// BUSCADOR DE VIDEOJUEGOS

const searchInput = document.getElementById("gameSearch");

const gameCards = document.querySelectorAll(".game-card");

const noResults = document.getElementById("noResults");


searchInput.addEventListener("input", function() {

    const searchText = searchInput.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    let visibleGames = 0;

    gameCards.forEach(function(card) {

        const gameName = card.textContent
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (gameName.includes(searchText)) {

            card.hidden = false;
            visibleGames++;

        } else {

            card.hidden = true;

        }

    });

    noResults.hidden = visibleGames !== 0;

});


// FILTROS DE NOTICIAS

const filterButtons = document.querySelectorAll(".filter-btn");

const newsCards = document.querySelectorAll(".news-card");

const noNews = document.getElementById("noNews");


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.filter;

        let visibleNews = 0;


        // ACTUALIZAR BOTÓN ACTIVO

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // FILTRAR NOTICIAS

        newsCards.forEach(function(card) {

            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {

                card.hidden = false;
                visibleNews++;

            } else {

                card.hidden = true;

            }

        });


        // MENSAJE SI NO HAY RESULTADOS

        noNews.hidden = visibleNews !== 0;

    });

});


// MENSAJE DE INICIO EN CONSOLA

console.log("NovaPlay está funcionando correctamente.");


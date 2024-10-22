const API_KEY = "5ce2e2c1";

async function fetchData(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
    const data = await response.json();
    return data;
};

const searchInputElement = document.querySelector('#movie-search-input');
const searchButtonElement = document.querySelector('#movie-search-button');

let movieTitleValue = '';

searchButtonElement.addEventListener('click', async () => {
    movieTitleValue = searchInputElement.value;
    const movie = await fetchData(movieTitleValue);
    const cardElementTemplate = `
    <div class="card" style="width: 18rem">
        <img
        src="${movie.Poster}"
        class="card-img-top"
        alt="${movie.Title} movie poster"
        />
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">${movie.Plot}</p>
            <a
                href="#"
                class="btn btn-primary movie-moreDetails-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-title="${movie.Title}"
                >
                Подробнее
            </a>
        </div>
    </div>`;
    
    const searchResultsContainer = document.querySelector('.search-results');

    while (searchResultsContainer.firstChild) {
        searchResultsContainer.removeChild(searchResultsContainer.firstChild);
    }

    searchResultsContainer.insertAdjacentHTML('beforeend', cardElementTemplate);

    searchInputElement.value = '';

    //модальное окно
    const moreDetailsButton = document.querySelector('.movie-moreDetails-button');


    moreDetailsButton.addEventListener('click', async (event) => {
        const movieTitle = event.target.getAttribute('data-title');
        const modalBody = document.querySelector('.modal-body');
        
        modalBody.innerHTML = '';
        
        const movie = await fetchData(movieTitle);

        const modalWindovElementsCard = `
        <img
            src="${movie.Poster}"
            class="card-img-top"
            alt="${movie.Title} movie poster"
        />
        <div class="modal-card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <span><b>Genre:</b> ${movie.Genre}</span><br>
            <span><b>Released:</b> ${movie.Released}</span><br>
            <span><b>Runtime:</b> ${movie.Runtime}</span><br>
            <span><b>Rated:</b> ${movie.Rated}</span><br>
            <p class="card-text"><b>Content:</b> ${movie.Plot}</p>
            <span><b>Director:</b> ${movie.Director}</span><br>
            <span><b>Actors:</b> ${movie.Actors}</span>
        </div>`;
        
        modalBody.insertAdjacentHTML('beforeend', modalWindovElementsCard);
    });
});

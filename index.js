const API_KEY = "5ce2e2c1";

async function fetchData(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t="${title}"`);
    const data = await response.json();
    return data;
};

const searchInputElement = document.querySelector('#movie-search-input');
const searchButtonElement= document.querySelector('#movie-search-button');

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
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                id = "movie-moreDetails-button"
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

    

    //modal window

    const moreDetailsButton = document.querySelector('#movie-moreDetails-button');

    moreDetailsButton.addEventListener('click', async ()=>{
        movieTitleValue = searchInputElement.value;
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
        const movie = await fetchData(movieTitleValue);
    
        const modalWindovElementsCard = `
        <img
            src="${movie.Poster}"
            class="card-img-top"
            alt="${movie.Title} movie poster"
            />
            <div class="modal-card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <span><b>Genre:</b>${movie.Genre}</span>
                <span><b>Released:</b>${movie.Released}</span>
                <span><b>Runtime:</b>${movie.Runtime}</span>
                <span><b>Rated:</b>${movie.Rated}</span>
                <p class="card-text"><b>Content:</b> ${movie.Plot}</p>
                <span><b>Director:</b> ${movie.Director}</span>
                <span><b>Actors:</b>${movie.Actors}</span>
            </div>`;
            
            modalBody.insertAdjacentHTML('beforeend', modalWindovElementsCard);
    });
    searchInputElement.value = '';
});




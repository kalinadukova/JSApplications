import { showView } from './dom.js';
import { showAddMovie } from './addMovie.js';
import { showExamplePage } from './exampleMovie.js';

const homePageSection = document.getElementById('home-page');
const moviesContainer = document.querySelector('.card-deck.d-flex.justify-content-center');
const addMovieBtn = document.getElementById('add-movie-button');

moviesContainer.addEventListener('click', event => {
    let target = event.target;
    if (event.target.tagName === 'BUTTON') {
        target = event.target.parentElement;
    }
    if (target.tagName === 'A') {
        showExamplePage(target.id);
    }
});

homePageSection.querySelector('#createLink').addEventListener('click', event => {
    event.preventDefault();

    showAddMovie();
});

homePageSection.remove();

export function showHomePage() {
    showView(homePageSection);

    const userData = JSON.parse(sessionStorage.getItem('userData'));


    if(userData == undefined) {
        addMovieBtn.style.display = 'none';
    } else {
        addMovieBtn.style.display = 'inline-block';
    }

    moviesContainer.replaceChildren();
    moviesContainer.textContent = 'Loading...';
    loadMovies();
}

async function loadMovies() {
    const url = 'http://localhost:3030/data/movies';
    const res = await fetch(url);
    const data = await res.json();

    moviesContainer.replaceChildren();
    data.map(element => getMovie(element));
}

function getMovie(element) {
    moviesContainer.innerHTML += `<div class="card mb-4">
    <img class="card-img-top" src="${element.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
    </div>
    <div class="card-footer">
        <a id="${element._id}" href="#/details/6lOxMFSMkML09wux6sAF">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
    </div>`
}

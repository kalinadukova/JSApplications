import { showView } from './dom.js';
import { showHomePage } from './home.js';

const addMovieSection = document.getElementById('add-movie');
addMovieSection.remove();

export function showAddMovie() {
    showView(addMovieSection);

    document.querySelector('form').addEventListener('submit', addMovie);
}

async function addMovie(event) {
    event.preventDefault();

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const formData = new FormData(event.target);

    if ([...formData.values()].includes('')) {
        console.log('here');
        return (alert('Fill all input fields'));
    }

    event.target.reset();

    const movieDetails = {
        title: formData.get('title').trim(),
        img: formData.get('imageUrl').trim(),
        description: formData.get('description').trim()
    };

    const url = `http://localhost:3030/data/movies`;
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(movieDetails)
    }

    await fetch(url, options);

    showHomePage();
}
import { showView } from './dom.js';
import { showExamplePage } from './exampleMovie.js';

const editSection = document.getElementById('edit-movie');
editSection.remove();

export function showEditPage(movieId) {
    showView(editSection);

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    document.querySelector('form').addEventListener('submit', editMovie);

    async function editMovie(event) {
        event.preventDefault();
    
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
    
        console.log(userData.token);

        const url = `http://localhost:3030/data/movies/${movieId} `;
        const options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(movieDetails)
        }

        await fetch(url, options);
        
        showExamplePage(movieId);

    }
}


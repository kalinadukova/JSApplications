import { showView } from './dom.js';
import { showEditPage } from './editMovie.js';
import { showHomePage } from './home.js';

const exampleSection = document.getElementById('movie-example');
const movieContainer = document.querySelector('.row.bg-light.text-dark');
exampleSection.remove();

export function showExamplePage(id) {
    showView(exampleSection);

    movieContainer.replaceChildren();
    movieContainer.textContent = 'Loading...';

    showMovie(id);

}

async function showMovie(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData.id;

    const [movieRes, likesCountRes, likesRes] = await Promise.all([
        fetch(`http://localhost:3030/data/movies/${id}`), 
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`)
    ]);

    const [movieData, likesCountData, isLiked] = await Promise.all([
        movieRes.json(), 
        likesCountRes.json(),
        likesRes.json()
    ]);

    getMovieDetails(movieData, likesCountData);

    const deleteBtn = movieContainer.querySelector('.btn.btn-danger');
    const editBtn = movieContainer.querySelector('.btn.btn-warning');
    const likeBtn = movieContainer.querySelector('.btn.btn-primary');

    editBtn.addEventListener('click', onEdit);
    deleteBtn.addEventListener('click', onDelete);

    if (isLiked.length > 0) {
        likeBtn.textContent = 'Unlike';
    } else {
        likeBtn.textContent = 'Like';
    }

    likeBtn.addEventListener('click', onLike);

    if (userData != null) {
        if (userData.id === movieData._ownerId) {
            deleteBtn.style.display = 'inline-block';
            editBtn.style.display = 'inline-block';
            likeBtn.style.display = 'none';

        } else {
            deleteBtn.style.display = 'none';
            editBtn.style.display = 'none';
            likeBtn.style.display = 'inline-block';

        }
    } else {
        deleteBtn.style.display = 'none';
        editBtn.style.display = 'none';
        likeBtn.style.display = 'none';

    }

    async function onLike(event) {
        const btn = event.target;
    
        if(btn.textContent === 'Like') {
            const options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.token
                },
                body: JSON.stringify({
                    movieId: movieData._id
                })
            };

            await fetch('http://localhost:3030/data/likes', options);
            showExamplePage(movieData._id);
        } else {
            const likeId = isLiked[0]._id;
            const options = {
                method: 'delete',
                headers: {
                    'X-Authorization': userData.token
                },
            };

            await fetch(`http://localhost:3030/data/likes/${likeId}`, options);
            showExamplePage(movieData._id);
        }
        
    }

    function onEdit() {
        showEditPage(movieData._id);
    }

    function onDelete() {
        const url = `http://localhost:3030/data/movies/${movieData._id} `;
        const options = {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token
            },
        }
        fetch(url, options);

        showHomePage();
    }
}

function getMovieDetails(movie, likes) {
    movieContainer.innerHTML = `<h1>Movie title: ${movie.title}</h1>
    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}"
            alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3">Movie Description</h3>
        <p>${movie.description}.</p>
        <a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        <a class="btn btn-primary" href="#"></a>
        <span class="enrolled-span">Liked ${likes}</span>
    </div>`;
}





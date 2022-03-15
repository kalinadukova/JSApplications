import { getAllIdeas } from '../api/data.js';

let contex = null;
const section = document.getElementById('dashboard-holder');
section.remove();

export function showCatalogPage(contexTarget) {
    contex = contexTarget;
    contex.showSection(section);
    loadIdeas();

}

async function loadIdeas() {
    const ideas = await getAllIdeas();

    if (ideas.length === 0) {
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    } else {
        section.innerHTML = '';

        ideas.forEach(element => {
            createIdeaDiv(element);
        });


        const btns = document.querySelectorAll('.btn');
        btns.forEach(btn => btn.addEventListener('click', (event) => {
            event.preventDefault();
            const id = event.target.id;
            contex.goTo('details', id);
        }));

    }
}

function createIdeaDiv(element) {
    section.innerHTML += `
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${element.title}</p>
        </div>
        <img class="card-image" src="${element.img}" alt="Card image cap">
        <a id="${element._id}" class="btn" href="">Details</a>
    </div>
    `;
}

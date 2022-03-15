import { deleteIdea, getIdea } from "../api/data.js";

const section = document.getElementById('details-page');
section.remove();

let contex = null;

export function showDetailsPage(contexTarget, id) {
    contex = contexTarget
    contex.showSection(section);
    loadIdea(id);
}

async function loadIdea(id) {
    const idea = await getIdea(id);
    makeIdeaDiv(idea);

    const deleteDiv = document.getElementById('deleteDiv');

    if (JSON.parse(sessionStorage.getItem('userData')) == null) {
        deleteDiv.style.display = 'none';
    } else {
        if (deleteDiv.dataset.ownerid != JSON.parse(sessionStorage.getItem('userData')).id) {
            deleteDiv.style.display = 'none';
        } else {
            deleteDiv.style.display = 'block';
        }
    }

    const divBtn = [...deleteDiv.children][0];

    divBtn.addEventListener('click', (event) => {
        event.preventDefault();

        deleteIdea(divBtn.id);

        contex.goTo('catalog');
    });

}

function makeIdeaDiv(idea) {
    section.innerHTML = `
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    <div id="deleteDiv" data-ownerId="${idea._ownerId}" class="text-center">
        <a id=${idea._id} class="btn detb" href="">Delete</a>
    </div>
    `;
}
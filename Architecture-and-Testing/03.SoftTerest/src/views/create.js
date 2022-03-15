import { createIdea } from "../api/data.js";

const section = document.getElementById('create-page');
section.remove();

let contex = null;

export function showCreatePage(contexTarget) {
    contex = contexTarget;
    contex.showSection(section);

    const form = document.querySelector('form');

    form.addEventListener('submit', addIdea);

}

async function addIdea(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    (event.target).reset();

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    const data = {
        title,
        description,
        img
    };

    createIdea(data);

    contex.goTo('catalog');
}
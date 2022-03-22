import {html, render} from '../node_modules/lit-html/lit-html.js';

const listTemplate = (towns) => html`<ul>${towns.map(t => html`<li>${t}</li>`)}</ul>` ;

function start() {
    const form = document.querySelector('form');
    const container = document.getElementById('root');

    form.addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();

        const townNames = new FormData(event.target).get('towns').split(', ');
        
        render(listTemplate(townNames), container);
    }
}

start();
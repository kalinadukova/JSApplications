import { towns as townNames } from './towns.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const listTemplate = (towns) => html`<ul>${towns.map(t => html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}</ul>`;

const towns = townNames.map(t => ({name: t, match: false}));
const container = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);

update();

function update() {

   render(listTemplate(towns), container);
}

function search() {
   const match = input.value.trim().toLowerCase();
   let matches = 0;
   for (const t of towns) {
      if (match && t.name.toLowerCase().includes(match)) {
         t.match = true;
         matches++;
      } else {
         t.match = false;
      }
   }
  
   update();
   output.textContent = `${matches} matches found`;

}



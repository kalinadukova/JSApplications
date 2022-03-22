import { html, render } from "../node_modules/lit-html/lit-html.js";
import { styleMap } from "../node_modules/lit-html/directives/style-map.js";
import { cats } from "./catSeeder.js";

const catTemplate = (cats, onDetails) => html`
  <ul>
    ${cats.map(
      (c) => html`<li>
        <img
          src="./images/${c.imageLocation}.jpg"
          width="250"
          height="250"
          alt="Card image cap"
        />
        <div class="info">
          <button class="showBtn" @click=${() => onDetails(c)}>
            ${c.visible ? "Hide status code" : "Show status code"}
          </button>
          <div
            id=${c.id}
            class="status"
            style=${styleMap({ display: c.visible ? "block" : "none" })}
          >
            <h4 class="card-title">Status Code: ${c.statusCode}</h4>
            <p class="card-text">${c.statusMessage}</p>
          </div>
        </div>
      </li>`
    )}
  </ul>
`;

function loadCats() {
  const section = document.querySelector("section");

  onRender();

  function onDetails(cat) {
    cat.visible = !cat.visible;

    onRender();
  }

  function onRender() {
    render(catTemplate(cats, onDetails), section);
  }
}

loadCats();

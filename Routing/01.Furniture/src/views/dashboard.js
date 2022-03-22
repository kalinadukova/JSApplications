import { html, until } from "../lib.js";
import { getAllFurniture, getUserFurniture } from "../api/data.js";
import { getUserData } from "../util.js";

const homeTemplate = (furniturePromise, userpage) => html`
  <div class="row space-top">
    <div class="col-md-12">
      ${userpage
        ? html`<h1>My Furniture</h1>
            <p>This is a list of your publications.</p>`
        : html`<h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>`}
    </div>
  </div>
  <div class="row space-top">
    ${until(furniturePromise, html`<p>Loading&hellip;</p>`)}
  </div>
`;

const furnitureTemplate = (f) => html` <div class="col-md-4">
  <div class="card text-white bg-primary">
    <div class="card-body">
      <img src="${f.img}" />
      <p>${f.description}</p>
      <footer>
        <p>Price: <span>${f.price} $</span></p>
      </footer>
      <div>
        <a href="/details/${f._id}" class="btn btn-info">Details</a>
      </div>
    </div>
  </div>
</div>`;

export function homePage(ctx) {
  const userpage = ctx.pathname == "/my-publications";
  ctx.render(homeTemplate(loadFurniture(userpage), userpage));
}

async function loadFurniture(userpage) {
  let furniture = [];

  if (userpage) {
    const id = getUserData().id;
    furniture = await getUserFurniture(id);
  } else {
    furniture = await getAllFurniture();
  }

  return furniture.map((f) => {
    return furnitureTemplate(f);
  });
}

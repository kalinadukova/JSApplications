import { deleteFurniture, getFurnitureDetails } from "../api/data.js";
import { html, until, styleMap } from "../lib.js";
import { clearUserData, getUserData } from "../util.js";

const detailsTemplate = (furniturePromise) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    ${until(furniturePromise, html`<p>Loading&hellip;</p>`)}
  </div>
`;

const furnitureTemplate = (f, onDelete) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="../.${f.img}" />
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <p>Make: <span>${f.make}</span></p>
    <p>Model: <span>${f.model}</span></p>
    <p>Year: <span>${f.year}</span></p>
    <p>Description: <span>${f.description}</span></p>
    <p>Price: <span>${f.price}</span></p>
    <p>Material: <span>${f.material}</span></p>
    <div>
      <a
        href="/edit/${f._id}"
        style=${styleMap({ display: f.isOwner ? "inline-block" : "none" })}
        class="btn btn-info"
        >Edit</a
      >
      <a
        href="javascript:void(0)"
        @click=${onDelete}
        style=${styleMap({ display: f.isOwner ? "inline-block" : "none" })}
        class="btn btn-red"
        >Delete</a
      >
    </div>
  </div>
`;

export function detailsPage(ctx) {
  ctx.render(detailsTemplate(loadFurnitureDetails(ctx)));
}

async function loadFurnitureDetails(ctx) {
  const furnitureId = ctx.params.id;
  const furniture = await getFurnitureDetails(furnitureId);

  const userData = getUserData();

  if (userData && userData.id == furniture._ownerId) {
    furniture.isOwner = true;
  }

  return furnitureTemplate(furniture, onDelete.bind(null, ctx));

  async function onDelete(ctx) {
    await deleteFurniture(ctx.params.id);

    ctx.page.redirect("/");
  }
}

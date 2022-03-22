import { html, until } from "../lib.js";
import { getFurnitureDetails, updateFurniture } from "../api/data.js";

const updateTemplate = (furniturePromise) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  ${until(furniturePromise, html`<p>loading&hellip;</p>`)}
`;

const formTemplate = (f, onSubmit) => html`<form @submit=${onSubmit}>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="new-make">Make</label>
        <input
          class="form-control"
          id="new-make"
          type="text"
          name="make"
          value="${f.make}"
        />
      </div>
      <div class="form-group has-success">
        <label class="form-control-label" for="new-model">Model</label>
        <input
          class="form-control is-valid"
          id="new-model"
          type="text"
          name="model"
          value="${f.model}"
        />
      </div>
      <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year</label>
        <input
          class="form-control is-invalid"
          id="new-year"
          type="number"
          name="year"
          value="${f.year}"
        />
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-description"
          >Description</label
        >
        <input
          class="form-control"
          id="new-description"
          type="text"
          name="description"
          value="${f.description}"
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label class="form-control-label" for="new-price">Price</label>
        <input
          class="form-control"
          id="new-price"
          type="number"
          name="price"
          value="${f.price}"
        />
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-image">Image</label>
        <input
          class="form-control"
          id="new-image"
          type="text"
          name="img"
          value="${f.img}"
        />
      </div>
      <div class="form-group">
        <label class="form-control-label" for="new-material"
          >Material (optional)</label
        >
        <input
          class="form-control"
          id="new-material"
          type="text"
          name="material"
          value="${f.material}"
        />
      </div>
      <input type="submit" class="btn btn-info" value="Edit" />
    </div>
  </div>
</form>`;

export function updatePage(ctx) {
  ctx.render(updateTemplate(loadForm(ctx)));
}

async function loadForm(ctx) {
  const furniture = await getFurnitureDetails(ctx.params.id);

  return formTemplate(furniture, onSubmit.bind(null, ctx));

  async function onSubmit(ctx, event) {
    event.preventDefault();

    const id = ctx.params.id;

    const formData = new FormData(event.target);

    const furnitureInfo = {
      make: formData.get("make"),
      model: formData.get("model"),
      year: formData.get("year"),
      description: formData.get("description"),
      price: formData.get("price"),
      img: formData.get("img"),
      material: formData.get("material"),
    };

    await updateFurniture(id, furnitureInfo);

    ctx.page.redirect(`/details/${id}`);
  }
}

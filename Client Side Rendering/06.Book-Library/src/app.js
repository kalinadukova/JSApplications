import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { until } from "../../node_modules/lit-html/directives/until.js";
import { createTable } from "./catalog.js";
import { showCreateForm } from "./create.js";
import { showEditForm } from "./update.js";

export { html, until };

export const contex = {
  update,
};

function update() {
  render(
    [createTable(contex), showCreateForm(contex), showEditForm(contex)],
    document.body
  );
}
update();

import { html } from "./app.js";
import { createBook } from "./requests.js";

const createBookTemplate = (updateTable) => html` <form
  @submit=${(ev) => onSubmit(ev, updateTable)}
  id="add-form"
>
  <h3>Add book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." />
  <input type="submit" value="Submit" />
</form>`;

export function showCreateForm(contex) {
  if (contex.book == undefined) {
    return createBookTemplate(contex.update);
  } else {
    return null;
  }
}

async function onSubmit(event, updateTable) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const book = {
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
  };

  await createBook(book);

  event.target.reset();
  updateTable();
}

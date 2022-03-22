import { html } from "./app.js";
import { editBook } from "./requests.js";

const editBookTemplate = (contex, book) => html` <form
  @submit=${(ev) => onSubmit(ev, contex)}
  id="edit-form"
>
  <input type="hidden" name="id" .value=${book._id} />
  <h3>Edit book</h3>
  <label>TITLE</label>
  <input type="text" name="title" .value=${book.title} placeholder="Title..." />
  <label>AUTHOR</label>
  <input
    type="text"
    name="author"
    .value=${book.author}
    placeholder="Author..."
  />
  <input type="submit" value="Save" />
</form>`;

export function showEditForm(contex) {
  if (contex.book != undefined) {
    return editBookTemplate(contex, contex.book);
  } else {
    return null;
  }
}

async function onSubmit(event, contex) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const id = formData.get("id");

  const book = {
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
  };

  console.log(id);

  await editBook(book, id);

  event.target.reset();
  delete contex.book;
  contex.update();
}

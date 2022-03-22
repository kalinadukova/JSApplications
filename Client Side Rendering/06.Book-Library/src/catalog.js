import { html, until } from "./app.js";
import { getBooks, deleteBook } from "./requests.js";

const tableTemplate = (booksPromise) => html`
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${until(
        booksPromise,
        html`<tr>
          <td colspan="3">Loading&hellip;</td>
        </tr>`
      )}
    </tbody>
  </table>
`;

const tableRow = (b, onEdit, onDelete) => html`
  <tr>
    <td>${b.title}</td>
    <td>${b.author}</td>
    <td>
      <button @click=${onEdit}>Edit</button>
      <button @click=${onDelete}>Delete</button>
    </td>
  </tr>
`;

export function createTable(ctx) {
  return tableTemplate(loadBooks(ctx));
}

async function loadBooks(ctx) {
  const data = await getBooks();

  const books = Object.entries(data).map(([k, v]) =>
    Object.assign(v, { _id: k })
  );

  return Object.values(books).map((book) =>
    tableRow(book, onEdit.bind(null, book, ctx), onDelete.bind(null, book, ctx))
  );
}

function onEdit(book, ctx) {
  ctx.book = book;
  ctx.update();
}

async function onDelete(book, ctx) {
  await deleteBook(book._id);
  ctx.update();
}

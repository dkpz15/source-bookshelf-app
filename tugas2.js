document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("book-form");
  const titleInput = document.getElementById("title-input");
  const authorInput = document.getElementById("author-input");
  const yearInput = document.getElementById("year-input");
  const isCompleteCheckbox = document.getElementById("is-complete-checkbox");
  const unfinishedBooks = document.getElementById("unfinishedBooks");
  const finishedBooks = document.getElementById("finishedBooks");
  const inputSearch = document.getElementById("input-search");
  const buttonSearch = document.getElementById("button-search");

  let books = [];

  const displayBooks = () => {
    const searchInput = inputSearch.value.toLowerCase();

    unfinishedBooks.innerHTML = "";
    finishedBooks.innerHTML = "";

    books.forEach((book) => {
      if (book.title.toLowerCase().includes(searchInput)) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-finished-unfinished");

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const year = document.createElement("p");
        year.textContent = `Year: ${book.year}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-edit-delete");

        const editButton = document.createElement("button");
        editButton.classList.add("button-edit");
        editButton.textContent = book.isComplete
          ? "Unfinished Reading"
          : "Finished Reading";

        editButton.addEventListener("click", () => {
          toggleBookStatus(book.id);
          displayBooks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button-delete");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
          const confirmDelete = confirm(
            `Are you sure want to delete the book with the title "${book.title}" ? `
          );
          if (confirmDelete) {
            deleteBook(book.id);
            displayBooks();
          }
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        cardContainer.appendChild(title);
        cardContainer.appendChild(author);
        cardContainer.appendChild(year);
        cardContainer.appendChild(buttonContainer);

        if (book.isComplete) {
          finishedBooks.appendChild(cardContainer);
        } else {
          unfinishedBooks.appendChild(cardContainer);
        }
      }
    });
  };

  const toggleBookStatus = (id) => {
    books = books.map((book) =>
      book.id === id ? { ...book, isComplete: !book.isComplete } : book
    );
    localStorage.setItem("books", JSON.stringify(books));
  };

  const deleteBook = (id) => {
    books = books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
  };

  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    displayBooks();
  }

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);
    const isComplete = isCompleteCheckbox.checked;

    const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    isCompleteCheckbox.checked = false;
  });

  inputSearch.addEventListener("input", displayBooks);
  buttonSearch.addEventListener("click", displayBooks);
});

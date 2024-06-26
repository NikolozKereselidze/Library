"use strict";

const form = document.querySelector(".book-form");
const formContainer = document.querySelector(".form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const read = document.querySelector("#read");
const bookContainer = document.querySelector(".book-container");
const addButton = document.querySelector(".book-button");

const myLibrary = [];

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

const formReset = function () {
  title.value = "";
  author.value = "";
  read.checked = false;
};

const toggleHidden = function () {
  formContainer.classList.toggle("hidden");
  addButton.classList.toggle("hidden");
};

addButton.addEventListener("click", () => {
  toggleHidden();

  //   Hide book list
  bookContainer.classList.toggle("hidden");
});

function addBookToLibrary(e) {
  e.preventDefault();

  // Check if the book already exists in the library
  const bookExists = myLibrary.some(
    (el) => el.title === title.value && el.author === author.value
  );

  // If the book doesn't exist, create it and add it to the library
  if (!bookExists) {
    const newBook = new Book(title.value, author.value, read.checked);
    myLibrary.push(newBook);
    displayBook(newBook);
  }

  formReset();
  toggleHidden();
}

function displayBook(book) {
  const bookList = document.querySelector(".book-list");
  bookContainer.classList.toggle("hidden");

  const span = document.createElement("span");
  span.classList.add("card-span");
  span.textContent = "x";

  const bookInput = document.createElement("input");
  bookInput.type = "checkbox";

  const li = document.createElement("li");
  li.classList.add("book-card");

  const title = document.createElement("h3");
  const author = document.createElement("p");
  const read = document.createElement("span");

  myLibrary.forEach((el, i) => {
    title.textContent = el.title;
    author.textContent = `${el.author}`;
    read.textContent = el.read ? "Read" : "Not read";
  });

  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(read);
  li.appendChild(span);
  li.appendChild(bookInput);

  bookList.appendChild(li);

  span.addEventListener("click", () => {
    bookList.removeChild(span.parentElement);
    myLibrary.forEach((el, i) => {
      if (el.title === title.textContent && el.author === author.textContent) {
        myLibrary.splice(i, 1);
      }
    });
  });

  bookList.addEventListener("click", (event) => {
    if (event.target === bookInput) {
      const index = Array.from(bookList.children).indexOf(li);
      myLibrary[index].read = bookInput.checked;
      read.textContent = myLibrary[index].read ? "Read" : "Not read";
    }
  });
}

form.addEventListener("submit", addBookToLibrary);

"use strict";

const form = document.querySelector(".book-form");
const formContainer = document.querySelector(".form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const read = document.querySelector("#read");
const addButton = document.querySelector(".book-button");

const myLibrary = [
  { title: "Vepkhistkaosani", author: "Shota Rustaveli", read: true },
];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
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

  const span = document.createElement("span");
  span.classList.add("card-span");
  span.textContent = "x";

  const li = document.createElement("li");
  li.classList.add("book-card");

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.textContent = `by ${book.author}`;

  const read = document.createElement("span");
  read.textContent = book.read ? "Read" : "Not read";

  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(read);

  li.appendChild(span);
  bookList.appendChild(li);
}

form.addEventListener("submit", addBookToLibrary);

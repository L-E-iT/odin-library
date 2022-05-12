function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

let library = [];

const form = document.querySelector('form');

Book.prototype.getElement = function(index) {
    let element = document.createElement('div');
    element.classList.add('book');
    element.setAttribute('data-index', index);

    let title = document.createElement('div');
    title.textContent = this.title;
    title.classList.add('book-title','text-medium', 'text-bold');

    let bookInfoContainer = document.createElement('div');
    bookInfoContainer.classList.add('book-info');

    let bookInfo = document.createElement('div');
    bookInfo.textContent = this.author + ' - ' + this.pages + ' pages';
    bookInfo.classList.add('text-small');

    let isRead = document.createElement('div');
    isRead.textContent = this.isRead ? 'Read' : 'Not read';
    isRead.classList.add('text-small');
    isRead.style.color = this.isRead ? '#3c8c38' : '#a20606';

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let removeButton = document.createElement('img');
    removeButton.setAttribute('src', './images/delete.svg');
    removeButton.classList.add('remove-book-button');
    removeButton.addEventListener('click', removeBookFromLibrary);

    let readButton = document.createElement('img');
    if (this.isRead) {
        readButton.setAttribute('src', './images/book-cancel.svg');
    } else {
        readButton.setAttribute('src', './images/book-check.svg');
    }
    readButton.classList.add('read-book-button');
    readButton.addEventListener('click', readBookToggle);

    element.appendChild(title);
    bookInfoContainer.appendChild(bookInfo);
    bookInfoContainer.appendChild(isRead);
    element.appendChild(bookInfoContainer);
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(removeButton);
    element.appendChild(buttonContainer);

    return element;
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    library.push(book);
}

function removeBookFromLibrary(event) {
    let index = event.target.parentElement.getAttribute('data-index');
    library.splice(Number(index), 1);
    createLibraryPage(library);
}

function createLibraryPage(library) {
    const bookDiv = document.querySelector('.book-list-container');

    while (bookDiv.firstChild) {
        bookDiv.removeChild(bookDiv.firstChild);
    }

    library.forEach((book, index) => {
        bookDiv.appendChild(book.getElement(index));
    });
}

function openAddBookModal() {
    const modal = document.querySelector('.modal-container');
    modal.style.display = 'block';
}

function closeAddBookModal() {
    const modal = document.querySelector('.modal-container');
    modal.style.display = 'none';
}

function readBookToggle(e) {
    let index = e.target.parentElement.parentElement.getAttribute('data-index');
    library[Number(index)].isRead = !library[Number(index)].isRead;
    createLibraryPage(library);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(form);
    addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('isRead') === 'on');
    createLibraryPage(library);
    closeAddBookModal();
    form.reset();
});

addBookToLibrary("A Game of Thrones", "George R.R. Martin", 400, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 300, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, true);
createLibraryPage(library);
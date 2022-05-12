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

    let bookInfo = document.createElement('div');
    bookInfo.textContent = this.author + ' - ' + this.pages + ' pages';
    bookInfo.classList.add('book-info', 'text-small');

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', removeBookFromLibrary);

    element.appendChild(title);
    element.appendChild(bookInfo);
    element.appendChild(removeButton);

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

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(form);
    addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('isRead'));
    createLibraryPage(library);
    closeAddBookModal();
    form.reset();
});

addBookToLibrary("A Game of Thrones", "George R.R. Martin", 400, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 300, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, true);
createLibraryPage(library);
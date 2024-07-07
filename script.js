const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to remove a book from the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Function to display all books in the library
function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear the library display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
            <div class="action-buttons">
                <button class="toggle-read-button">Toggle Read</button>
                <button class="remove-book-button">Remove</button>
            </div>
        `;

        libraryDiv.appendChild(bookCard);

        // Add event listeners for buttons
        bookCard.querySelector('.toggle-read-button').addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });

        bookCard.querySelector('.remove-book-button').addEventListener('click', () => {
            removeBook(index);
        });
    });
}

// Get modal elements
const modal = document.getElementById('modal');
const newBookButton = document.getElementById('new-book-button');
const closeButton = document.getElementsByClassName('close-button')[0];

// Show the modal
newBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close the modal when clicking the close button
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    modal.style.display = 'none';
    document.getElementById('book-form').reset();
});

// Manually add some books for demonstration
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);

// Initial display of books
displayBooks();
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  addBookToStore(book) {
    const bookStore = document.querySelector('#book-store');
    const row = document.createElement('tr');
  
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.isbn}</td>
                     <td><a href="#" class="delete">X</a></td>`;
    
    bookStore.appendChild(row);     
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  showMessage(message, className) {  
    // Creaet div
    let timer = 3000;
    const div = document.createElement('div');
    
    if(document.querySelector(`.alert`) !== null){
      timer += 1000;
      return;
    }

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    
    // Insert new div in the document before Book form
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Destroy message div after 3 seconds
    setTimeout(function(){
    document.querySelector(`.${className}`).remove();
    },timer);
  }

  deleteBookFromStore(target) {
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.remove();
    }
  }
}

class Storage {
  static getBooks(){
    let books;

    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    } 

    return books;
  }

  static displayBooks(){
    const books = Storage.getBooks();
    const ui = new UI();
    books.forEach(book => {
      if(book !== null ){
        ui.addBookToStore(book);
      }
    });
    
  }

  static addBook(book){
    const books = Storage.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Storage.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Storage.displayBooks);

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get Form data
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
        
  // Create Book Object      
  const book = new Book(title, author, isbn);
  // Create UI Object
  const ui = new UI();
  // Validate
  if(title === '' || author === '' || isbn === ''){
    ui.showMessage('Please fill in all fields', 'error');  
  } else { 
    Storage.addBook(book);
    ui.addBookToStore(book);
    ui.showMessage('Added Book to the store', 'success');
    ui.clearFields();
  }
  e.preventDefault();
});


// Event Listener for Delete event

document.getElementById('book-store').addEventListener('click', function(e){
  // Create UI Object
  const ui = new UI();

  // Delete book from the book store
  ui.deleteBookFromStore(e.target);
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showMessage('Book Removed', 'success');
})
console.log('ES6 classes');

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
    const div = document.createElement('div');
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message));
    
    // Insert new div in the document before Book form
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Destroy message div after 3 seconds
    setTimeout(function(){
    document.querySelector(`.${className}`).remove();
    },3000);
  }

  deleteBookFromStore(target) {
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.remove();
    }
  }
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get Form data
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
        
  // Create Book Object      
  const book = new Book(title, author, isbn);
  console.log(book);
  // Create UI Object
  const ui = new UI();
  console.log(ui);
  // Validate
  if(title === '' || author === '' || isbn === ''){
    console.log('null');
    ui.showMessage('Please fill in all fields', 'error');  
  } else { 
    ui.addBookToStore(book);
    ui.showMessage('Added Book to the store', 'success');
    ui.clearFields();
  }
  e.preventDefault();
});


document.getElementById('book-store').addEventListener('click', function(e){
  // Create UI Object
  const ui = new UI();

  // Delete book from the book store
  ui.deleteBookFromStore(e.target);
  ui.showMessage('Book Removed', 'success');
})
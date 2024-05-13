const bookForm = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');

let myLibrary = [];

// Book Constructor
function Book(title, author, chapters, language, synopsis) {
  this.title = title;
  this.author = author;
  this.chapters = chapters;
  this.language = language;
  this.synopsis = synopsis;
}

// Add Book to Library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Display Books in Library
function displayBooks() {
  bookList.innerHTML = '';

  myLibrary.forEach(function(book, index) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.setAttribute('data-index', index);

    const title = document.createElement('p');
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const chapters = document.createElement('p');
    chapters.textContent = `Available Chapters: ${book.chapters}`;

    const language = document.createElement('p');
    language.textContent = `Language: ${book.language}`;

    const synopsis = document.createElement('p');
    synopsis.textContent = `Synopsis: ${book.synopsis}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove Book';

    deleteBtn.addEventListener('click', function(e) {
      const index = e.target.parentNode.getAttribute('data-index');
      myLibrary.splice(index, 1);
      displayBooks();
    });

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(chapters);
    bookDiv.appendChild(language);
    bookDiv.appendChild(synopsis);
    bookDiv.appendChild(deleteBtn);

    bookList.appendChild(bookDiv);
  });
}

// Form Submit Event Listener
bookForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const chapters = document.querySelector('#chapters').value;
  const language = document.querySelector('#language').value;
  const synopsis = document.querySelector('#synopsis').value;

  const book = new Book(title, author, chapters, language, synopsis);

  addBookToLibrary(book);
  displayBooks();

  bookForm.reset();
});

// PDF

function uploadPDF() {
  const input = document.getElementById('pdf-upload');
  const file = input.files[0];

  if (file.type === 'application/pdf') {
    const reader = new FileReader();

    reader.onload = function(e) {
      const pdfContainer = document.getElementById('pdf-container');
      const pdf = document.createElement('embed');
      pdf.setAttribute('src', e.target.result);
      pdf.setAttribute('type', 'application/pdf');
      pdf.setAttribute('width', '100%');
      pdf.setAttribute('height', '100%');
      pdfContainer.appendChild(pdf);
    };

    reader.readAsDataURL(file);
  } else {
    alert('Please upload a PDF file.');
  }
}

displayBooks();

//puxa do dba

/*function fetchLivros() {
  fetch('/livros')
    .then(response => response.json())
    .then(data => {
      // Manipule os dados recebidos do banco de dados
      // Aqui está um exemplo de como atualizar o HTML
      const bookList = document.querySelector('#book-list');
      bookList.innerHTML = '';

      data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = document.createElement('p');
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        // ... Continuar para as outras informações do livro

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        // ... Adicionar outros elementos do livro ao bookDiv

        bookList.appendChild(bookDiv);
      });
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      // Lógica adicional para tratar o erro, se necessário
    });
}

// Chamar a função fetchLivros() para buscar e exibir os livros ao carregar a página
fetchLivros();
*/
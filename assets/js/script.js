fetch('https://striveschool-api.herokuapp.com/books')
.then(response => response.json())
.then(data => {
  const booksRow = document.getElementById('booksRow');
  data.forEach(book => {
    const card = `
      <div class="col-md-3 mb-4">
        <div class="card">
          <img src="${book.img}" class="card-img-top" alt="Book Cover">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Prezzo: $${book.price}</p>
            <button class="btn btn-danger btn-sm mb-2 remove-book" data-id="${book.asin}">Scarta</button>
            <button class="btn btn-primary btn-sm mb-2 add-to-cart" data-id="${book.asin}">Aggiungi al carrello</button>
          </div>
        </div>
      </div>
    `;
    booksRow.innerHTML += card;
  });

  const scrollToCartButton = document.getElementById('scrollToCart');
  scrollToCartButton.addEventListener('click', () => {
    const cartSection = document.getElementById('cartList');
    cartSection.scrollIntoView({ behavior: 'smooth' });
  });

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  const removeBookButtons = document.querySelectorAll('.remove-book');
  removeBookButtons.forEach(button => {
    button.addEventListener('click', removeBook);
  });
});

const cartList = document.getElementById('cartList');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(event) {
const bookId = event.target.getAttribute('data-id');
const bookToAdd = event.target.parentElement.querySelector('.card-title').textContent;
cartItems.push(bookToAdd);
localStorage.setItem('cartItems', JSON.stringify(cartItems));
displayCart();
}

function removeBook(event) {
const bookId = event.target.getAttribute('data-id');
event.target.closest('.col-md-3').remove();
}

function displayCart() {
    cartList.innerHTML = '';
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Rimuovi dal carrello';
      removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mb-2', 'remove-from-cart');
      removeButton.addEventListener('click', removeFromCart);
      li.appendChild(removeButton);
      cartList.appendChild(li);
    });
  }

  displayCart();

  function removeFromCart(event) {
    const itemToRemove = event.target.parentElement.textContent.trim();
    cartItems = cartItems.filter(item => item !== itemToRemove);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCart();
  }

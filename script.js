// 1. Category Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');
    menuCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 2. Shopping Cart Logic
let cart = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

document.getElementById('cart-toggle').addEventListener('click', () => {
  cartSidebar.classList.add('open');
});

document.getElementById('close-cart').addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    cart.push({ name, price });
    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeItem(${index})">❌</button>`;
    cartItemsList.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Order placed successfully! Thank you for ordering from Brew & Bite.');
  cart = [];
  updateCartUI();
  cartSidebar.classList.remove('open');
});

// 3. Table Reservation Logic
document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('guest-name').value;
  const guests = document.getElementById('guest-count').value;
  const time = document.getElementById('booking-time').value;

  document.getElementById('booking-message').textContent = 
    `Table reserved for ${name} (${guests} guests) at ${time}!`;
  e.target.reset();
});

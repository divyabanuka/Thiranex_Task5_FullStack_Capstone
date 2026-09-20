// ============================================================
// SHOPSPHERE - THIRANEX TASK 5
// Shopping Cart Functionality
// ============================================================


// ============================================================
// LOAD CART
// ============================================================

function getCart() {

  return JSON.parse(
    localStorage.getItem("cart")
  ) || [];

}


// ============================================================
// SAVE CART
// ============================================================

function saveCart(cart) {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}


// ============================================================
// UPDATE CART COUNT
// ============================================================

function updateCartCount() {

  const cart = getCart();

  const cartCount =
    document.getElementById("cart-count");

  if (cartCount) {

    const totalItems =
      cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

    cartCount.textContent = totalItems;

  }

}


// ============================================================
// DISPLAY CART
// ============================================================

function displayCart() {

  const cart = getCart();

  const container =
    document.getElementById("cart-container");

  const emptyCart =
    document.getElementById("empty-cart");

  const cartSummary =
    document.getElementById("cart-summary");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  // ================= EMPTY CART =================

  if (cart.length === 0) {

    if (emptyCart) {
      emptyCart.style.display = "block";
    }

    if (cartSummary) {
      cartSummary.style.display = "none";
    }

    return;

  }


  if (emptyCart) {
    emptyCart.style.display = "none";
  }

  if (cartSummary) {
    cartSummary.style.display = "block";
  }


  // ================= CART ITEMS =================

  cart.forEach(item => {

    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `

      <div class="cart-item-image">
        ${item.icon}
      </div>

      <div class="cart-item-info">

        <h3>${item.name}</h3>

        <p>
          ₹${item.price.toLocaleString("en-IN")}
          each
        </p>

      </div>


      <div class="quantity-controls">

        <button
          onclick="changeQuantity(${item.id}, -1)"
        >
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button
          onclick="changeQuantity(${item.id}, 1)"
        >
          +
        </button>

      </div>


      <strong class="cart-item-total">
        ₹${(
          item.price * item.quantity
        ).toLocaleString("en-IN")}
      </strong>


      <button
        class="remove-item-btn"
        onclick="removeFromCart(${item.id})"
      >
        🗑️
      </button>

    `;


    container.appendChild(cartItem);

  });


  updateSummary();

}


// ============================================================
// CHANGE QUANTITY
// ============================================================

function changeQuantity(
  productId,
  change
) {

  const cart = getCart();

  const item =
    cart.find(
      product => product.id === productId
    );

  if (!item) {
    return;
  }

  item.quantity += change;


  // Remove if quantity becomes zero

  if (item.quantity <= 0) {

    const updatedCart =
      cart.filter(
        product => product.id !== productId
      );

    saveCart(updatedCart);

  } else {

    saveCart(cart);

  }


  displayCart();
  updateCartCount();

}


// ============================================================
// REMOVE PRODUCT
// ============================================================

function removeFromCart(productId) {

  const cart = getCart();

  const updatedCart =
    cart.filter(
      item => item.id !== productId
    );

  saveCart(updatedCart);

  displayCart();
  updateCartCount();

}


// ============================================================
// CLEAR CART
// ============================================================

function clearCart() {

  const cart = getCart();

  if (cart.length === 0) {
    return;
  }


  const confirmation =
    confirm(
      "Are you sure you want to clear your cart?"
    );


  if (confirmation) {

    localStorage.removeItem("cart");

    displayCart();
    updateCartCount();

  }

}


// ============================================================
// UPDATE SUMMARY
// ============================================================

function updateSummary() {

  const cart = getCart();

  let totalItems = 0;
  let totalPrice = 0;


  cart.forEach(item => {

    totalItems += item.quantity;

    totalPrice +=
      item.price * item.quantity;

  });


  const totalItemsElement =
    document.getElementById("total-items");

  const totalPriceElement =
    document.getElementById("total-price");


  if (totalItemsElement) {

    totalItemsElement.textContent =
      totalItems;

  }


  if (totalPriceElement) {

    totalPriceElement.textContent =
      "₹" +
      totalPrice.toLocaleString("en-IN");

  }

}


// ============================================================
// CHECKOUT
// ============================================================

function checkout() {

  const cart = getCart();

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Please add products first."
    );

    return;

  }


  alert(
    "🎉 Thank you for shopping with ShopSphere!\n\n" +
    "Your order has been placed successfully."
  );


  localStorage.removeItem("cart");

  displayCart();
  updateCartCount();

}


// ============================================================
// MOBILE MENU
// ============================================================

function toggleMenu() {

  const menu =
    document.getElementById("mobile-menu");

  if (menu) {

    menu.classList.toggle("show");

  }

}


// ============================================================
// INITIALIZE CART PAGE
// ============================================================

displayCart();
updateCartCount();
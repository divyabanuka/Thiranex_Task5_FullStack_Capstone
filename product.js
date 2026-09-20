// ============================================================
// SHOPSPHERE - THIRANEX TASK 5
// Product Catalog & Cart Logic
// ============================================================

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "electronics",
    icon: "🎧",
    description: "Comfortable wireless headphones with clear sound."
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "electronics",
    icon: "⌚",
    description: "Smart watch with fitness and notification features."
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1299,
    category: "electronics",
    icon: "🔊",
    description: "Portable speaker with powerful sound."
  },
  {
    id: 4,
    name: "Classic Sneakers",
    price: 1999,
    category: "fashion",
    icon: "👟",
    description: "Comfortable sneakers for everyday use."
  },
  {
    id: 5,
    name: "Casual T-Shirt",
    price: 799,
    category: "fashion",
    icon: "👕",
    description: "Soft and comfortable casual t-shirt."
  },
  {
    id: 6,
    name: "Backpack",
    price: 1199,
    category: "fashion",
    icon: "🎒",
    description: "Durable backpack suitable for college and travel."
  },
  {
    id: 7,
    name: "Classic Wrist Watch",
    price: 1799,
    category: "accessories",
    icon: "⌚",
    description: "Elegant wrist watch for everyday style."
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 999,
    category: "accessories",
    icon: "🕶️",
    description: "Stylish sunglasses with a modern design."
  },
  {
    id: 9,
    name: "Table Lamp",
    price: 899,
    category: "home",
    icon: "💡",
    description: "Modern table lamp for your study or workspace."
  },
  {
    id: 10,
    name: "Coffee Mug",
    price: 499,
    category: "home",
    icon: "☕",
    description: "Simple ceramic mug for everyday use."
  },
  {
    id: 11,
    name: "Cushion Set",
    price: 699,
    category: "home",
    icon: "🛋️",
    description: "Comfortable decorative cushion set."
  },
  {
    id: 12,
    name: "Power Bank",
    price: 1599,
    category: "electronics",
    icon: "🔋",
    description: "Portable power bank for charging your devices."
  }
];


// ============================================================
// DISPLAY PRODUCTS
// ============================================================

function displayProducts(productList) {

  const productGrid =
    document.getElementById("product-grid");

  const noResults =
    document.getElementById("no-results");

  if (!productGrid) {
    return;
  }

  productGrid.innerHTML = "";

  if (productList.length === 0) {

    if (noResults) {
      noResults.style.display = "block";
    }

    return;
  }

  if (noResults) {
    noResults.style.display = "none";
  }

  productList.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <span>${product.icon}</span>
      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-bottom">

          <strong>₹${product.price.toLocaleString("en-IN")}</strong>

          <button
            class="add-cart-btn"
            onclick="addToCart(${product.id})"
          >
            🛒 Add
          </button>

        </div>

      </div>
    `;

    productGrid.appendChild(card);
  });
}


// ============================================================
// SEARCH & CATEGORY FILTER
// ============================================================

function filterProducts() {

  const searchInput =
    document.getElementById("search-input");

  const categoryFilter =
    document.getElementById("category-filter");

  const searchText =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

  const selectedCategory =
    categoryFilter
      ? categoryFilter.value
      : "all";

  const filteredProducts = products.filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayProducts(filteredProducts);
}


// ============================================================
// ADD TO CART
// ============================================================

function addToCart(productId) {

  const product =
    products.find(item => item.id === productId);

  if (!product) {
    return;
  }

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct =
    cart.find(item => item.id === productId);

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      quantity: 1
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  alert(`${product.name} added to cart!`);
}


// ============================================================
// CART COUNT
// ============================================================

function updateCartCount() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

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
// INITIAL LOAD
// ============================================================

displayProducts(products);
updateCartCount();
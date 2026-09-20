const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "electronics",
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "electronics",
        icon: "⌚"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1299,
        category: "electronics",
        icon: "🔊"
    },
    {
        id: 4,
        name: "Classic Sneakers",
        price: 1999,
        category: "fashion",
        icon: "👟"
    },
    {
        id: 5,
        name: "Casual T-Shirt",
        price: 799,
        category: "fashion",
        icon: "👕"
    },
    {
        id: 6,
        name: "Backpack",
        price: 1199,
        category: "fashion",
        icon: "🎒"
    },
    {
        id: 7,
        name: "Classic Wrist Watch",
        price: 1799,
        category: "accessories",
        icon: "⌚"
    },
    {
        id: 8,
        name: "Sunglasses",
        price: 999,
        category: "accessories",
        icon: "🕶️"
    },
    {
        id: 9,
        name: "Table Lamp",
        price: 899,
        category: "home",
        icon: "💡"
    },
    {
        id: 10,
        name: "Coffee Mug",
        price: 499,
        category: "home",
        icon: "☕"
    },
    {
        id: 11,
        name: "Cushion Set",
        price: 699,
        category: "home",
        icon: "🛋️"
    },
    {
        id: 12,
        name: "Power Bank",
        price: 1599,
        category: "electronics",
        icon: "🔋"
    }
];

function displayProducts(list) {

    const grid = document.getElementById("product-grid");
    const noResults = document.getElementById("no-results");

    grid.innerHTML = "";

    if (list.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    list.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <strong>₹${product.price}</strong>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);
    });
}

function filterProducts() {

    const searchInput =
        document.getElementById("search-input").value
        .toLowerCase();

    const category =
        document.getElementById("category-filter").value;

    const filtered = products.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchInput);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

function addToCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product =
        products.find(function(item) {
            return item.id === productId;
        });

    const existing =
        cart.find(function(item) {
            return item.id === productId;
        });

    if (existing) {
        existing.quantity++;
    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const count =
        cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

    const element =
        document.getElementById("cart-count");

    if (element) {
        element.textContent = count;
    }
}

function toggleMenu() {

    const menu =
        document.getElementById("mobile-menu");

    menu.classList.toggle("show");
}

displayProducts(products);
updateCartCount();
function getCart() {
    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];
}

function saveCart(cart) {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function updateCartCount() {

    const cart = getCart();

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

function displayCart() {

    const cart = getCart();

    const container =
        document.getElementById("cart-container");

    const emptyCart =
        document.getElementById("empty-cart");

    const summary =
        document.getElementById("cart-summary");

    container.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        summary.style.display = "none";

        updateCartCount();

        return;
    }

    emptyCart.style.display = "none";
    summary.style.display = "block";

    cart.forEach(function(item) {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-total">

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

                <button
                    class="remove-item-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;

        container.appendChild(cartItem);
    });

    updateSummary();
    updateCartCount();
}

function changeQuantity(id, amount) {

    const cart = getCart();

    const item =
        cart.find(function(product) {
            return product.id === id;
        });

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {

        const index =
            cart.findIndex(function(product) {
                return product.id === id;
            });

        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

function removeFromCart(id) {

    let cart = getCart();

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    saveCart(cart);
    displayCart();
}

function clearCart() {

    if (confirm("Are you sure you want to clear your cart?")) {

        localStorage.removeItem("cart");
        displayCart();
    }
}

function updateSummary() {

    const cart = getCart();

    const totalItems =
        cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

    const totalPrice =
        cart.reduce(function(total, item) {
            return total + item.price * item.quantity;
        }, 0);

    document.getElementById("total-items")
        .textContent = totalItems;

    document.getElementById("total-price")
        .textContent = totalPrice;
}

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert(
        "🎉 Order placed successfully! Thank you for shopping with ShopSphere."
    );

    localStorage.removeItem("cart");

    displayCart();
}

function toggleMenu() {
    document
        .getElementById("mobile-menu")
        .classList.toggle("show");
}

displayCart();
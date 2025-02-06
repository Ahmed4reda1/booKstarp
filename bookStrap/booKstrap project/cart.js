document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    const submitOrderBtn = document.getElementById("submit-order");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Save the updated cart to localStorage
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Display the cart items
    function loadCartItems() {
        cartList.innerHTML = ''; // Clear previous cart items
        let totalPrice = 0;

        if (cartItems.length === 0) {
            cartList.innerHTML = '<p class="text-center">Your cart is empty.</p>';
            totalPriceElement.textContent = `Total Price: ج.م 0.00`;
            return;
        }

        cartItems.forEach((item, index) => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("col-lg-4", "col-md-6", "col-sm-12");

            cartItemDiv.innerHTML = `
                <div class="card shadow-sm border-light rounded">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">ج.م ${item.price.toFixed(2)}</p> <!-- Display price with currency symbol -->
                        <button class="btn btn-danger remove-btn" data-index="${index}">Remove from Cart</button>
                    </div>
                </div>
            `;

            cartList.appendChild(cartItemDiv);
            totalPrice += parseFloat(item.price); // Add to the total price
        });

        totalPriceElement.textContent = `Total Price: ج.م ${totalPrice.toFixed(2)}`; // Display total price with currency symbol

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute("data-index"));
                cartItems.splice(index, 1); // Remove item from cart
                saveCart(); // Save updated cart to localStorage
                loadCartItems(); // Reload cart to update the page
            });
        });
    }

    // Load the cart items when the page loads
    loadCartItems();

    // Checkout button functionality (display modal)
    checkoutBtn.addEventListener("click", function () {
        checkoutModal.show();
    });

    // Submit order and display customer details, then redirect to booKstrap.html
    submitOrderBtn.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;

        if (name && address && phone) {
            alert(`Order Submitted!\n\nCustomer Info:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`);
            // After submission, clear cart and redirect
            cartItems = [];
            saveCart();
            loadCartItems();
            checkoutModal.hide(); // Close modal
            // Redirect to booKstrap.html after clicking OK
            window.location.href = "booKstrap.html";
        } else {
            alert("Please fill out all fields.");
        }
    });
});

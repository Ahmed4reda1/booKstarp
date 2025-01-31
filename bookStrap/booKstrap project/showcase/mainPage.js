document.addEventListener("DOMContentLoaded", function () {
    const heartButtons = document.querySelectorAll('.heart-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Save favourite books to localStorage
    function saveFavourites() {
        localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
    }

    // Save cart items to localStorage
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function toggleHeart(button) {
        const icon = button.querySelector('i');
        const bookCard = button.closest(".card");
        const bookData = {
            title: bookCard.querySelector(".card-title").textContent.trim(),
            image: bookCard.querySelector("img").src,
            price: bookCard.querySelector(".fs-5").textContent.trim()
        };

        const index = favouriteBooks.findIndex(book => book.title === bookData.title);

        if (index === -1) {
            favouriteBooks.push(bookData);
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill', 'text-danger');
        } else {
            favouriteBooks.splice(index, 1);
            icon.classList.remove('bi-heart-fill', 'text-danger');
            icon.classList.add('bi-heart');
        }

        saveFavourites();
    }

    function addToCart(button) {
        const bookCard = button.closest(".card");
        const bookData = {
            title: bookCard.querySelector(".card-title").textContent.trim(),
            image: bookCard.querySelector("img").src,
            price: bookCard.querySelector(".fs-5").textContent.trim()
        };

        // Add book to cart if not already added
        const index = cartItems.findIndex(item => item.title === bookData.title);
        if (index === -1) {
            cartItems.push(bookData);
            saveCart();
            alert(`${bookData.title} added to the cart!`);
        } else {
            alert(`${bookData.title} is already in your cart!`);
        }
    }

    // Attach event listeners to heart buttons
    heartButtons.forEach(button => {
        button.addEventListener('click', () => toggleHeart(button));
    });

    // Attach event listeners to Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });
});

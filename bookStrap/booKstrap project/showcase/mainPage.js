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
    
        // Extract the price text
        const priceText = bookCard.querySelector(".fs-5").textContent.trim(); // Get the price text (e.g., "120 ج.م")
        console.log("Price Text:", priceText); // Debugging: Check the raw price text
    
        // Extract the numeric value
        const priceNumber = parseFloat(priceText.replace(/[^\d.]/g, '')); // Remove non-numeric characters
        console.log("Price Number:", priceNumber); // Debugging: Check the extracted number
    
        // Create the book data object
        const bookData = {
            title: bookCard.querySelector(".card-title").textContent.trim(),
            image: bookCard.querySelector("img").src,
            price: priceNumber // Store the extracted number
        };
    
        console.log("Book Data:", bookData); // Debugging: Verify the book data
    
        // Check if the book is already in favourites
        const index = favouriteBooks.findIndex(book => book.title === bookData.title);
    
        if (index === -1) {
            // Add to favourites
            favouriteBooks.push(bookData);
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill', 'text-danger');
        } else {
            // Remove from favourites
            favouriteBooks.splice(index, 1);
            icon.classList.remove('bi-heart-fill', 'text-danger');
            icon.classList.add('bi-heart');
        }
    
        // Save updated favourites to localStorage
        saveFavourites();
    }

    function addToCart(button) {
        const bookCard = button.closest(".card");

        // Extract the price text
        const priceText = bookCard.querySelector(".fs-5").textContent.trim(); // Get the price text (e.g., "120 ج.م")
        console.log("Price Text:", priceText); // Debugging: Check the raw price text

        // Extract the numeric value
        const priceNumber = parseFloat(priceText.replace(/[^\d.]/g, '')); // Remove non-numeric characters
        console.log("Price Number (Before Fix):", priceNumber); // Debugging: Check the extracted number

        // Fix the price if it's incorrectly parsed
        const fixedPrice = priceNumber * 1000; // Adjust this multiplier based on your needs
        console.log("Fixed Price:", fixedPrice); // Debugging: Check the fixed price

        // Create the book data object
        const bookData = {
            title: bookCard.querySelector(".card-title").textContent.trim(),
            image: bookCard.querySelector("img").src,
            price: fixedPrice // Store the fixed price
        };

        console.log("Book Data:", bookData); // Debugging: Verify the book data

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

    // Set the initial heart state based on favouriteBooks in localStorage
    heartButtons.forEach(button => {
        const icon = button.querySelector('i');
        const bookCard = button.closest(".card");

        // Extract book data from the card
        const bookData = {
            title: bookCard.querySelector(".card-title").textContent.trim(),
            image: bookCard.querySelector("img").src,
            price: parseFloat(bookCard.querySelector(".fs-5").textContent.replace(/[^\d.]/g, '')) // Extract price as a number
        };

        // Check if the book is in favourites
        const index = favouriteBooks.findIndex(book => book.title === bookData.title);
        if (index !== -1) {
            // If the book is in favourites, make the heart filled
            icon.classList.add('bi-heart-fill', 'text-danger');
            icon.classList.remove('bi-heart');
        } else {
            // If the book is not in favourites, make the heart empty
            icon.classList.add('bi-heart');
            icon.classList.remove('bi-heart-fill', 'text-danger');
        }
    });

    // Attach event listeners to heart buttons
    heartButtons.forEach(button => {
        button.addEventListener('click', () => toggleHeart(button));
    });

    // Attach event listeners to Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });
});

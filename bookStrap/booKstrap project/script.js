document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");

    // Generate unique IDs for books
    let books = JSON.parse(localStorage.getItem("books")) || new Array(40).fill().map((_, index) => ({
        id: Date.now() + index, // Truly unique identifier
        title: `Book Title ${index + 1}`,
        author: "Author Name",
        price: 0.00, // Numeric value instead of string
        img: "showcase/placeholder.svg", // Real image path
        liked: false
    }));

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];

    // Save books data to localStorage
    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Save cart items to localStorage
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Save favourite books to localStorage
    function saveFavourites() {
        localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
    }

    function loadBooks() {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("col-lg-4", "col-md-6", "col-sm-12");

            bookCard.innerHTML = `
                <div class="card shadow-sm border-light rounded">
                    <div class="position-relative">
                        <button class="btn btn-light position-absolute top-0 end-0 m-2 heart-btn" data-index="${index}">
                            <i class="bi ${book.liked ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
                        </button>
                        <img src="${book.img}" class="card-img-top" alt="${book.title}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">by ${book.author}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-success fs-5">ج.م ${book.price.toFixed(2)}</span>
                            <button class="btn btn-primary add-to-cart-btn" data-index="${index}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;

            bookList.appendChild(bookCard);
        });

        addHeartListeners();
        addCartListeners();
    }

    function addHeartListeners() {
        document.querySelectorAll('.heart-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute("data-index");
                const book = books[index];

                // Toggle liked status
                book.liked = !book.liked;

                // Update favouriteBooks array
                if (book.liked) {
                    favouriteBooks.push({
                        id: book.id,
                        title: book.title,
                        price: book.price,
                        image: book.img
                    });
                } else {
                    favouriteBooks = favouriteBooks.filter(favBook => favBook.id !== book.id);
                }

                // Save updated data to localStorage
                saveBooks();
                saveFavourites();
                loadBooks();
            });
        });
    }

    function addCartListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute("data-index");
                const book = books[index];
                
                // Create cart-compatible object
                const cartItem = {
                    id: book.id,
                    title: book.title,
                    price: book.price,
                    image: book.img // Match the cart's expected property name
                };

                const existingItem = cartItems.find(item => item.id === cartItem.id);
                if (!existingItem) {
                    cartItems.push(cartItem);
                    saveCart();
                    alert(`${cartItem.title} added to cart!`);
                } else {
                    alert(`${cartItem.title} already in cart!`);
                }
            });
        });
    }

    loadBooks();
});

document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");

    let books = JSON.parse(localStorage.getItem("books")) || new Array(40).fill().map((_, index) => ({
        id: index, // Unique identifier for each book
        title: "Book Title",
        author: "Author Name",
        price: "$XX",
        img: "showcase/placeholder.svg",
        liked: false
    }));

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Save books data to localStorage
    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Save cart items to localStorage
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Function to load books and render them
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
                            <span class="text-success fs-5">${book.price}</span>
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

    // Function to toggle like/unlike on heart button
    function addHeartListeners() {
        document.querySelectorAll('.heart-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute("data-index");
                books[index].liked = !books[index].liked;
                saveBooks();
                loadBooks();
            });
        });
    }

    // Function to add item to cart
    function addCartListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute("data-index");
                const book = books[index];

                // Check if the book is already in the cart
                const existingItem = cartItems.find(item => item.id === book.id);
                if (!existingItem) {
                    cartItems.push(book);  // Add to cart
                    saveCart();
                    alert(`${book.title} added to the cart!`);
                }
            });
        });
    }

    loadBooks();
});

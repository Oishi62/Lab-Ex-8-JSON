document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");

    // Load product data from products.json using AJAX
    fetch("products.json")
        .then((response) => response.json())
        .then((data) => {
            let products = data.products;
            displayProducts(products);

            // Event listeners for search and sort
            searchInput.addEventListener("input", () => {
                const keyword = searchInput.value.toLowerCase();
                const filteredProducts = products.filter((product) =>
                    product.name.toLowerCase().includes(keyword)
                );
                displayProducts(filteredProducts);
            });

            sortSelect.addEventListener("change", () => {
                const sortBy = sortSelect.value;
                if (sortBy === "name") {
                    products.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortBy === "price") {
                    products.sort((a, b) => a.price - b.price);
                }
                displayProducts(products);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));

    // Function to display products
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.style.width="300px";
            productImage.style.height="400px";

            const productName = document.createElement("h2");
            productName.textContent = product.name;

            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            const productPrice = document.createElement("p");
            productPrice.textContent = `Rs.${product.price.toFixed(2)}`;

            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);

            productList.appendChild(productCard);
        });
    }
});

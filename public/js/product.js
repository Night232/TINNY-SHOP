let currentIndex = 0; // Current index of displayed products

function showProducts(index) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.display = 'none'; // Hide all products
    });

    const startIndex = index * 3; // Display 3 products at a time
    const endIndex = startIndex + 3;

    for (let i = startIndex; i < endIndex; i++) {
        if (products[i]) {
            products[i].style.display = 'block'; // Display selected products
        }
    }
}

function prevProduct() {
    currentIndex = Math.max(currentIndex - 1, 0);
    showProducts(currentIndex);
}

function nextProduct() {
    const totalProducts = document.querySelectorAll('.product').length;
    currentIndex = Math.min(currentIndex + 1, Math.ceil(totalProducts / 3) - 1);
    showProducts(currentIndex);
}

// Initial display
showProducts(currentIndex);
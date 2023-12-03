const productsContainer = document.querySelector('.products-rows');
const productWidth = document.querySelector('.product').offsetWidth;
const totalProducts = document.querySelectorAll('.product').length;
let scrollPosition = 0;

document.querySelector('.next-product').addEventListener('click', () => {
    if (scrollPosition < productWidth * (totalProducts - 4)) {
        scrollPosition += productWidth;
        productsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    } else {
        // เมื่อถึงสินค้าท้าย กลับไปที่สินค้าแรก
        scrollPosition = 0;
        productsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});

document.querySelector('.prev-product').addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= productWidth;
        productsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    } else {
        // เมื่อถึงสินค้าแรก กลับไปที่สินค้าสุดท้าย
        scrollPosition = productWidth * (totalProducts - 4);
        productsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});

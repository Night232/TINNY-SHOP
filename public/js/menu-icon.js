const menuBtn = document.querySelector('.menu-icon');
const popUp = document.getElementById('popup');
let isPopupOpen = false;

menuBtn.addEventListener('click', () => {
    if (isPopupOpen) {
        popUp.style.display = 'none';
        isPopupOpen = false;
    } else {
        popUp.style.display = 'block';
        isPopupOpen = true;
    }
});
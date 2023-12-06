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

const user = getCookie('user')
const user_id = getCookie('user_id');
const username = getCookie('username');
const profilepic = getCookie('profilepic');
console.log('user', user);
console.log('User ID:', user_id);
console.log('Username:', username);
console.log('profilepic', profilepic)

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

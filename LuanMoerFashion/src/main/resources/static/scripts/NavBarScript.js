function updateNavbarStyles() {
    var navbarLinks = document.querySelectorAll('.NavBar a');
    var iconContainers = document.querySelectorAll('.NavBar .icon-container');
    var navbar = document.querySelector('.NavBar');
    var heroImage = document.querySelector('.collection-select');

    if (heroImage && scrollY === 0) {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolling');
        navbarLinks.forEach(function(link) {
            link.style.color = 'white';
        });
        iconContainers.forEach(function(container) {
            container.classList.add('inside-image');
        });
    } else if (scrollY > 0) {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolling');
        navbarLinks.forEach(function(link) {
            link.style.color = '#153448';
        });
        iconContainers.forEach(function(container) {
            container.classList.remove('inside-image');
        });
    } else if (!heroImage) {
        navbar.classList.remove('transparent');
        navbar.classList.remove('scrolling');
        navbarLinks.forEach(function(link) {
            link.style.color = '#153448';
        });
        iconContainers.forEach(function(container) {
            container.classList.remove('inside-image');
        });
    }
}
window.addEventListener('scroll', updateNavbarStyles);
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarStyles();
});

const totalPriceElement = document.querySelector('.right-side-text.bold');
    if (totalPriceElement) {

        const totalCartPrice = localStorage.getItem('totalCartPrice');
        if (totalCartPrice) {
            totalPriceElement.textContent = totalCartPrice + ',00 RSD';
        } else {
            totalPriceElement.textContent = '0,00 RSD';
        }
    }

function updateNavbarStyles() {
    var navbarLinks = document.querySelectorAll('.NavBar a');
    var iconContainers = document.querySelectorAll('.NavBar .icon-container');
    var imageContainer = document.querySelector('.collection-select');
    var imageTop = imageContainer.offsetTop;
    var imageBottom = imageTop + imageContainer.offsetHeight;
    var navbar = document.querySelector('.NavBar');
    var scrollY = window.scrollY;

    if (scrollY > 0) {
        iconContainers.forEach(function(container) {
            container.classList.remove('inside-image');
        });
        navbar.classList.add('scrolling');
        navbar.classList.remove('transparent');
        navbarLinks.forEach(function(link) {
            link.style.color = 'black'; 
        });
    } else {
        navbar.classList.remove('scrolling');
        navbar.classList.add('transparent');
        navbarLinks.forEach(function(link) {
            link.style.color = 'white'; 
        });
        iconContainers.forEach(function(container) {
            container.classList.add('inside-image');
        });
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    updateNavbarStyles();
});

window.addEventListener('scroll', updateNavbarStyles);
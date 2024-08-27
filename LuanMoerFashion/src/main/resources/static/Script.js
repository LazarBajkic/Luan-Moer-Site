const popup = document.getElementById("sizeChartPopup");
const btn = document.getElementById("sizeChartBtn");
const closeBtn = document.querySelector(".close-btn");

btn.onclick = function() {
    popup.style.display = "block";
    popup.style.transform = "translateX(0)";
}

closeBtn.onclick = function() {
    popup.style.transform = "translateX(100%)";
    setTimeout(function() {
        popup.style.display = "none";
    }, 300);
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.transform = "translateX(100%)";
        setTimeout(function() {
            popup.style.display = "none";
        }, 300);
    }
}

const heartContainer = document.querySelector('.heart-container');
const favoritesPopup = document.querySelector('.favorites-popup');

heartContainer.addEventListener('mouseenter', () => {
  favoritesPopup.style.display = 'block';
  setTimeout(() => {
    favoritesPopup.style.transform = 'translateX(-50%) translateY(0)';
    favoritesPopup.style.opacity = '1';
  }, 10);
});

heartContainer.addEventListener('mouseleave', () => {
  favoritesPopup.style.transform = 'translateX(-50%) translateY(-10px)';
  favoritesPopup.style.opacity = '0';
  setTimeout(() => {
    favoritesPopup.style.display = 'none';
  }, 300);
});

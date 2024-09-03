
const heartContainer = document.querySelector('.heart-container');
const favoritesPopup = document.querySelector('.favorites-popup');

heartContainer.addEventListener('mouseenter', () => {
  favoritesPopup.style.display = 'block';
  setTimeout(() => {
    favoritesPopup.style.transform = 'translateY(0)';
    favoritesPopup.style.opacity = '1';
  }, 10);
});

heartContainer.addEventListener('mouseleave', () => {
  favoritesPopup.style.transform = 'translateY(-10px)';
  favoritesPopup.style.opacity = '0';
  setTimeout(() => {
    favoritesPopup.style.display = 'none';
  }, 300);
});

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

document.addEventListener('DOMContentLoaded', function() {

    function resetBorders() {
        const selectedColorElemContainer = document.querySelector('.color-select'); 
        const selectedSizeElem = document.querySelector('select[name="productSize"]');
        
        if (selectedColorElemContainer) {
            selectedColorElemContainer.style.border = ''; 
        }
        if (selectedSizeElem) {
            selectedSizeElem.style.border = ''; 
        }
    }

    function validateInputs() {
        let isValid = true;

        const selectedColor = document.querySelector('input[name="colorSelection"]:checked');
        const selectedSize = document.querySelector('select[name="productSize"]').value;

        const colorElems = document.querySelectorAll('input[name="colorSelection"]');
        const selectedSizeElem = document.querySelector('select[name="productSize"]');

        resetBorders();

        if (!selectedColor) {
            colorElems.forEach(colorElem => {
                colorElem.style.border = '1px solid red';
            });
            isValid = false;
        }

        if (selectedSize === '') {
            selectedSizeElem.style.border = '1px solid red';
            isValid = false;
        }

        return isValid;
    }

    function updateHiddenFields() {
        const selectedColor = document.querySelector('input[name="colorSelection"]:checked')?.value || '';
        const selectedSize = document.querySelector('select[name="productSize"]').value;

        // Update hidden fields in the "AddToCart" form
        const cartForm = document.querySelector('form[action="/AddToCart"]');
        if (cartForm) {
            const colorInputInCart = cartForm.querySelector('input[name="productColor"]');
            const sizeInputInCart = cartForm.querySelector('input[name="productSize"]');
            if (colorInputInCart) colorInputInCart.value = selectedColor;
            if (sizeInputInCart) sizeInputInCart.value = selectedSize;
        }

        // Update hidden fields in the "AddToFavorites" form
        const favoritesForm = document.querySelector('form[action="/AddToFavorites"]');
        if (favoritesForm) {
            const colorInputInFavorites = favoritesForm.querySelector('input[name="productColor"]');
            const sizeInputInFavorites = favoritesForm.querySelector('input[name="productSize"]');
            if (colorInputInFavorites) colorInputInFavorites.value = selectedColor;
            if (sizeInputInFavorites) sizeInputInFavorites.value = selectedSize;
        }
    }

    document.getElementById('button-check').addEventListener('click', function(event) {
        event.preventDefault();
        
        if (validateInputs()) {
            updateHiddenFields();
            const cartForm = document.querySelector('form[action="/AddToCart"]');
            if (cartForm) {
                cartForm.submit(); 
            }
        }
    });

    document.getElementById('button-check-favorites').addEventListener('click', function(event) {
        event.preventDefault();
        
        if (validateInputs()) {
            updateHiddenFields();
            const favoritesForm = document.querySelector('form[action="/AddToFavorites"]');
            if (favoritesForm) {
                favoritesForm.submit(); 
            }
        }
    });

    resetBorders();
});
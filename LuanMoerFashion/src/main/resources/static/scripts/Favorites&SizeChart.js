document.addEventListener('DOMContentLoaded', function() {
	
          fetchFavoritesList();

       function fetchFavoritesList() {
    fetch('/getFavoritesList')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Favorites List:', data);

            const favoritesListElement = document.getElementById('favoritesList');
            const emptyMessageElement = document.getElementById('emptyFavoritesMessage');

            if (!favoritesListElement) {
                console.error('Favorites list element not found');
                return;
            }

            if (Array.isArray(data)) {
                if (data.length === 0) {

                    if (emptyMessageElement) {
                        emptyMessageElement.style.display = 'block';
                    }
                    favoritesListElement.style.display = 'none';
                } else {

                    if (emptyMessageElement) {
                        emptyMessageElement.style.display = 'none';
                    }
                    favoritesListElement.style.display = 'block';
                    updateFavoritesList(data); 
                }
            } else {
                console.error('Expected an array but received:', data);
            }
        })
        .catch((error) => {
            console.error('Error fetching favorites:', error);
        });
}
        function updateFavoritesList(favoritesList) {
            const favoritesListElement = document.getElementById('favoritesList');
            if (!favoritesListElement) {
                console.error('Favorites list element not found');
                return;
            }


            favoritesList.forEach(product => {

                const listItem = document.createElement('li');
                listItem.dataset.productId = product.productName; 
                listItem.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.productName}">
                    <div class="minifavorite-info">
                        <span class="minifave-product-name">${product.productName}</span>
                        <span>${product.productSize}</span>
                        <span>${product.productColor}</span>
                    </div>
                `;
                
                console.log('Appending item:', listItem);

                favoritesListElement.appendChild(listItem);
            });
        }


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

        const cartForm = document.querySelector('form[action="/CartPage"]');
        if (cartForm) {
            const colorInputInCart = cartForm.querySelector('input[name="productColor"]');
            const sizeInputInCart = cartForm.querySelector('input[name="productSize"]');
            if (colorInputInCart) colorInputInCart.value = selectedColor;
            if (sizeInputInCart) sizeInputInCart.value = selectedSize;
        }

        const favoritesForm = document.getElementById('favorites-form');
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
            const cartForm = document.querySelector('form[action="/CartPage"]');
            if (cartForm) {
                cartForm.submit(); 
            }
        }
    });

    document.getElementById('button-check-favorites').addEventListener('click', function(event) {
        event.preventDefault();
        
        if (validateInputs()) {
            updateHiddenFields();
            const favoritesForm = document.getElementById('favorites-form');
            if (favoritesForm) {
                favoritesForm.submit(); 
            }
        }
    });

    resetBorders();
})

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
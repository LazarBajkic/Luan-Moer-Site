document.addEventListener('DOMContentLoaded', function() {
    let totalCartPrice = 0;  // To store the total price of all items
    const cartWrapper = document.querySelector('.cart-wrapper');

    function updateTotalPrice() {
        totalCartPrice = 0; // Reset total price
        const cartItems = cartWrapper.querySelectorAll('.cart-content');
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-product-price').textContent;
            const inputField = item.querySelector('.quantity-input');
            const price = parseInt(priceText.split(',')[0].replace(/[^\d]/g, ''), 10);
            let quantity = parseInt(inputField.value, 10) || 1;
            const finalPriceNumber = price * quantity;
            totalCartPrice += finalPriceNumber;
        });

        console.log('Total Cart Price:', totalCartPrice);

        localStorage.setItem('totalCartPrice', totalCartPrice);
    }

    function sendCartItemsToBackend() {
        const cartItems = cartWrapper.querySelectorAll('.cart-content');
        const itemsData = Array.from(cartItems).map(item => {
        const itemInfo = item.querySelector('.cart-item-info');
        
        const productName = itemInfo?.querySelector('.cart-product-name')?.textContent || 'Unknown product';
        const productColor = itemInfo?.querySelector('.cart-product-span.cart-product-color')?.textContent.split(': ')[1] || 'Unknown color';
        const productSize = itemInfo?.querySelector('.cart-product-span.cart-product-size')?.textContent.split(': ')[1] || 'Unknown size';
        const price = parseInt(itemInfo?.querySelector('.cart-product-span.cart-product-price')?.textContent.split(',')[0].replace(/[^\d]/g, ''), 10) || 0;
        const quantity = parseInt(item.querySelector('.quantity-input')?.value, 10) || 1;

        console.log({ productName, productColor, productSize, price, quantity });

        return {
            productName,
            productColor,
            productSize,
           	price,
            quantity
        };
        });

        fetch('/submitCartItems', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemsData)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }

    if (cartWrapper) {
        updateTotalPrice();

        cartWrapper.addEventListener('click', function(event) {
            if (event.target.classList.contains('quantity-btn')) {
                const button = event.target;
                const quantityWrapper = button.closest('.quantity-wrapper');
                if (quantityWrapper) {
                    const productDetails = quantityWrapper.closest('.cart-content');
                    const inputField = quantityWrapper.querySelector('.quantity-input');
                    const currentProductFullPriceElement = productDetails.querySelector('.current-product-total');
                    const priceText = productDetails.querySelector('.cart-product-price').textContent;

                    if (inputField && currentProductFullPriceElement && priceText) {
                        const price = parseInt(priceText.split(',')[0].replace(/[^\d]/g, ''), 10);
                        let quantity = parseInt(inputField.value, 10) || 1;

                        if (button.classList.contains('plus')) {
                            quantity += 1;
                        } else if (button.classList.contains('minus') && quantity > 1) {
                            quantity -= 1;
                        }

                        inputField.value = quantity;
                        const finalPriceNumber = price * quantity;
                        currentProductFullPriceElement.textContent = finalPriceNumber + ",00 RSD";

                        updateTotalPrice();

                        sendCartItemsToBackend();
                    }
                }
            }
        });
    }
});

var counter=0;
const paymentMethod=document.getElementById('payment-method');
document.getElementById('continuePayment').addEventListener('click',function(){
	counter++;
	if(counter==1){
		document.getElementById('info-form').style.visibility='hidden';
		document.getElementById('shipping-info-div').style.visibility='visible';
	}
	console.log(counter);
	if(counter==2){
		paymentMethod.style.visibility='visible';
	}
	if(counter>=3){
		document.getElementById("overlay").style.display = "block";
		document.getElementById('success-popup-wrapper').style.visibility='visible';
	}
})

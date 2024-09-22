document.addEventListener('DOMContentLoaded', function() {
	

	 const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (savedUserInfo) {
        document.querySelector('.email-creds').value = savedUserInfo.email;
        document.querySelector('.name-creds').value = savedUserInfo.firstName;
        document.querySelector('.lName-creds').value = savedUserInfo.lastName;
        document.querySelector('.address-creds').value = savedUserInfo.address;
        document.querySelector('.flat-creds').value = savedUserInfo.apartment || '';
        document.querySelector('.pCode-creds').value = savedUserInfo.postalCode;
        document.querySelector('.city-creds').value = savedUserInfo.city;
        document.querySelector('.phone-input').value = savedUserInfo.phoneNum;

    }
	


	
    let totalCartPrice = 0;  
    const cartWrapper = document.querySelector('.cart-wrapper');
	
    function updateTotalPrice() {
        totalCartPrice = 0; 
        const cartItems = cartWrapper.querySelectorAll('.cart-content');
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-product-price').textContent;
            const inputField = item.querySelector('.quantity-input');
            const price = parseInt(priceText.split(',')[0].replace(/[^\d]/g, ''), 10);
            let quantity = parseInt(inputField.value, 10) || 1;
            const finalPriceNumber = price * quantity;
            totalCartPrice += finalPriceNumber;
        });

        localStorage.setItem('totalCartPrice', totalCartPrice);
    }

    function sendCartItemsToBackend() {
        const cartItems = cartWrapper.querySelectorAll('.cart-content');
        const itemsData = Array.from(cartItems).map(item => {
        const itemInfo = item.querySelector('.cart-item-info');
        
          const productImageUrl = item.querySelector('.item-image')?.src || 'default-image.jpg';
        const imageUrl = productImageUrl.split('/').pop();
        imageUrl = imageUrl.split('/').pop();

        const productName = itemInfo?.querySelector('.cart-product-name')?.textContent || 'Unknown product';
        const productColor = itemInfo?.querySelector('.cart-product-span.cart-product-color')?.textContent.split(': ')[1] || 'Unknown color';
        const productSize = itemInfo?.querySelector('.cart-product-span.cart-product-size')?.textContent.split(': ')[1] || 'Unknown size';
        const price = parseInt(itemInfo?.querySelector('.cart-product-span.cart-product-price')?.textContent.split(',')[0].replace(/[^\d]/g, ''), 10) || 0;
        const quantity = parseInt(item.querySelector('.quantity-input')?.value, 10) || 1;

        return {
			imageUrl,
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
        
        
                const proceedToPaymentButton = document.querySelector('.continue-shipping');
        if (proceedToPaymentButton) {
            proceedToPaymentButton.addEventListener('click', function() {
				
                sendCartItemsToBackend();
            });
        }

    }
});

var counter = 0;
const paymentMethod = document.getElementById('payment-method');

document.getElementById('continuePayment').addEventListener('click', function() {
    const email = document.querySelector('.email-creds').value;
    const firstName = document.querySelector('.firstName-creds').value;
    const lastName = document.querySelector('.lastName-creds').value;
    const address = document.querySelector('.address-creds').value;
    const apartment = document.querySelector('.flat-creds').value || null;
    const postalCode = document.querySelector('.postalCode-creds').value;
    const city = document.querySelector('.city-creds').value;
    const phoneNum = document.querySelector('.phoneNum-creds').value;
    const saveinfo = document.querySelector('.saveInfo').checked;

	const requiredFieldsCheckout = ['email', 'firstName', 'lastName', 'address', 'postalCode', 'city', 'phoneNum'];

	
	function validateUserInfo(userInfo) {
    let isValid = true;  
    
    for (let field of requiredFieldsCheckout) {
        const inputField = document.querySelector(`.${field}-creds`);
        
        if (!inputField) {
            console.error(`Field with class .${field}-creds not found`);
            continue; 
        }

        if (!userInfo[field] || userInfo[field].trim() === '') {

            inputField.style.border = '2px solid red';
            isValid = false;  
        } else {

            inputField.style.border = '';  
        }
    }
    
    return isValid;
}
	
    var userInfo = {
        email: email,
        country: 'Srbija',
        firstName: firstName,
        lastName: lastName,
        address: address,
        apartment: apartment,
        postalCode: postalCode,
        city: city,
        phoneNum: phoneNum
    };

    const shippingEmail = document.querySelector('.shipping-contact-email');
    const shippingAddress = document.querySelector('.shipping-contact-address');

    if (!validateUserInfo(userInfo)) {
        console.log('nope')
        return; 
    }

    if (validateUserInfo) {
        counter++;
    }
	
	if(counter==1){
		
		if (saveinfo) {
    		localStorage.setItem('userInfo', JSON.stringify(userInfo));

		} else {
    		localStorage.removeItem('userInfo');
		}
		

		
		console.log(userInfo);
		document.getElementById('info-form').style.visibility='hidden';
		document.getElementById('shipping-info-div').style.visibility='visible';
	
		shippingEmail.value=userInfo.email;
		shippingAddress.value=userInfo.address;
		
document.querySelectorAll('.change-button').forEach(button => {

    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        const parentDiv = this.parentElement;
        const inputField = parentDiv.querySelector('input');
        
        inputField.disabled = false;
        
        inputField.focus();
         inputField.addEventListener('blur', function() {
             inputField.disabled = true;
                    if (inputField.classList.contains('shipping-contact-email')) {
                        userInfo.email = inputField.value;
                    } else if (inputField.classList.contains('shipping-contact-address')) {
                        userInfo.address = inputField.value;
                    }
        });
   
    });
});
		
	}
	console.log(counter);
	if(counter==2){
		
		paymentMethod.style.visibility='visible';
	}
if (counter == 3) {
	
	userInfo.email = shippingEmail.value;
        userInfo.address = shippingAddress.value;

        console.log(userInfo);
	
    document.getElementById("overlay").style.display = "block";
    document.getElementById('success-popup-wrapper').style.visibility = 'visible';
 fetch('/submitUserInfo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error submitting user info');
    }
    return response.text().then(text => text ? JSON.parse(text) : {}); 
})
.then(data => {
    console.log('User info submitted successfully:', data);

    return fetch('/sendOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
})
.then(response => {
    if (response.ok) {
        console.log('Order email sent successfully');
    } else {
        console.error('Error sending order email:', response.statusText);
    }
})
.catch((error) => {
    console.error('Error occurred:', error);
});
}});

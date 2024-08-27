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
})
document.querySelectorAll('.faq-question').forEach(item => {
  item.addEventListener('click', () => {

    document.querySelectorAll('.faq-question .arrow').forEach(arrow => {
      if (arrow !== item.querySelector('.arrow')) {
        arrow.style.transform = 'rotate(0deg)';
      }
    });

    const arrow = item.querySelector('.arrow');
    const answer = item.nextElementSibling;

    document.querySelectorAll('.faq-answer').forEach(answer => {
      if (answer !== item.nextElementSibling) {
        answer.classList.remove('open');
      }
    });

    if (answer.classList.contains('open')) {
      answer.classList.remove('open');
      arrow.style.transform = 'rotate(0deg)';
    } else {
       answer.style.maxHeight = 25 + 'px';
      answer.classList.add('open');
      arrow.style.transform = 'rotate(180deg)';
    }
  
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const visibleBlock = urlParams.get('visibleBlock');
    const buttonId = urlParams.get('hideButton');
    const buttonIdShow = urlParams.get('buttonIdShow');
    const blockIdHide = urlParams.get('blockIdHide');
  
        if (visibleBlock) {
        showBlock(buttonId, visibleBlock, buttonIdShow, blockIdHide);
    } else {
        console.error('Missing URL parameters.');
    }


});

function showBlock(buttonId,blockId,buttonIdShow,blockIdHide) {

    document.getElementById(buttonId).style.visibility = 'hidden';
    const blockToHide = document.getElementById(blockIdHide);
    
    blockToHide.classList.remove('show');
    
    setTimeout(() => {
        blockToHide.style.display = 'none';
    }, 100);
    
    const blockToShow = document.getElementById(blockId);
    blockToShow.style.display = 'block';

    setTimeout(() => {
        blockToShow.classList.add('show');
    }, 10); 
    
    document.getElementById(buttonIdShow).style.visibility = 'visible';
}



document.getElementById('writeForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

	const requiredFields = ['firstName', 'lastName', 'email', 'message'];

function validateUserInfo(userInfo) {
    let isValid = true;

    requiredFields.forEach(field => {
        const inputField = document.getElementById(field);
        
        if (!userInfo[field] || userInfo[field] === '') {
            inputField.style.border = '2px solid red'; 
            isValid = false;
        } else {
            inputField.style.border = ''; 
        }
    });

    return isValid;
}

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    var userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message
    };

    if (!validateUserInfo(userInfo)) {
        console.log('Validation failed');
        return;
    }else{
	    document.querySelector('form').submit();	
	}

});

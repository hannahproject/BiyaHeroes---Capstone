const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    loginValidation();
});

function loginValidation() {

    const emailVal = email.value.trim();
    const passVal = password.value.trim();

    //email validation
    if(emailVal === '') {
        errorMsg(email, 'This field cannot be blank.');
    } else if(!isEmail(emailVal)) {
        errorMsg(email, 'Enter a valid email.');
    }else {
        successMsg(email);
    }

    //password validation
    if(passVal === '') {
        errorMsg(password, 'This field cannot be blank.');
    } else {
        successMsg(password);
    }
}

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('small');

    small.innerHTML = msg;

    formItem.className = 'form-item error';
}

function successMsg(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}

//validates if the input is a valid email
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
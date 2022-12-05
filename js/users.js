//LOGIN INPUTS
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

//SIGNUP INPUTS
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const birthday = document.getElementById('birthday');
const address = document.getElementById('address');
const phoneNum = document.getElementById('phone-num');
const confirmPass = document.getElementById('confirm-pass');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    Validation();
});

function Validation() {

    //login validation
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

    //sign-up validation
    const fnameVal = firstName.value.trim();
    const lnameVal = lastName.value.trim();
    const birthdayVal = birthday.value.trim();
    const addressVal = address.value.trim();
    const phoneNumVal =phoneNum.value.trim();
    const confirmPassVal =confirmPass.value.trim();

    if(fnameVal === ''){
        errorMsg(firstName, 'This field cannot be blank.');
    } else {
        successMsg(firstName);
    }

    if(lnameVal === ''){
        errorMsg(lastName, 'This field cannot be blank.');
    } else {
        successMsg(lastName);
    }

    if(birthdayVal === ''){
        errorMsg(birthday, 'This field cannot be blank.');
    } else {
        successMsg(birthday);
    }

    if(addressVal === ''){
        errorMsg(address, 'This field cannot be blank.');
    } else {
        successMsg(address);
    }

    if(phoneNumVal === ''){
        errorMsg(phoneNum, 'This field cannot be blank.');
    } else if(!isPhoneNum(phoneNumVal)) {
        errorMsg(phoneNum, 'Enter a valid phone number.');
    } else {
        successMsg(phoneNum);
    }

    if(confirmPassVal === ''){
        errorMsg(confirmPass, 'This field cannot be blank.');
    } else if(confirmPassVal !== passVal){
        errorMsg(confirmPass, 'Your passwords do not match.');
    } else {
        successMsg(confirmPass);
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

//validates if the input is a valid PH phone number
function isPhoneNum(phoneNum) {
    return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phoneNum);
}
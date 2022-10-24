const form = document.getElementById('form');
const bodyNum = document.getElementById('body-num');
const driverName = document.getElementById('driver-name');
const date = document.getElementById('date');

form.addEventListener('submit', e => {
    e.preventDefault();

    formValidation();
})

function formValidation() {
    const bodyNumVal = bodyNum.value.trim();
    const driverNameVal = driverName.value.trim();
    const dateVal = date.value.trim();

    if(bodyNumVal === '') {
        errorMsg(bodyNum, 'This field cannot be blank.');
    } else if(bodyNumVal.length !== 4) {
        errorMsg(bodyNum, 'Invalid number of Body Number');
    }
    else {
        successMsg(bodyNum);
    }

    if(driverNameVal === '') {
        errorMsg(driverName, 'This field cannot be blank.');
    } else {
        successMsg(driverName);
    }

    if(dateVal === '') {
        errorMsg(date, 'This field cannot be blank.');
    } else {
        successMsg(date);
    }
}

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('.form-text');

    small.innerHTML = msg;

    formItem.className = 'form-item error';
}

function successMsg(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}

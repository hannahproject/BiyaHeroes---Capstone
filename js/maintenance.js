const new_violation_btn = document.getElementById('add-violation');
const violation_popup = document.getElementById('violation-type-popup');

const new_item_btn = document.getElementById('add-item');
const item_popup = document.getElementById('item-type-popup');

const fare_btn = document.getElementById('update-fare');
const fare_popup = document.getElementById('fare-popup');

const popups = document.getElementsByClassName('popup-box');
const mask = document.getElementById('page-mask');

function ClosePopup() {
    mask.style.visibility = 'hidden';

    for(var popup of popups) {
      popup.style.display = 'none';
    }
}

function NewViolationType() {
    violation_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function NewItemType() {
    item_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function UpdateFare() {
    fare_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

new_violation_btn.addEventListener('click', NewViolationType);
new_item_btn.addEventListener('click', NewItemType);
fare_btn.addEventListener('click', UpdateFare);
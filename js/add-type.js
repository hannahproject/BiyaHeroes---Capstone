const popup_btn = document.getElementById('add-type-btn');
const add_type = document.getElementById('add-type');
const popups = document.getElementsByClassName('popup-box');
const mask = document.getElementById('page-mask');

function OpenPopup() {
    add_type.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function ClosePopup() {
    mask.style.visibility = 'hidden';

    for(var popup of popups) {
        popup.style.display = 'none';
    }
}

popup_btn.addEventListener('click', OpenPopup);
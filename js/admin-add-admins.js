const add_btn = document.getElementById('add-admin');
const add_admin_popup = document.getElementById('add-admin-popup');
const edit_admin_popup = document.getElementById('edit-admin-popup');
const admins = document.getElementsByClassName('grid-item');
const popups = document.getElementsByClassName('popup-box');
const edit_btns = document.getElementsByTagName('small');
const mask = document.getElementById('page-mask');

function NewAdmin() {
    add_admin_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function EditAdmin() {
    edit_admin_popup.style.display = 'block';
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

for(var admin of admins) {
    admin.addEventListener('click', EditAdmin)
}

for(var edit of edit_btns) {
  edit.addEventListener('click', EditAdmin)
}

add_btn.addEventListener('click', NewAdmin);
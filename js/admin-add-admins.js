const add_btn = document.getElementById('add-admin');
const add_admin_popup = document.getElementById('add-admin-popup');
const edit_admin_popup = document.getElementById('edit-admin-popup');
const admins = document.getElementsByClassName('grid-item');
const popups = document.getElementsByClassName('popup-box');
const edit_btns = document.getElementsByTagName('small');
const mask = document.getElementById('page-mask');

const btn = document.querySelectorAll('#btn');

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

    const inputs = document.getElementsByClassName('form-control');

    for(var input of inputs) {
      const err = input.classList.contains('error');
      const success = input.classList.contains('success');

      if(err === true) {
        input.classList.remove('error');
      }

      if(success === true) {
        input.classList.remove('success');
      }
    }
}

function FormValidation() {

  const new_firstname = document.getElementById('new-admin-firstname');
  const new_lastname = document.getElementById('new-admin-lastname');
  const new_position = document.getElementById('new-admin-position');
  const new_email = document.getElementById('new-admin-email');
  const new_password = document.getElementById('new-admin-password');

  const edit_firstname = document.getElementById('edit-admin-firstname');
  const edit_lastname = document.getElementById('edit-admin-lastname');
  const edit_position = document.getElementById('edit-admin-position');
  const edit_email = document.getElementById('edit-admin-email');
  const edit_password = document.getElementById('edit-admin-password');

  if(new_firstname.value === '') {
    Err(new_firstname);
  } else {
    Success(new_firstname);
  }

  if(new_lastname.value === '') {
    Err(new_lastname);
  } else {
    Success(new_lastname);
  }

  if(new_position.value === '') {
    Err(new_position);
  } else {
    Success(new_position);
  }

  if(new_email.value === '') {
    Err(new_email);
  } else {
    Success(new_email);
  }

  if(new_password.value === '') {
    Err(new_password);
  } else {
    Success(new_password);
  }

  if(edit_firstname.value === '') {
    Err(edit_firstname);
  } else {
    Success(edit_firstname);
  }

  if(edit_lastname.value === '') {
    Err(edit_lastname);
  } else {
    Success(edit_lastname);
  }

  if(edit_position.value === '') {
    Err(edit_position);
  } else {
    Success(edit_position);
  }

  if(edit_email.value === '') {
    Err(edit_email);
  } else {
    Success(edit_email);
  }

  if(edit_password.value === '') {
    Err(edit_password);
  } else {
    Success(edit_password);
  }
}

function Success(input) {
  input.className = 'form-control success';
}

function Err(input) {
  input.className = 'form-control error';  
}

for(var b of btn) {
  b.addEventListener('click', FormValidation);
}

for(var admin of admins) {
    admin.addEventListener('click', EditAdmin)
}

for(var edit of edit_btns) {
  edit.addEventListener('click', EditAdmin)
}

add_btn.addEventListener('click', NewAdmin);
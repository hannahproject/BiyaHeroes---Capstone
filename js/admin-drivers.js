const add_btn = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
const popups = document.getElementsByClassName('popup-box');
const add_popup = document.getElementById('add-popup');
const upload_popup = document.getElementById('upload-popup');
const edit_popup = document.getElementById('edit-popup');
const mask = document.getElementById('page-mask');

const btn = document.querySelectorAll('#btn');

  function AddToda() {
    add_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function UploadExcel() {
    upload_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function EditInfo() {
    edit_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function ClosePopup() {
    mask.style.visibility = 'hidden';

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

    for(var popup of popups) {
      popup.style.display = 'none';
    }
  }

  function FormValidation() {
    const edit_firstname = document.getElementById('edit-driver-firstname');
    const edit_lastname = document.getElementById('edit-driver-lastname');
    const edit_toda = document.getElementById('edit-driver-toda');
    const edit_bodynum = document.getElementById('edit-driver-bodynum');
    const edit_contact = document.getElementById('edit-driver-contact');
    const excel = document.getElementById('excel');
    const add_firstname = document.getElementById('add-driver-firstname');
    const add_lastname = document.getElementById('add-driver-lastname');
    const add_toda = document.getElementById('add-driver-toda');
    const add_bodynum = document.getElementById('add-driver-bodynum');
    const add_contact = document.getElementById('add-driver-contact');

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

    if(edit_toda.value === '') {
      Err(edit_toda);
    } else {
      Success(edit_toda);
    }

    if(edit_bodynum.value === '') {
      Err(edit_bodynum);
    } else {
      Success(edit_bodynum);
    }

    if(edit_contact.value === '') {
      Err(edit_contact);
    } else {
      Success(edit_contact);
    }

    if(excel.value === '') {
      Err(excel);
    } else {
      Success(excel);
    }

    if(add_firstname.value === '') {
      Err(add_firstname);
    } else {
      Success(add_firstname);
    }

    if(add_lastname.value === '') {
      Err(add_lastname);
    } else {
      Success(add_lastname);
    }

    if(add_bodynum.value === '') {
      Err(add_bodynum);
    } else {
      Success(add_bodynum);
    }

    if(add_toda.value === '') {
      Err(add_toda);
    } else {
      Success(add_toda);
    }

    if(add_contact.value === '') {
      Err(add_contact);
    } else {
      Success(add_contact);
    }
  }

  function Success(input) {
    input.className = 'form-control success';
  }
  
  function Err(input) {
    input.className = 'form-control error';  
  }

  add.addEventListener('click', AddToda);
  upload_btn.addEventListener('click', UploadExcel);

  for(var edit_btn of edit_btns) {
    edit_btn.addEventListener('click', EditInfo);
  }

  for(var b of btn) {
    b.addEventListener('click', FormValidation);
  }
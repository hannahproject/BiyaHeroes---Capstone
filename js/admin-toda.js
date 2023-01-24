const add_btn = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
const popups = document.getElementsByClassName('popup-box');
const add_popup = document.getElementById('add-popup');
const upload_popup = document.getElementById('upload-popup');
const edit_popup = document.getElementById('edit-popup');
const mask = document.getElementById('page-mask');

const btn = document.querySelectorAll('#btn');

function ClosePopup() {
    mask.style.visibility = 'hidden';

    for(var popup of popups) {
      popup.style.display = 'none';
    }
  }

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
    const new_toda = document.getElementById('new-toda');
    const new_toda_firstname = document.getElementById('new-toda-firstname');
    const new_toda_lastname = document.getElementById('new-toda-lastname');
    const new_toda_contact = document.getElementById('new-toda-contact');
    const excel = document.getElementById('excel');
    const edit_toda = document.getElementById('edit-toda');
    const edit_toda_firstname = document.getElementById('edit-toda-firstname');
    const edit_toda_lastname = document.getElementById('edit-toda-lastname');
    const edit_toda_contact = document.getElementById('edit-toda-contact');

    if(new_toda.value === '') {
      Err(new_toda);
    } else {
      Success(new_toda);
    }

    if(new_toda_firstname.value === '') {
      Err(new_toda_firstname);
    } else {
      Success(new_toda_firstname);
    }

    if(new_toda_lastname.value === '') {
      Err(new_toda_lastname);
    } else {
      Success(new_toda_lastname);
    }

    if(new_toda_contact.value === '') {
      Err(new_toda_contact);
    } else {
      Success(new_toda_contact);
    }

    if(edit_toda.value === '') {
      Err(edit_toda);
    } else {
      Success(edit_toda);
    }

    if(edit_toda_firstname.value === '') {
      Err(edit_toda_firstname);
    } else {
      Success(edit_toda_firstname);
    }

    if(edit_toda_lastname.value === '') {
      Err(edit_toda_lastname);
    } else {
      Success(edit_toda_lastname);
    }

    if(edit_toda_contact.value === '') {
      Err(edit_toda_contact);
    } else {
      Success(edit_toda_contact);
    }

    if(excel.value === '') {
      Err(excel);
    } else {
      Success(excel);
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

  for (var b of btn) {
    b.addEventListener('click', FormValidation);
  }
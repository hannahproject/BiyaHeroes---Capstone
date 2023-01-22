const add_btn = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
const popups = document.getElementsByClassName('popup-box');
const add_popup = document.getElementById('add-popup');
const upload_popup = document.getElementById('upload-popup');
const edit_popup = document.getElementById('edit-popup');
const mask = document.getElementById('page-mask');

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

    for(var popup of popups) {
      popup.style.display = 'none';
    }
  }

  add.addEventListener('click', AddToda);
  upload_btn.addEventListener('click', UploadExcel);

  for(var edit_btn of edit_btns) {
    edit_btn.addEventListener('click', EditInfo);
  }
const edit_personal = document.getElementById('edit-personal');
const edit_account = document.getElementById('edit-acc');
const edit_profile = document.getElementById('edit-profile');
const change_pass = document.getElementById('change-pass-btn');


const profile = document.getElementById('profile');
const save_profile = document.getElementById('save');
const cancel_profile = document.getElementById('cancel');

const popups = document.getElementsByClassName('popup-box');
const personal_popup = document.getElementById('personal-popup');
const account_popup = document.getElementById('account-popup');
const password_popup = document.getElementById('password-popup');
const mask = document.getElementById('page-mask');

const btn = document.querySelectorAll('#btn');

//FILEPOND SETUP
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );
  
  const pond = FilePond.create(profile);
  
  pond.setOptions({
    imageCropAspectRatio: '1:1',
    imageResizeTargetWidth: 180,
    imageResizeTargetHeight: 180,
    stylePanelLayout: 'compact circle',
    styleLoadIndicatorPosition: 'center',
    styleProgressIndicatorPosition: 'center',
    styleButtonRemoveItemPosition: 'center',
    styleButtonProcessItemPosition: 'center',
    allowBrowse: false,
    allowDrop: false,
    allowPaste: false,
    allowRemove: true
  });

  function EditProfile() {

    edit_profile.style.visibility = 'hidden';

    save_profile.style.visibility = 'visible';
    cancel_profile.style.visibility = 'visible';

    if(pond.allowBrowse == false && pond.allowDrop == false && pond.allowPaste == false) {
        pond.allowBrowse = true;
        pond.allowDrop = true;
        pond.allowPaste = true;
        pond.allowRemove = true;

      }

      const CancelProfile = () => {
        pond.removeFile();

        edit_profile.style.visibility = 'visible';
        save_profile.style.visibility = 'hidden';
        cancel_profile.style.visibility = 'hidden';
      };

      const SaveProfile = () => {
        pond.allowBrowse = false;
        pond.allowDrop = false;
        pond.allowPaste = false;
        pond.allowRemove = false;
        edit_profile.style.visibility = 'visible';
        save_profile.style.visibility = 'hidden';
        cancel_profile.style.visibility = 'hidden';
      }

      cancel_profile.addEventListener ('click', CancelProfile);
      save_profile.addEventListener('click', SaveProfile)
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

  function EditPersonal() {
    personal_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function EditAccount() {
    account_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function ChangePassword() {
    password_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function FormValidation() {

    const firstname = document.getElementById('edit-firstname');
    const lastname = document.getElementById('edit-lastname');
    const address = document.getElementById('edit-address');
    const birthday = document.getElementById('edit-birthday');
    const phone = document.getElementById('edit-phone');
    const email = document.getElementById('edit-email');
    const current_pass = document.getElementById('current-pass');
    const new_pass = document.getElementById('new-pass');
    const retype_pass = document.getElementById('retype-pass');

    if(firstname.value === '') {
      Err(firstname);
    } else {
      Success(firstname);
    }

    if(lastname.value === '') {
      Err(lastname);
    } else {
      Success(lastname);
    }

    if(address.value === '') {
      Err(address);
    } else {
      Success(address);
    }

    if(birthday.value === '') {
      Err(birthday);
    } else {
      Success(birthday);
    }

    if(phone.value === '') {
      Err(phone);
    } else {
      Success(phone);
    }

    if(email.value === '') {
      Err(email);
    } else {
      Success(email);
    }

    if(current_pass.value === '') {
      Err(current_pass);
    } else {
      Success(current_pass);
    }

    if(new_pass.value === '') {
      Err(new_pass);
    } else {
      Success(new_pass);
    }

    if(retype_pass.value === '') {
      Err(retype_pass);
    } else {
      Success(retype_pass);
    }
  }

  function Success(input) {
    input.className = 'form-control success';
  }

  function Err(input) {
    input.className = 'form-control error';  
  }

  edit_profile.addEventListener('click', EditProfile);
  edit_personal.addEventListener('click', EditPersonal);
  edit_account.addEventListener('click', EditAccount);
  change_pass.addEventListener('click', ChangePassword);

  for(var b of btn) {
    b.addEventListener('click', FormValidation);
  }

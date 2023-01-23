const evidence_btn = document.getElementById('evidence-btn');

const popups = document.getElementsByClassName('popup-box');
const evidence_popup = document.getElementById('evidence-popup');
const mask = document.getElementById('page-mask');

function ClosePopup() {
    mask.style.visibility = 'hidden';

    for(var popup of popups) {
      popup.style.display = 'none';
    }
}

function ViewEvidence() {
    evidence_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

evidence_btn.addEventListener('click', ViewEvidence);

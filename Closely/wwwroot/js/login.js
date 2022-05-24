const regbtn = document.querySelector('#regBtn');
const reglogin = document.querySelector('#reglogin');
const regemail = document.querySelector('#regemail');
const regpass = document.querySelector('#regpass');
const regconfpass = document.querySelector('#regconfpass');

reglogin.addEventListener('input', checkDate);
regemail.addEventListener('input', checkDate);
regpass.addEventListener('input', checkDate);
regconfpass.addEventListener('input', checkDate);

regbtn.hidden = true;

function checkDate() {
    if (reglogin.value != '' && regemail.value != '' && regpass.value != '' && regconfpass.value != '') {
        if (regpass.value == regconfpass.value) {
            regbtn.hidden = false;
        }
    }
    else {
        regbtn.hidden = true;
    }
}
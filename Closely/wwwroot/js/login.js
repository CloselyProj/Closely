const regbtn = document.getElementById('regBtn');
const reglogin = document.getElementById('reglogin');
const regemail = document.getElementById('regemail');
const regpass = document.getElementById('regpass');
const regconfpass = document.getElementById('regconfpass');
const logbtn = document.getElementById('logBtn');
const loglogin = document.getElementById('loglogin');
const logpass = document.getElementById('logpass');
const redColor = "#e70404";
const greenColor = "#1cc722";
reglogin.addEventListener('input', checkDateReg);
regemail.addEventListener('input', checkDateReg);
regpass.addEventListener('input', checkDateReg);
regconfpass.addEventListener('input', checkDateReg);

regbtn.style.color = greenColor;

loglogin.addEventListener('input', checkDateLog);
logpass.addEventListener('input', checkDateLog);


function checkDateReg() {
        if (reglogin.value.length >= 4) {
            reglogin.style.color = greenColor;
        }
        else {
            regbtn.style.visibility = 'hidden';
            reglogin.style.color = redColor;
        }

        if (regpass.value == regconfpass.value && regpass.value.length >= 6) {
            regpass.style.color = greenColor;
            regconfpass.style.color = greenColor;
        }
        else {
            regbtn.style.visibility = 'hidden';
            regpass.style.color = redColor;
            regconfpass.style.color = redColor;
        }
        if (regemail.value.length >= 6) {
            regemail.style.color = greenColor;
        }
        else {
            regbtn.style.visibility = 'hidden';
            regemail.style.color = redColor;
        }
    if (reglogin.style.color == regbtn.style.color && regpass.style.color == regbtn.style.color && regemail.style.color == regbtn.style.color) {
        alert(regbtn.style.color);
        regbtn.style.visibility = 'visible';
    }
}

function checkDateLog() {
    if (loglogin.value != '' && logpass.value != '') {
        if (loglogin.value.length >= 4 && logpass.value.length >= 6) {
            logbtn.style.visibility = 'visible';
        }
        else {
            logbtn.style.visibility = 'hidden';
        }
    }
    else {
        logbtn.style.visibility = 'hidden';
    }
}
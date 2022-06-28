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
logbtn.style.color = greenColor;
loglogin.addEventListener('input', checkDateLog);
logpass.addEventListener('input', checkDateLog);


function checkDateReg() {
    if (reglogin.value.length >= 4) {
        reglogin.style.color = greenColor;
    }
    else {
        reglogin.style.color = redColor;
    }

    if (regpass.value == regconfpass.value && regpass.value.length >= 6) {
        regpass.style.color = greenColor;
        regconfpass.style.color = greenColor;
    }
    else {
        regpass.style.color = redColor;
        regconfpass.style.color = redColor;
    }
    if (regemail.value.length >= 6) {
        regemail.style.color = greenColor;
    }
    else {
        regemail.style.color = redColor;
    }
    if (reglogin.style.color == regbtn.style.color && regpass.style.color == regbtn.style.color && regemail.style.color == regbtn.style.color) {
        regbtn.style.visibility = 'visible';
    }
    else {
        regbtn.style.visibility = 'hidden';
    }
}

function checkDateLog() {
    if (loglogin.value.length >= 4) {
        loglogin.style.color = greenColor;
    }
    else {
        loglogin.style.color = redColor;
    }
    if (logpass.value.length >= 6) {
        logpass.style.color = greenColor;
    }
    else {
        logpass.style.color = redColor;
    }
    if (loglogin.style.color == logbtn.style.color && logpass.style.color == logbtn.style.color) {
        logbtn.style.visibility = 'visible';
    }
    else {
        logbtn.style.visibility = 'hidden';
    }
}
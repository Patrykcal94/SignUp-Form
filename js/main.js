const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send');
const popup = document.querySelector('.popup');



const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, el.placeholder);
        }
        if (el.value !== '') {
            clearError(el);
        }
    })
};

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
};

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
};

const checkLenght = (input, min) => {
    if (input.value.lenght < min) {
        showError(input, `${input.previousElementSibling.textContent.slice(0,-1)} składa się z minimum ${min} znaków.`)
    }
};

const checkPass = (pass, pass2) => {
    if (pass.value !== pass2.value) {
        showError(pass2, `Hasła się nie zgadzają.`);
    }
};


const checkMail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, `wprowadź prawidłowy adres mailowy.`)
    }
};

const checkError = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCount++;
        }
    })
    if (errorCount === 0) {
        popup.classList.add('show-popup');
    }

};


sendBtn.addEventListener('click', e => {
    e.preventDefault()

    checkForm([username, pass, pass2, email]);
    checkLenght(username, 6);
    checkLenght(pass, 8);
    checkPass(pass, pass2);
    checkMail(email);
    checkError();
});

clearBtn.addEventListener('click', e => {
    e.preventDefault();

    [username, pass, pass2, email].forEach(el => {
        el.value = ''
        clearError(el)
    })
});



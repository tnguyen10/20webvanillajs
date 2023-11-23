const USERNAME = 'username'
const USERNAME_MIN = 3
const USERNAME_MAX = 15
const EMAIL = 'email'
const PASSWORD = 'password'
const PASSWORD_MIN = 6
const PASSWORD_MAX = 25
const PASSWORD2 = 'password2'
const ERROR_CLASS = 'error'
const SUCCESS_CLASS = 'success'

const form = document.querySelector('form')

const getTextLengthError = (field, value, min, max) => {
    if (!value || value.length < min) {
        return `${field} must be at least ${String(min)} characters`
    } else if (value.length > max) {
        return `${field} must be less than ${String(max)} characters`
    } else {
        return ''
    }
}

const getEmailError = (value) => {
    if (value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        return ''
    } else {
        return `${EMAIL} is not valid`
    }
}

const getPasswordMatchError = (password1, password2) => {
    if (!password2) {
        return `${PASSWORD} is required`
    }
    else if (password1 !== password2) {
        return `passwords do not match`
    } else {
        return ''
    }
}

const renderError = (field, error) => {
    const inputElement = document.getElementById(field)
    const errorElement = document.getElementById(`${field}-${ERROR_CLASS}`)
    if (error && inputElement) {
        inputElement.classList.add(ERROR_CLASS)
    }
    if (error && errorElement) {
        errorElement.classList.add(ERROR_CLASS)
        errorElement.innerText = error
    }
    if (!error) {
        inputElement.classList.add(SUCCESS_CLASS)
        inputElement.classList.remove(ERROR_CLASS)
        errorElement.classList.remove(ERROR_CLASS)
        errorElement.innerText = ''
    }
}

const validate = (data) => {
    renderError(USERNAME, getTextLengthError(USERNAME, data.get(USERNAME), USERNAME_MIN, USERNAME_MAX))
    renderError(EMAIL, getEmailError(data.get(EMAIL)))
    renderError(PASSWORD, getTextLengthError(PASSWORD, data.get(PASSWORD), PASSWORD_MIN, PASSWORD_MAX))
    renderError(PASSWORD2, getPasswordMatchError(data.get(PASSWORD), data.get(PASSWORD2)))
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    validate(data)
})
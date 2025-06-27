/* 1. Select all necessary DOM elements (form, inputs, error message spans) */
const registrationForm = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const usernameErrorMessage = document.getElementById('usernameError');
const emailErrorMessage = document.getElementById('emailError');
const passwordErrorMessage = document.getElementById('passwordError');
const confirmPasswordErrorMessage = document.getElementById('confirmPasswordError');

/* 2. Load saved username from localStorage on page load */
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
});

/* 3. Real-time validation: Add input event listeners to each field */
usernameInput.addEventListener('input', validUserbaneField);
emailInput.addEventListener('input', validEmailField);
passwordInput.addEventListener('input', () => {
    validatePasswordField();
    validateConfirmPasswordField(); // Also check confirm password if password changes
});
confirmPasswordInput.addEventListener('input', validateConfirmPasswordField);

/* 4. Validation functions using Constraint Validation API and custom logic */
function validateUsernameField() {
    if (usernameInput.validity.valueMissing) {
        usernameErrorMessage.textContent = 'Username is required';
        return false;
    }
    usernameErrorMessage.textContent = '';
    return true;
}

function validateEmailField() {
    if (emailInput.validity.valueMissing) {
        emailErrorMessage.textContent = 'Email is required.';
        return false;
    }
    if (emailInput.validity.typeMismatch) {
        emailErrorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }
    emailErrorMessage.textContent = '';
    return true;
}

function validatePasswordField() {
    const passwordValue = passwordInput.value;
    if (passwordInput.validity.valueMissing) {
        passwordErrorMessage.textContent = 'Password is required.';
        return false;
    }
    if (passwordValue.length < 8) {
        passwordErrorMessage.textContent = 'Password must be at least 8 characters long.';
        return false;
    }
    if (!/[A-Z]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include an uppercase letter';
        return false;
    }
    if (!/[a-z]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include a lowercase letter.';
        return false;
    }
    if (!/[0-9]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include a number';
        return false;
    }
    passwordErrorMessage.textContent = '';
    return true;
}

function validateConfirmPasswordField() {
    if (confirmPasswordInput.validity.valueMissing) {
        confirmPasswordErrorMessage.textContent = 'Please confirm your password.';
        return false;
    }
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordErrorMessage.textContent = 'Passwords do not match.';
        return false;
    }
    confirmPasswordErrorMessage.textContent = '';
    return true;
}

/* 5. Form submission: prevent default, validate, show messages, save username, reset if valid */
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const isUsernameValid = validateUsernameField();
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();
    const isConfirmPasswordValid = validateConfirmPasswordField();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        localStorage.setItem('savedUsername', usernameInput.value);
        alert('Registration successful!');
        registrationForm.reset();
        usernameErrorMessage.textContent = '';
        emailErrorMessage.textContent = '';
        passwordErrorMessage.textContent = '';
        confirmPasswordErrorMessage.textContent = '';
    } else {
        if (!isUsernameValid) {
            usernameInput.focus();
        } else if (!isEmailValid) {
            emailInput.focus();
        } else if (!isPasswordValid) {
            emailInput.focus();
        } else if (!isConfirmPasswordValid) {
            confirmPasswordInput.focus();
        }
    }
});
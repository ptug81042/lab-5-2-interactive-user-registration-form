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
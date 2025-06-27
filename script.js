/* 
    Interactive User Registration Form Script

    This script implements:
    - DOM element selection for form fields and error messages
    - Loading a saved username from localStorage on page load
    - Real-time validation for each input field using the Constraint Validation API and custom logic
    - Custom error messages for each input field
    - Confirm password matching logic
    - Form submission handling with final validation, success message, username persistence, and form reset
    - Username uniqueness check (in-memory for demo purposes)
*/

/* 1. Select all necessary DOM elements (form, inputs, error message spans) */
const registrationForm = document.getElementById('registrationForm'); // The registration form element
const usernameInput = document.getElementById('username'); // Username input element
const emailInput = document.getElementById('email'); // Email input element
const passwordInput = document.getElementById('password'); // Password input element
const confirmPasswordInput = document.getElementById('confirmPassword'); // Confirm password input field

const usernameErrorMessage = document.getElementById('usernameError'); // Username error message
const emailErrorMessage = document.getElementById('emailError'); // Email error message
const passwordErrorMessage = document.getElementById('passwordError'); // Password error message
const confirmPasswordErrorMessage = document.getElementById('confirmPasswordError'); // Confirm password error message

// Demo: In-memory array to simulate existing usernames for uniqueness check
let registeredUsernames = JSON.parse(localStorage.getItem('registeredUsernames')) || [];

/* 2. Load saved username from localStorage on page load */
window.addEventListener('DOMContentLoaded', () => {
    // Check if a username is saved in localStorage and pre-fill the username field if so
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
});

/* 3. Real-time validation: Add input event listeners to each field */
// Validate username on input
usernameInput.addEventListener('input', validateUsernameField);
// Validate email on input
emailInput.addEventListener('input', validateEmailField);
// Validate password and confirm password on password input
passwordInput.addEventListener('input', () => {
    validatePasswordField();
    validateConfirmPasswordField(); // Also check confirm password if password changes
});
// Validate confirm password on input
confirmPasswordInput.addEventListener('input', validateConfirmPasswordField);

/* 4. Validation functions using Constraint Validation API and custom logic */

// Validate the username field for required input and uniqueness
function validateUsernameField() {
    const usernameValue = usernameInput.value.trim();
    if (usernameInput.validity.valueMissing) {
        usernameErrorMessage.textContent = 'Username is required';
        return false;
    }
    if (registeredUsernames.includes(usernameValue)) {
        usernameErrorMessage.textContent = 'This username is already taken. Please choose another.';
        return false;
    }
    usernameErrorMessage.textContent = '';
    return true;
}

// Validate the email field for required input and correct email format
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

// Validate the password field for required input and password strength
function validatePasswordField() {
    const passwordValue = passwordInput.value;
    if (passwordInput.validity.valueMissing) {
        passwordErrorMessage.textContent = 'Password is required.';
        return false;
    }
    if (passwordValue.length < 10) {
        passwordErrorMessage.textContent = 'Password must be at least 10 characters long.';
        return false;
    }
    if (!/[A-Z]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include at least one uppercase letter.';
        return false;
    }
    if (!/[a-z]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include at least one lowercase letter.';
        return false;
    }
    if (!/[0-9]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include at least one number.';
        return false;
    }
    if (!/[^A-Za-z0-9]/.test(passwordValue)) {
        passwordErrorMessage.textContent = 'Password must include at least one special character.';
        return false;
    }
    passwordErrorMessage.textContent = '';
    return true;
}

// Validate the confirm password input field for required and matching password input field
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
    event.preventDefault(); // Prevent default form submission
    
    // Perform validation checks for all input fields
    const isUsernameValid = validateUsernameField();
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();
    const isConfirmPasswordValid = validateConfirmPasswordField();

    // If all input fields are valid, show success, save username, and reset form
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Save the username to localStorage for future visits
        localStorage.setItem('savedUsername', usernameInput.value.trim());
        // Add the new username to the registeredUsernames array and persist it
        registeredUsernames.push(usernameInput.value.trim());
        localStorage.setItem('registeredUsernames', JSON.stringify(registeredUsernames));
        // Display a success message (could be replaced with a status message on the page)
        alert('Registration successful!');
        // Optionally reset the form
        registrationForm.reset();
        // Clear all error messages
        usernameErrorMessage.textContent = '';
        emailErrorMessage.textContent = '';
        passwordErrorMessage.textContent = '';
        confirmPasswordErrorMessage.textContent = '';
    } else {
        // If any input field is invalid, focus on the first invalid input field
        if (!isUsernameValid) {
            usernameInput.focus();
        } else if (!isEmailValid) {
            emailInput.focus();
        } else if (!isPasswordValid) {
            passwordInput.focus();
        } else if (!isConfirmPasswordValid) {
            confirmPasswordInput.focus();
        }
    }
});
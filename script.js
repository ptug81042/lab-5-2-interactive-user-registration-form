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
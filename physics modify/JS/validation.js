/**
 * validation.js
 * Purpose: Form validation library for visitor registration form
 * Author: Sam Raja
 * Date: April 18, 2025
 */

// State abbreviations for validation
const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

// Regular expressions for validation
const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/; // e.g., (123) 456-7890
const zipRegex = /^\d{5}(-\d{4})?$/; // e.g., 12345 or 12345-6789
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

// Initialize validation for the form
function initValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    // Set novalidate to prevent default HTML5 validation
    form.setAttribute('novalidate', true);

    // On submit event
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (validateForm(form)) {
            // Hide form and show thank you message with delay for redirection
            form.style.display = 'none';
            alert('Thank You for Submitting!');
            setTimeout(() => {
                showSection('home');
            }, 1000); // Delay redirection by 1 second to ensure alert is seen
        }
    });

    // On change event for inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            validateField(input);
        });
    });
}

// Validate the entire form
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Special validation for checkbox group
    const checkboxes = form.querySelectorAll('input[type="checkbox"][name="referral"]');
    if (!checkRequired(checkboxes, 'Please select at least one referral source')) {
        isValid = false;
    }

    return isValid;
}

// Validate a single field
function validateField(field) {
    if (field.type === 'checkbox') return true; // Handled separately
    if (field.hasAttribute('required') && !checkRequired(field, `${field.name} is required`)) {
        return false;
    }
    if (field.id === 'state' && !validateState(field.id, 'Please enter a valid state abbreviation')) {
        return false;
    }
    if (field.id === 'zip' && !checkFormat(field.id, 'Invalid ZIP code format', zipRegex)) {
        return false;
    }
    if (field.id === 'phone' && !checkFormat(field.id, 'Invalid phone number format (e.g., (123) 456-7890)', phoneRegex)) {
        return false;
    }
    if (field.id === 'email' && !checkFormat(field.id, 'Invalid email format', emailRegex)) {
        return false;
    }
    return true;
}

// Checking if a field or checkbox group has a value
function checkRequired(field, requiredMessage) {
    let isValid;
    if (field instanceof NodeList) {
        isValid = Array.from(field).some(cb => cb.checked);
    } else {
        isValid = field.value.trim() !== '';
    }
    setElementValidity(field, isValid, isValid ? '' : requiredMessage);
    return isValid;
}

// Checking field format against a regex
function checkFormat(fieldId, badFormatMessage, regex) {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) return true; // Skip if empty (handled by checkRequired)
    const isValid = regex.test(field.value.trim());
    setElementValidity(field, isValid, isValid ? '' : badFormatMessage);
    return isValid;
}

// Validate state abbreviation
function validateState(fieldId, invalidMessage) {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) return true; // Skip if empty (handled by checkRequired)
    const isValid = stateAbbreviations.includes(field.value.trim().toUpperCase());
    setElementValidity(field, isValid, isValid ? '' : invalidMessage);
    return isValid;
}

// Set custom validity and update UI
function setElementValidity(element, valid, message) {
    if (element instanceof NodeList) {
        element = element[0]; // Use first checkbox for error display
    }
    element.classList.add('was-validated');
    element.setCustomValidity(valid ? '' : message);
    
    const errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('errorMsg')) {
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
    }
}
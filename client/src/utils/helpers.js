export function validateEmail(email) {
    // Regex is checking for an email input format of (letters/numbers, . - _) @ (digits/letters, . -) . (letters/ .)=between 2-3 characters
    var match = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return match.test(String(email).toLowerCase());
}

export function validatePassword(input) {
    // Regex is checking for a minimum of 8 characters which must include at least one capital letter, lowercase letter, and number
    var password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (input.match(password)) {
        return true;
    }
    return false;
}
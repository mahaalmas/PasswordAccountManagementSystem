function generateRandomPassword(length, uppercase, lowercase, numbers, specialCharsEnabled) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~';
    let allChars = '';

    if (uppercase) allChars += uppercaseChars;
    if (lowercase) allChars += lowercaseChars;
    if (numbers) allChars += numberChars;
    if (specialCharsEnabled) allChars += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }

    return password;
}

// ... (previous code)



function savePassword() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check password strength
    const strength = checkPasswordStrength(password);
    updatePasswordStrengthMeter(strength);

    // Hash the password before storing
    const hashedPassword = hashPassword(password);

    // Store hashed password in local storage
    const accountData = { username, password: hashedPassword };
    localStorage.setItem(username, JSON.stringify(accountData));

    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Update the password list
    updatePasswordList();
}

function checkPasswordStrength(password) {
    // Implement a password strength check
    const length = password.length;
    if (length < 8) {
        return 'Weak';
    } else if (length < 12) {
        return 'Medium';
    } else {
        return 'Strong';
    }
}

function updatePasswordStrengthMeter(strength) {
    const meter = document.getElementById('passwordStrength');
    switch (strength) {
        case 'Weak':
            meter.value = 33;
            break;
        case 'Medium':
            meter.value = 66;
            break;
        case 'Strong':
            meter.value = 100;
            break;
        default:
            meter.value = 0;
            break;
    }
}

function hashPassword(password) {
    // Implement a secure password using hash function.
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return hash.toString();
}

function updatePasswordList() {
    const passwordListContainer = document.getElementById('passwordList');
    passwordListContainer.innerHTML = '<h2>Passwords</h2>';

    // Iterate through local storage and display stored passwords
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const accountData = JSON.parse(localStorage.getItem(key));
        passwordListContainer.innerHTML += `<p><strong>${key}:</strong> ${accountData.password}</p>`;
    }
}

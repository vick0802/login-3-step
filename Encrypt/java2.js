const messageInput = document.getElementById('message');
const emailInput = document.getElementById('email');
const sendMessageButton = document.getElementById('sendMessage');
const loadingIndicator = document.getElementById('loading');
const statusMessage = document.getElementById('statusMessage');

// Convert a character to binary
function charToBinary(char) {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
}

// Convert entire message to binary and add null terminator
function messageToBinary(message) {
    return Array.from(message)
        .map(charToBinary)
        .join('') + '00000000';
}

// Simulate encoding binary data into timing symbols
function encodeTimingChannel(binaryData) {
    return binaryData.replace(/1/g, 'H').replace(/0/g, 'L');
}

// Encrypt the message using LSB and Timing Channel
function encryptMessage(message) {
    const binaryData = messageToBinary(message); // Convert message to binary
    return encodeTimingChannel(binaryData); // Encode binary into timing symbols
}

// Send the encrypted message via EmailJS
function sendEncryptedEmail(email, encryptedMessage) {
    const serviceID = "service_5pqfkil"; 
    const templateID = "template_yb7tsg7"; 
    const templateParams = {
        to_email: email,
        encrypted_message: encryptedMessage,
    };

    return emailjs.send(serviceID, templateID, templateParams);
}

// Event listener for send button
sendMessageButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!email || !message) {
        statusMessage.textContent = 'Please fill in both fields.';
        statusMessage.style.color = 'red';
        return;
    }

    // Encrypt the message
    const encryptedMessage = encryptMessage(message);

    // Show loading spinner
    loadingIndicator.style.display = 'block';
    statusMessage.textContent = '';

    try {
        // Send the encrypted email
        await sendEncryptedEmail(email, encryptedMessage);

        // Hide loading spinner
        loadingIndicator.style.display = 'none';

        // Notify user of success
        alert(`Encrypted message sent to ${email}!`);

        // Clear inputs
        emailInput.value = '';
        messageInput.value = '';
    } catch (error) {
        console.error('Failed to send email:', error);

        // Hide loading spinner
        loadingIndicator.style.display = 'none';

        // Notify user of failure
        statusMessage.textContent = 'Failed to send the message. Try again.';
        statusMessage.style.color = 'red';
    }
});

// Callback function to handle the credential response
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Simulate verifying the token (you should verify it on your server)
    const token = response.credential; // Normally sent to the backend for verification

    // If verification is successful, show success screen
    showSuccessScreen();
}

// Function to display the success screen
function showSuccessScreen() {
    // Hide the sign-in container
    document.getElementById("signin-container").classList.add("hidden");

    // Show the success container
    document.getElementById("success-container").classList.remove("hidden");
}

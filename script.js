// Wait for the window to load before initializing
window.onload = function() {
  // Initialize the Google Identity Services with your Client ID and callback function
  google.accounts.id.initialize({
    client_id: "654356654645-gb2381hmg5c7l0c5jvsk8bvhtouiad08.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  // Attach event listener to the custom Google sign-in button
  var customBtn = document.getElementById("custom-google-btn");
  customBtn.addEventListener("click", function() {
    // Show loading indicator when the prompt starts
    document.getElementById("loading-indicator").classList.remove("hidden");

    // Launch the Google sign-in prompt
    google.accounts.id.prompt(function(notification) {
      // Hide the loading indicator after prompt finishes
      document.getElementById("loading-indicator").classList.add("hidden");

      // If the prompt isn't displayed or is skipped, then show an error message
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        document.getElementById("error-message").classList.remove("hidden");
      } else {
        document.getElementById("error-message").classList.add("hidden");
      }
    });
  });
};

// Callback function that is triggered after a successful sign-in
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  
  // Optionally, send the token to your backend server for further verification.
  // After processing, show the success screen:
  showSuccessScreen();
}

// Switches the UI from the sign-in container to the success container
function showSuccessScreen() {
  document.getElementById("signin-container").classList.add("hidden");
  document.getElementById("success-container").classList.remove("hidden");
}

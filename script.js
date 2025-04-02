// Wait until the window (DOM and all assets) loads
window.addEventListener('load', function() {
  console.log("Window loaded. Checking for Google Identity Services...");
  
  // Check if the Google Identity Services library is available
  if (window.google && google.accounts && google.accounts.id) {
    console.log("Google Identity Services loaded successfully.");
    
    // Initialize the Google Identity Services with your client ID and callback
    google.accounts.id.initialize({
      client_id: "654356654645-gb2381hmg5c7l0c5jvsk8bvhtouiad08.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      ux_mode: "popup"
    });
    console.log("Google Identity Services initialized with popup mode.");
    
    // Find the custom button and attach a click event listener
    const customBtn = document.getElementById("custom-google-btn");
    if (customBtn) {
      console.log("Custom Google sign-in button found.");
      customBtn.addEventListener("click", function() {
        console.log("Custom Google button clicked; launching prompt.");
        // Launch the Google sign-in prompt and log the notification object details
        google.accounts.id.prompt((notification) => {
          console.log("Google prompt callback fired.");
          console.log("Notification object:", notification);
          console.log("isDisplayed: " + notification.isDisplayed());
          console.log("isSkippedMoment: " + notification.isSkippedMoment());
          console.log("isDismissedMoment: " + notification.isDismissedMoment());
        });
      });
    } else {
      console.error("Custom Google sign-in button NOT found.");
    }
  } else {
    console.error("Google Identity Services library did not load correctly.");
  }
});

// Callback function invoked after a successful sign-in
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // (Optional) Send response.credential to your backend for verification here.
  showSuccessScreen();
}

// Function to switch from the sign-in screen to the success screen
function showSuccessScreen() {
  console.log("Switching to success screen...");
  document.getElementById("signin-container").classList.add("hidden");
  document.getElementById("success-container").classList.remove("hidden");
}

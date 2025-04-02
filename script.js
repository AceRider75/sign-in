// Listen for the window load event to ensure the DOM and GIS library are ready
window.addEventListener("load", function () {
  console.log("Window loaded. Verifying Google Identity Services library...");

  // Check if the Google Identity Services library has loaded correctly
  if (window.google && google.accounts && google.accounts.id) {
    console.log("Google Identity Services library loaded successfully.");

    // Initialize the Google Identity Services with your client ID, callback, and popup settings.
    google.accounts.id.initialize({
      client_id: "654356654645-gb2381hmg5c7l0c5jvsk8bvhtouiad08.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      ux_mode: "popup",      // Explicitly use popup mode
      auto_select: false,    // Require explicit user interaction
      prompt: "select_account" // Force the account chooser to appear
    });
    console.log("Google Identity Services initialized with popup mode.");

    // Locate the custom Google sign-in button by its ID
    const customBtn = document.getElementById("custom-google-btn");
    if (customBtn) {
      console.log("Custom Google sign-in button found.");
      customBtn.addEventListener("click", function () {
        console.log("Custom Google button clicked; launching prompt.");
        // Trigger the Google sign-in prompt and log the returned notification object
        google.accounts.id.prompt(function (notification) {
          console.log("Google prompt callback fired.");
          console.log("Notification object:", notification);

          // Log properties to see if the prompt was displayed, skipped, or dismissed
          if (typeof notification.isDisplayed === "function") {
            console.log("isDisplayed:", notification.isDisplayed());
          }
          if (typeof notification.isSkippedMoment === "function") {
            console.log("isSkippedMoment:", notification.isSkippedMoment());
          }
          if (typeof notification.isDismissedMoment === "function") {
            console.log("isDismissedMoment:", notification.isDismissedMoment());
          }

          // Warn if the prompt seems to have been suppressed or dismissed
          if (notification.isNotDisplayed && notification.isNotDisplayed()) {
            console.warn("Prompt was not displayed.");
          }
          if (notification.isDismissedMoment && notification.isDismissedMoment()) {
            console.warn("Prompt was dismissed by the user.");
          }
          if (notification.isSkippedMoment && notification.isSkippedMoment()) {
            console.warn("Prompt was skipped.");
          }
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
  console.log("Encoded JWT ID token:", response.credential);
  // Optionally, send response.credential to your backend for verification.
  showSuccessScreen();
}

// Function to switch the UI from the sign-in screen to the success screen
function showSuccessScreen() {
  console.log("Switching to success screen...");
  document.getElementById("signin-container").classList.add("hidden");
  document.getElementById("success-container").classList.remove("hidden");
}

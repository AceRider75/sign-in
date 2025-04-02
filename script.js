window.addEventListener("load", function () {
  console.log("Window loaded. Verifying Google Identity Services library...");

  if (window.google && google.accounts && google.accounts.id) {
    console.log("Google Identity Services library loaded successfully.");

    // Initialize Google Identity Services
    google.accounts.id.initialize({
      client_id: "654356654645-gb2381hmg5c7l0c5jvsk8bvhtouiad08.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      ux_mode: "popup",      // Use popup mode
      auto_select: false     // No auto-sign-in
    });
    console.log("Google Identity Services initialized with popup mode.");

    // Locate the custom Google sign-in button
    const customBtn = document.getElementById("custom-google-btn");
    if (customBtn) {
      console.log("Custom Google sign-in button found.");
      customBtn.addEventListener("click", function () {
        console.log("Custom Google button clicked; launching sign-in flow.");

        // Force the sign-in popup every time by reinitializing or using a manual trigger
        google.accounts.id.prompt((notification) => {
          console.log("Prompt callback fired.");
          console.log("Notification object:", notification);

          // Log prompt status
          if (notification.isNotDisplayed()) {
            console.warn("Prompt not displayed, possibly suppressed.");
            // Fallback: Force a manual sign-in flow if suppressed
            google.accounts.id.cancel(); // Reset any existing prompt state
            google.accounts.id.prompt(); // Retry the prompt
          } else if (notification.isDismissedMoment()) {
            console.log("User dismissed the prompt.");
          } else if (notification.isSkippedMoment()) {
            console.log("Prompt was skipped.");
          } else {
            console.log("Prompt displayed successfully.");
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

// Callback function for successful sign-in
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token:", response.credential);
  showSuccessScreen();
}

// Switch to success screen
function showSuccessScreen() {
  console.log("Switching to success screen...");
  document.getElementById("signin-container").classList.add("hidden");
  document.getElementById("success-container").classList.remove("hidden");
}

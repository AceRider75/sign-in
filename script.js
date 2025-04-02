/* script.js */

// Callback function to handle the credential response returned by Google
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // TODO: Send the token to your backend (e.g., via AJAX) for further verification and authentication.
}

// Optional: Custom button approach
window.onload = function() {
  // Uncomment the following block if you'd like to use a custom button rather than
  // the pre-built Google sign in button.
  /*
  google.accounts.id.initialize({
    client_id: "654356654645-gb2381hmg5c7l0c5jvsk8bvhtouiad08.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  // Display the custom button
  document.getElementById("customBtn").style.display = "block";

  // Add a click event listener to trigger the Google Sign-In prompt
  document.getElementById("customBtn").addEventListener("click", function() {
    google.accounts.id.prompt(); // Triggers the sign in prompt popup
  });
  */
};

$(document).ready(function () {
  // Handle logout when the logout button is clicked
  $("#logoutBtn").on("click", function () {
    // Clear the token cookie
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";

    // Redirect to the login page
    window.location.href = "/home";
  });
});

$(document).ready(function () {
  $("#logoutBtn").on("click", function () {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";

    window.location.href = "/home";
  });

  $("#logoutBtnMobile").on("click", function () {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";

    window.location.href = "/home";
  });
});

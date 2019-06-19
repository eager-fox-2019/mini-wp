$(document).ready(function() {
  $("a").click(function(event) {
    event.preventDefault();
  });

  $("button").click(function(event) {
    event.preventDefault();
  });

  $("button").dblclick(function(event) {
    event.preventDefault();
  });

  $("#g-signin2").change(function() {
    vue.googlelogin();
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
  });

  // $(window).on("beforeunload", function() {
  //   console.log(vue.isOnPage);
  //   if (vue.isOnPage === "login" || vue.isOnPage === "register") {
  //   } else {
  //     alert(vue.data.isOnPage);
  //     return "Refresh Page? Your written data that you have not submintted would not be saved.";
  //   }
  // });
});

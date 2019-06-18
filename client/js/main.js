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
    vue.googlelogin()
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
  });
});




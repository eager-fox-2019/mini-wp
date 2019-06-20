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

  $("form").on("submit", function(event) {
    event.preventDefault();
  });
});

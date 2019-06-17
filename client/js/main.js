M.AutoInit();
$('#tabs-swipe-login').tabs();
$('.tabs').tabs('select', "login-swipe");

$('.sidenav').sidenav();
$('.dropdown-trigger').dropdown();


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("navbar-top").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.getElementById("navbar-top").style.marginLeft = "0";
}

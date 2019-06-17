$( ".register-button" ).click(function( event ) {
  $('.register').show()
  $('.home').hide()
  $('.login').hide()
  $("#notif-alert").empty()
})   

$( ".login-button" ).click(function( event ) {
  $('.login').show()
  $('.home').hide()
  $('.register').hide()
  $("#notification2").empty()
}) 

$( "#register-form" ).submit(function( event ) {
  event.preventDefault()
  const name = $("#nameR").val()
  const email = $("#emailR").val()
  const password = $("#passwordR").val()
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/user/register`,
    data: {
      name: name,
      email: email,
      password: password,
    },
    dataType: "json"
  })
  .done(function( data ) {
    $("#notif-alert").empty()
    $("#notif-alert").append(`
    <div class="alert alert-success" role="alert">
      Registration Success!
    </div>
    `)
    $('#notification').modal("show")
  })
  .fail(function(err) {
    $("#notif-alert").empty()
    $("#notif-alert").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
    $('#notification').modal("show")
  })
})

$( "#login-form" ).submit(function( event ) {
  event.preventDefault()
  const email = $("#emailL").val()
  const password = $("#passwordL").val()
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/user/login`,
    data: {
      email: email,
      password: password,
    },
    dataType: "json"
  })
  .done(function( data ) {
    $("#notif-alert").empty()
    $("#notif-alert").append(`
    <div class="alert alert-success" role="alert">
      Login Success!
    </div>
    `)
    $('#notification').modal("show")
    localStorage.setItem("token", data.token)
    localStorage.setItem("name", data.name)
    $("#user").append(data.name)
    $(".logged-out").hide()
    $(".logged-in").attr( "style", "display: inline-block;" )
    $(".logged-in").show()
    $('.login').hide()
    $('.home').show()
    initialPopulate()
  })
  .fail(function(err) {
    $("#notif-alert").empty()
    $("#notif-alert").append(`
    <div class="alert alert-warning" role="alert">
      ${err.responseJSON.message}
    </div>
    `)
    $('#notification').modal("show")
  })
})

// $( "#todo-form" ).submit(function( event ) {
//   event.preventDefault()
//   const name = $("#titleC").val()
//   const description = $("#descC").val()
//   const dueDate = $("#dueDateC").val()
//   $.ajax({
//     method: "POST",
//     url: `http://localhost:3000/todo/create`,
//     headers: {token: localStorage.getItem("token")},
//     data: {
//       name,
//       description,
//       dueDate
//     },
//     dataType: "json"
//   })
//   .done(function( data ) {
//     $("#notification3").empty()
//     $("#notification3").append(`
//     <div class="alert alert-success" role="alert">
//       Todo Created!
//     </div>
//     `)
//     $("#list-todo").append(`
//     <div class="card" style="width: 100%;">
//       <h5 class="card-header text-center">${data.name}</h5>
//       <div class="card-body">
//         <p class="card-text text-left">Description:</p>
//         <p class="card-text text-left">${data.description}</p>
//         <p class="card-text text-left status">Status: In Progress</p>
//         <p class="card-text text-left">Due Date: ${data.dueDate.slice(0,10)}</p>
//         <div class="text-center">
//         <a href="#" class="btn btn-primary complete mt" id="${data._id}">Completed</a>
//         <a href="#" class="btn btn-danger remove mt" id="${data._id}">Delete</a>
//         </div>
//       </div>
//     </div>
//     `)
//   })
//   .fail(function(err) {
//     $("#notification3").empty()
//     $("#notification3").append(`
//     <div class="alert alert-warning" role="alert">
//       ${err.responseJSON.message}
//     </div>
//     `)
//   })
// })

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  axios
    .post (`http://localhost:3000/user/signingoogle`, {
      token: id_token
    })
    .then(function( {data} ) {
      $("#notif-alert").empty()
      $("#notif-alert").append(`
      <div class="alert alert-success" role="alert">
        Login Success!
      </div>
      `)
      $('#notification').modal("show")
      localStorage.setItem("token", data.token)
      $("#user").append(data.name)
      $(".logged-out").hide()
      $(".logged-in").attr( "style", "display: inline-block;" )
      $(".logged-in").show()
      $('.login').hide()
      $('.home').show()
      initialPopulate()
    })
    .catch(function(err) {
      $("#notif-alert").empty()
      $("#notif-alert").append(`
      <div class="alert alert-warning" role="alert">
        ${err.message}
      </div>
      `)
    })
}

function signOut() {
  $('.logged-out').show()
  $("#user").empty()
  $('.logged-in').hide()
  $('.home').hide()
  $('.login').show()

  localStorage.removeItem('token')
  localStorage.removeItem('name')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function initialPopulate(){
  openMenu("list-article-menu", "list-article")
//   $("#list-todo").empty()
//   $.ajax({
//     method: "GET",
//     url: `http://localhost:3000/todo/list`,
//     headers: {token: localStorage.getItem("token")} 
//   })
//   .done(function( data ) {
//     for (let i = 0; i < data.length; i++){
//       let status = "In Progress"
//       if (data[i].statusComplete){
//         status = "Completed"
//         $("#list-todo").append(`
//         <div class="card" style="width: 100%;">
//           <h5 class="card-header text-center">${data[i].name}</h5>
//           <div class="card-body">
//             <p class="card-text text-left">Description:</p>
//             <p class="card-text text-left">${data[i].description}</p>
//             <p class="card-text text-left status">Status: <span class="badge badge-pill badge-success">${status}</span></p>
//             <p class="card-text text-left">Due Date: ${data[i].dueDate.slice(0,10)}</p>
//             <div class="text-center">
//             <a href="#" class="btn btn-primary complete mt" id="${data[i]._id}">Completed</a>
//             <a href="#" class="btn btn-danger remove mt" id="${data[i]._id}">Delete</a>
//             </div>
//           </div>
//         </div>
//         `)
//       } else {
//         $("#list-todo").append(`
//       <div class="card" style="width: 100%;">
//         <h5 class="card-header text-center">${data[i].name}</h5>
//         <div class="card-body">
//           <p class="card-text text-left">Description:</p>
//           <p class="card-text text-left">${data[i].description}</p>
//           <p class="card-text text-left status">Status: ${status}</p>
//           <p class="card-text text-left">Due Date: ${data[i].dueDate.slice(0,10)}</p>
//           <div class="text-center">
//             <a href="#" class="btn btn-primary complete mt" id="${data[i]._id}">Completed</a>
//             <a href="#" class="btn btn-danger remove mt" id="${data[i]._id}">Delete</a>
//           </div>
//         </div>
//       </div>
//       `)
//       }
//     }
//   })
//   .fail(function(err) {
//     $("#notification3").empty()
//     $("#notification3").append(`
//     <div class="alert alert-warning" role="alert">
//       ${err.responseJSON.message}
//     </div>
//     `)
//   })
}

$("#add-article-menu").click(function(e) {
  openMenu("add-article-menu", "add-article")
})

$("#list-article-menu").click(function(e) {
  openMenu("list-article-menu", "list-article")
})

$(".edit").click(function(e) {
  openMenu("edit-article-menu", "edit-article")
})

function openMenu (menuId, menuContentId) {
  $("#content").children("div").hide()
  $("#menu-bar").children(".menu").removeClass("menu-active")
  $(`#${menuId}`).addClass("menu-active")
  $(`#${menuContentId}`).show()
}

$(".article").click(function(e) {
  $('#article').modal("show")
})

$('document').ready(function(){
  if(localStorage.getItem('token')){
    $("#user").empty()
    let name = localStorage.getItem('name')
    $("#user").append(name)
    $(".logged-out").hide()
    $(".logged-in").attr( "style", "display: inline-block;" )
    $(".logged-in").show()
    $('.login').hide()
    $('.home').show()
    initialPopulate()
  }
})
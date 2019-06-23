const srvUrl = 'http://localhost:3000'

//Google Sign In
function onSignIn(user) {
  console.log('here')
  const token = user.getAuthResponse().id_token
  axios({
    method: 'POST',
    url: `${srvUrl}/api/user/glogin`,
    headers: { token: token }
  })
  .then(({ data }) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('name', data.name)
  })
  .catch(err => {
    console.log(err)
    swal.fire("google auth error"," please check your connection", "error")
  })
}

// Sign Out
// function logout() {
//   gapi.auth2.getAuthInstance().signOut()
//   .then(() => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('name')
//   })
// }
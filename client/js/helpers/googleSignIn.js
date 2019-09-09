function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;
   
    axios({
       method:'POST',
       url: "http://localhost:3000/users/loginGoogle",
       data:{
           idToken: id_token
       },
    })
    .then(({data})=>{
        localStorage.setItem('firstName', data.firstName)
        localStorage.setItem('lastName', data.lastName)
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('token', data.token)
         app.islogin()
    })
    .catch(error =>{
        console.log('error google sign in client')
        console.log(error)
    })
}

    



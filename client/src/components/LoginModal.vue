<template>
  <div>
      <!-- Login Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLongTitle">Login</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form-1 bg-light">
                    <div class="form-group">
                        <input v-model="email" type="text" class="form-control" placeholder="Email.." value="" />
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" class="form-control" placeholder="Password.." value="" />
                    </div>
                    <div class="form-group d-flex justify-content-center">
                        <input @click="login" data-dismiss="modal" type="submit" class="btn btn-secondary" value="Login" />
                    </div>
                    <div class="form-group d-flex justify-content-center">
                      <div data-dismiss="modal" class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = 'http://localhost:3000'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
})

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log(this.email)
      console.log(this.password)
      axios({
        url: `${baseUrl}/users/login`,
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('id', data.id)
          localStorage.setItem('email', data.email)
          // this.username = data.name
          this.email = ''
          this.password = ''
          this.$emit('setLogin', true)
          // this.isLogin = true
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        this.email = ''
        this.password = ''
      })
    },
    onSignIn(googleUser) {
      console.log('masuk')
      const idToken= googleUser.getAuthResponse().id_token
      app.isLogin = true

      axios({
        url: `${baseUrl}/users/loginGoogle`,
        method: 'post',
        data:{idToken}
      })
      .then(({data}) => {
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        this.$emit('setLogin', true)

      })
      .catch(err => {
        console.log(err.config)
      })
    }
  },
}

// function onSignIn(googleUser) {
//   console.log('masuk')
//   const idToken= googleUser.getAuthResponse().id_token
//   app.isLogin = true

//   axios({
//     url: `${baseUrl}/users/loginGoogle`,
//     method: 'post',
//     data:{idToken}
//   })
//   .then(({data}) => {
//     console.log(data)
//     localStorage.setItem('token', data.token)
//     localStorage.setItem('name', data.name)
//     localStorage.setItem('email', data.email)
//     this.$emit('setLogin', true)

//   })
//   .catch(err => {
//     console.log(err.config)
//   })
// }

function renderButton() {
  gapi.signin2.render('g-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSignIn,
    'onfailure': onFailure
  })
}
</script>

<style>

</style>

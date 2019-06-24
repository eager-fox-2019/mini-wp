<template>
  <div>
    <!-- Register Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLongTitle">Register</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form-1 bg-light">
                    <div class="form-group">
                        <input v-model="name" type="text" class="form-control" placeholder="Name.. " value="" />
                    </div>
                    <div class="form-group">
                        <input v-model="email" type="text" class="form-control" placeholder="Email.. " value="" />
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" class="form-control" placeholder="Password.. " value="" />
                    </div>
                    <div class="form-group d-flex justify-content-center">
                        <input @click="register" data-dismiss="modal" type="submit" class="btn btn-secondary" value="Register" />
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
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      console.log(this.name)
      console.log(this.email)
      console.log(this.password)
      axios({
        url: `${baseUrl}/users/register`,
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        console.log(data)
        Toast.fire({
          type: 'success',
          title: 'Registered successfully, You can login now'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>

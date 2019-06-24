<template>
  <div class="container">
    <h1>Edit Profile</h1>
  	<hr>
	<div class="row">
      <!-- left column -->
      <div class="col-md-3">
        <div class="text-center">
          <img :src="imgPreview" class="avatar img-circle" alt="avatar">
          <h6>Upload a different photo...</h6>
          
          <div class="custom-file">
                      <input @change="selectFile" type="file" class="custom-file-input" id="customFile">
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
        </div>
      </div>
      
      <!-- edit form column -->
      <div class="col-md-9 personal-info">
        <!-- <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div> -->
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Name:</label>
            <div class="col-lg-8">
              <input v-model="user.name" class="form-control" type="text" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input v-model="user.email" class="form-control" type="text" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Old Password:</label>
            <div class="col-md-8">
              <input v-model="user.oldPass" class="form-control" type="password" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">New Password:</label>
            <div class="col-md-8">
              <input v-model="user.password" class="form-control" type="password" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-8">
              <input @click="updateProfile" type="button" class="btn btn-primary" value="Save Changes">
              <span></span>
              <input @click="$emit('cancel')" type="button" class="btn btn-default" value="Cancel">
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
</template>
<script>
import axios from '../axios.js'

export default {
  props: ['old'],
  data(){
    return {
      user: {
        name: '',
        email: '',
        password: '',
        imagePreview: '',
        oldPass: '',
        image: '',
      }
    }
  },
  computed: {
    imgPreview(){
      if(this.old.image_url)
        return this.old.image_url
      else
        return '//placehold.it/150'
    }
  },
  created(){
    console.log(this.old);
    
    this.user.name = this.old.name
    this.user.email = this.old.email
    this.user.password = this.old.password
    this.user.imagePreview = this.old.image_url
  },
  methods: {
    selectFile(event) {
      if (event.target.files[0]/* event.target.files &&  */) {
        this.user.image = event.target.files[0]
        // var newVue = this
        var reader = new FileReader()
        reader.onload = (e) => {
          this.user.imagePreview = e.target.result
        }
        reader.readAsDataURL(event.target.files[0])
      }
    },
    updateProfile() {
      let formData = new FormData()
        formData.append('name',this.user.name)
        formData.append('email',this.user.email)
        formData.append('password',this.user.password)
        formData.append('image',this.user.image)
      axios({
        method: "patch",
        url: `/users/me`,
        enctype: 'multipart/formdata',
        data: formData
      })
        .then(({ data }) => {
          this.$emit('updatedProfile')
          Swal.fire({
            type: "success",
            title: "Updated!",
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch(({ response }) => {
      this.user.password = "";
          Swal.fire("Error", response.data.message, "error");
        });
    },
  }
}
</script>

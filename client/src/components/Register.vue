<template>
    <div >
        <div class="d-flex justify-content-center" style="width:800px; margin:10px auto;">
            <img src="https://pngimg.com/uploads/wordpress/wordpress_PNG28.png" alt="logo Todoz" style="width:100px">
        </div>
        <hr>
        <div class="d-flex justify-content-center mb-5" style="width:500px; margin:10px auto;">
            <form @submit.prevent="register" style="width: 100%">
                <p style="font-weight: bold; text-align: center;">Sign up with email</p> 
                <div class="form-group">
                    <input @click="hideError" v-model="newUser.email" type="email" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Email address">
                </div>
                <div class="form-group">
                    <input @click="hideError" v-model="newUser.password" type="password" class="form-control rounded-0"  placeholder="Password">
                </div>
                <div class="form-group">
                    <input @click="hideError" @blur="validatePassword" v-model="newUser.passwordConfirm" type="password" class="form-control rounded-0"  placeholder="Password Confirm">
                    <label v-show="newUser.passwordError" style="color: red"> *password doesn't match</label>
                </div>
                <div class="form-group">
                    <input @click="hideError" v-model="newUser.name" type="text" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Username">
                </div>
                 <div v-show="errorRegister" class="alert alert-danger" role="alert">
                    {{errorMessage}}
                </div>
                <button type="submit" class="btn btn-info rounded-pill" style="width:100%; height: 50px; font-weight:bold;">SIGN UP</button>
            </form>
        </div>
        <hr style="border: 1px solid rgb(153, 150, 150); width:500px">
        <div class="d-flex justify-content-center" style="width:500px; margin:50px auto;">
            <form style="width: 100%">
                <h5 style="text-align: center; font-weight:bold; "> 
                Already have an account?
                </h5>
                <div class="form-group mt-4">
                <button @click.prevent="loginPageTrigger" type="submit" class="btn btn btn-outline-secondary rounded-pill" style="width:100%; height: 50px; font-weight:bold;">LOGIN</button>
                </div>
            </form>  
        </div>
    </div>
</template>

<script>
import axios from '../api/server'
export default {
    data () {
        return {
            newUser : {
                email : '',
                password : '',
                passwordConfirm : '',
                passwordError: false,
                name: ''
            },
            errorRegister : false,
            errorMessage : ''
        }
    },
    methods : {
        validatePassword() {
            (this.newUser.password === this.newUser.passwordConfirm) ? this.newUser.passwordError = false : this.newUser.passwordError = true
        },
        register(){
            axios.post(`/register`, this.newUser)
            .then(({ data }) =>{
                localStorage.setItem('token',data.token)
                localStorage.setItem('name',data.name)
                this.$emit('showPage','home')
            })
            .catch(err =>{
                this.errorRegister = true
                this.errorMessage = "Email/password/name shouldn't be empty"
            })
        },
        loginPageTrigger() {
            this.$emit('showPage','login')
        },
        hideError () {
            this.errorRegister = false
            this.errorMessage = ''
        }
    }
}
</script>

<style>

</style>

<template>
    <div >
        <div class="d-flex justify-content-center" style="width:800px; margin:10px auto;">
            <img src="https://pngimg.com/uploads/wordpress/wordpress_PNG28.png" alt="logo Todoz" style="width:100px">
        </div>
        <hr>
        <div class="d-flex justify-content-center mb-5" style="width:500px; margin:10px auto;">
            <form @submit.prevent="login" style="width: 100%">
            <p style="font-weight: bold; text-align: center;">To continue, log in to Wordprezz.</p> 
            <div class="form-group">
                <input @click="hideError" v-model="user.email" type="email" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Email address">
            </div>
            <div class="form-group">
                <input @click="hideError" v-model="user.password" type="password" class="form-control rounded-0"  placeholder="Password">
            </div>
            <div v-show="errorLogin" class="alert alert-danger" role="alert">
                {{errorMessage}}
            </div>
            <button type="submit" class="btn btn-info rounded-pill" style="width:100%; height: 50px; font-weight:bold;">LOG IN</button>
            <p>or</p>
            <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                Sign in with Google
            </g-signin-button>
            </form>
        </div>
        <hr style="border: 1px solid rgb(153, 150, 150); width:500px">
        <div class="d-flex justify-content-center" style="width:500px; margin:50px auto;">
            <form style="width: 100%">
                <h5 style="text-align: center; font-weight:bold; "> 
                    Don't have an account?
                </h5>
                <div class="form-group mt-4">
                    <button @click.prevent="registerPageTrigger" type="submit" class="btn btn btn-outline-secondary rounded-pill" style="width:100%; height: 50px; font-weight:bold;">SIGN UP FOR WORDPREZZ</button>
                </div>
            </form>  
        </div>
    </div>
</template>

<script>
import axios from '../api/server.js'
export default {
    components : {
    },
    data () {
        return {
            user : {
                email : '',
                password : ''
            },
            errorLogin : false,
            errorMessage : '',
            googleSignInParams: {
                client_id: process.env.GOOGLE_CLIENT_ID
            }
        }
    },
    created () {
        this.page = this.showPage
    },
    methods : {
        login() {
            axios.post(`/login`, this.user)
            .then(({ data }) =>{
                localStorage.setItem('token',data.token)
                localStorage.setItem('name',data.name)
                this.$emit('showPage','home')
            })
            .catch(err =>{
                this.errorLogin = true
                this.errorMessage = err.response.data.message
            })
        },
        registerPageTrigger() {
            this.$emit('showPage','register')
        },
        hideError () {
            this.errorLogin = false
            this.errorMessage = ''
        },
        onSignInSuccess (googleUser) {
            const idToken = googleUser.getAuthResponse().id_token;
            axios.post('/login/google', { idToken })
            .then(({ data })=>{
                this.errorLogin = false
                localStorage.setItem('token',data.token)
                localStorage.setItem('name',data.name)
                this.$emit('showPage','home')
            })
            .catch(err =>{
                console.log(err)
            })
        },
        onSignInError (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>
.g-signin-button {

    display: inline-block;
    padding: 4px 8px;
    border-radius: 20px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    margin-top: 5px;
    width: 500px;
    text-align: center
}
p {
    text-align: center;
    margin-top: 10px
}
</style>

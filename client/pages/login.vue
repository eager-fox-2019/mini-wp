<template>
    <div style="height: 100%" class="flex flex-row justify-content-center align-items-center">
        <form v-on:submit.prevent="">
        <h1>Kece Badai</h1>
        <h2>Login!</h2>
        <div class="field">
            <label for="form-simple-email">Email</label>
            <input v-model="pageLogin.email" type="email" id="form-simple-email" placeholder="Enter Email">
        </div>
        <div class="field">
            <label for="form-simple-password">Password</label>
            <input v-model="pageLogin.password" type="password" id="form-simple-password" placeholder="Enter Password">
        </div>
        <div class="field">
            <button v-on:click="login" type="submit" class="button button-primary">Login</button>
            <button v-on:click="register" type="reset" class="button button-secondary">Register</button>
        </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: {
        pageLogin: {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            let { email, password } = this.pageLogin
            this.pageLogin.email = ''
            this.pageLogin.password = ''
            axios.post(`${BASE_URL}/user/login`, 
                {
                    email,
                    password
                }, this.axiosConfig())
                .then(res => {
                    let {data} = res
                    this.loginData.loggedIn = true
                    this.loginData.email = data.email
                    this.loginData.token = data.access_token
                    window.localStorage.setItem('loggedIn', 'true')
                    window.localStorage.setItem('miniwp-email', data.email)
                    window.localStorage.setItem('miniwp-token', data.access_token)
                    toast_success("Login berhasil")
                })
                .catch(toast_error) 
        },
        register() {
            let { email, password } = this.pageLogin
            this.pageLogin.email = ''
            this.pageLogin.password = ''
            axios.post(`${BASE_URL}/user/register`,
                {
                    email,
                    password
                }, this.axiosConfig())
                .then(() => {
                    toast_success('Register Berhasil')
                })
                .catch(toast_error) 
        },
    }
}
</script>

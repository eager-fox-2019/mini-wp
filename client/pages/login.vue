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
const { axios, axiosConfig, BASE_URL } = require('../helper/conn.ajax.js')
const { toast_success, toast_error } = require('../helper/utils')
export default {
    data() {
        return {
            pageLogin: {
                email: '',
                password: ''
            }
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
                }, axiosConfig())
                .then(res => {
                    let {data} = res
                    let {access_token, email} = data
                    this.$emit('successful-login', access_token, email)
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
                }, axiosConfig())
                .then(() => {
                    toast_success('Register Berhasil')
                })
                .catch(toast_error) 
        },
    }
}
</script>

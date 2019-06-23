<template>
    <div class="container" v-if="show === 'loginForm'">
        <form @submit.prevent="submitLogin">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="loginInput.email" type="email" class="form-control"
                    placeholder="Your email address">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="loginInput.password" type="password" class="form-control"
                    placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form><br>
        <h6>Or sign in using: </h6>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>

        <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%">
            Don't have an account?
            <a href="#" @click.prevent="showRegister">
                Register here!
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        loginInput: Object
    },
    data(){
        return{

        }
    },
    methods:{
        submitLogin(){
            this.$emit(submitLogin)
        },
        showRegister(){
            this.$emit(showRegister)
        }
    }
}
</script>

<style scoped>

</style>



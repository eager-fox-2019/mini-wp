<template>
    <div class="container" v-if="show === 'registerForm'">
        <form @submit.prevent="submitRegister">
            <div class="form-group">
                <label for="exampleInputEmail1">Full name</label>
                <input v-model="registerInput.name" type="text" class="form-control"
                    placeholder="Your full name">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="registerInput.email" type="email" class="form-control"
                    placeholder="Your email address">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="registerInput.password" type="password" class="form-control"
                    placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%">
            Already have an account?
            <a href="#" @click.prevent="showLogin">
                Login here!
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        registerInput: Object
    },
    data(){
        return{

        }
    },
    methods:{
        showLogin(){
            this.$emit(showLogin)
        },
        submitRegister(){
            this.$emit(submitRegister)
        }
    }
}
</script>

<style scoped>

</style>


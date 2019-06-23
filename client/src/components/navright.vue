<template>
    <div class="nav-elm">                        
        <div v-show="isLoginProps">
            <a class="navbar-brand nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
                <img src="https://0.gravatar.com/avatar/0d268b07588c38410c771a2056d120ae?s=96&d=mm" width="25" height="25" class="d-inline-block align-top" alt="" style="border-radius: 50%">
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="left: auto; right: 0;">
                <a v-show="usersignProps === 'logout'" @click.prevent="userLogoutFromChild" class="dropdown-item" href="#">Log out</a>
            </div>
        </div>
        
        <div v-show="!isLoginProps">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white">
                Register/Login
            </a>                            
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="padding:20px 30px; left: auto; right: 0; align-content: center">
                <form v-show="usersignProps === 'login'" id="login-form">
                    <div class="form-group">
                        <label for="log-email"><b>Email</b></label><br>
                        <input
                            v-bind:value="userEmailProps"
                            v-on:input="$emit('userEmail', $event.target.value)"
                            type="text" placeholder="Enter your email" name="email" id="log-email" required
                        >
                        <!-- <input v-model="userEmail" type="text" placeholder="Enter your email" name="email" id="log-email" required> -->
                    </div>
                    <div class="form-group">
                        <label for="log-psw"><b>Password</b></label><br>
                        <input
                            v-bind:value="userPswProps"
                            v-on:input="userPswProps = $event.target.value"
                            type="password" placeholder="Enter your password" name="password" id="log-psw" required
                        >
                        <!-- <input v-model="userPsw" type="password" placeholder="Enter your password" name="password" id="log-psw" required> -->
                    </div>
                    <button @click.prevent="userLoginFromChild" type="submit" class="btn btn-primary" style="width: 100%">Login</button>
                    <!-- <br>Or sign in with:
                    <br><div class="g-signin2" data-onsuccess="onSignIn"></div> -->
                    <!-- <div id="fb-root"></div>
                    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=2373734499376645&autoLogAppEvents=1"></script> -->
                    <br><small>New user? <a @click.prevent="toRegisterFromChild" href="#">Register here!</a></small>
                </form>
                <form v-show="usersignProps === 'register'" id="register-form">
                    <div class="form-group">
                        <label for="username"><b>Name</b></label><br>
                        <input
                            v-bind:value="userNameProps"
                            v-on:input="$emit('input', $event.target.value)"
                            type="text" placeholder="Enter your name" name="username" id="username" required
                        >
                        <!-- <input v-model="userName" type="text" placeholder="Enter your name" name="username" id="username" required> -->
                    </div>
                    <div class="form-group">
                        <label for="reg-email"><b>Email</b></label><br>
                        <input
                            v-bind:value="userEmailProps"
                            v-on:input="userEmailProps = $event"
                            type="text" placeholder="Enter your email" name="email" id="reg-email" required
                        >
                        <!-- <input v-model="userEmail" type="text" placeholder="Enter your email" name="email" id="reg-email" required> -->
                    </div>
                    <div class="form-group">
                        <label for="reg-psw"><b>Password</b></label><br>
                        <input
                            v-bind:value="userPswProps"
                            v-on:input="userPswProps = $event"
                            type="password" placeholder="Enter your password" name="password" id="reg-psw" required
                        >
                        <!-- <input v-model="userPsw" type="password" placeholder="Enter your password" name="password" id="reg-psw" required> -->
                    </div>
                    <button @click.prevent="userRegisterFromChild" type="submit" class="btn btn-primary" style="width: 100%">Create an account</button><br>
                    <small>Already have an account? <a @click.prevent="toLoginFromChild" href="#">Login here!</a></small>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["isLoginProps", "usersignProps", "userNameProps", "userEmailProps", "userPswProps"],
    methods:{
        userLogoutFromChild(){
            this.$emit("user-logout")
        },
        userLoginFromChild(){
            this.$emit('userEmail', this.userEmailProps)
            console.log('First emit')
            this.$emit('userPsw', this.userPswProps)
            console.log('Second emit')
            // this.$emit("user-login")
        },
        toRegisterFromChild(){
            this.$emit("to-register")
        },
        userRegisterFromChild(){
            this.$emit('userName', this.userNameProps)
            this.$emit('userEmail', this.userEmailProps)
            this.$emit('userPsw', this.userPswProps)
            this.$emit("user-register")
        },
        toLoginFromChild(){
            this.$emit("to-login")
        }
    }
}
</script>
<style scoped>
</style>
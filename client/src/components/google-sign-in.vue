<template>
  <div ref="signinBtn" class="btn-sign-in">Sign In</div>
</template>

<script>
  export default {
    mounted() {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '710791434182-tij8hkav8sjheo9ik7kufgb68j688t2m.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        })
        auth2.attachClikcHandler(this.$refs.signinBtn, {}, googleuser => {
          this.$emit('done', googleuser)
        }, error => console.log(error))
      })
    }
  }
</script>

<style>

</style>

<template>
  <header>
      <!----------- NAVBAR -------->
      <nav>
        <div class="navbar">
          <div id="mainNav">
            
            
            <div id="logo">
              <i class="fab fa-wpressr" ></i> <span> Mini WordPress</span>
            </div>  
              
            
          </div>

          <div style="color:white; margin-right: 13%;">
            Welcome {{fullName}}
          </div>

          <div id="icons">
            <a href="#" class="btn btn-primary btn-success" v-on:click.prevent="logOutUser"><i class="fas fa-sign-out-alt" style="font-size: 20px;margin-right:5px;"></i> Log Out</a>
          </div>
        </div>
      </nav>
  </header>
</template>


<script>
  export default {
    props: ['fullName'],
    data() {
      return {
      };
    },
    methods: {
      logOutUser() {
        this.$emit('reqLogOut')
      }
    }
  };
</script>

<style scoped>
</style>



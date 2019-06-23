<template>
    <div class="main-page">
        <sidebar></sidebar>
        <div id="content" class="flex flex-column justify-content-space-between">
            <navbar disableButton="true"></navbar>
            <slot></slot>
            <footer-component></footer-component>
        </div>
      </div>
</template>

<script>
  import sidebar from "./sidebar.vue"
  import navbar from "./navbar.vue"
  import footerComponent from './footer'

  export default {
    props:['sidebarOpen'],
    components: {
      sidebar,
      navbar,
      footerComponent,
    }
    
  }
</script>

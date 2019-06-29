<template>
<div>
  <b-nav style='background-color:black'>
    <router-link to="/" class="px-4">MINI-WP</router-link>
    <router-link to="/myArticles" class="px-4">my article</router-link>
    <router-link to="/create" class="px-4">create</router-link>

   
      <b-nav-item>
      profile
      </b-nav-item>
  </b-nav>
  <router-view></router-view>
</div>

</template>

<script>
export default{
  name:'app',
}
</script>



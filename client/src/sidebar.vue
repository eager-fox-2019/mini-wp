<template>
  <div class="col-2 navbar-light bg-warning vh-100">
    <ul class="navbar-nav">
      <li class="nav-item"><a @click.prevent="$emit('main-page', 'add-article')" href="#" class="nav-link"><i class="fas fa-plus-square"></i> Add
          Article</a></li>
      <li class="nav-item"><a @click.prevent="$emit('main-page', 'list-article')" href="#" class="nav-link"><i class="fas fa-copy"></i> List Article</a></li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>

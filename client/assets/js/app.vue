<template>
  
</template>
<script>
export default {
  data() {
    return {
      searchInput : "",
      page: '',
      loginStatus: localStorage.getItem('token') ? true : false,
      articles: [],
      error: '',
      newArticle: {
        title: '',
        description: '',
        content: '',
        image: ''
      },
      editArticle: {
        id: '',
        title: '',
        description: '',
        content: ''
      },
      login: {
        email: '',
        password: ''
      },
      register: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      errorLogin: {
        status: false,
        msg: ''
      },
      errorRegister: {
        status: false,
        msg: ''
      },
      loggedUser: {
        id: '',
        first_name: '',
        last_name: '',
        email: ''
      },
      successRegister: false,
      createdHook: false,
      listState: '',
      imagePreview: '',
      displayingArticle : '',
    }
  }
}
</script>
<style scoped>

</style>



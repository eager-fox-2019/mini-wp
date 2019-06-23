<template>
  
</template>
<script>
export default {
  props: ['isLoginParent', 'drawerParent'],
  data() {
    return {
      drawer: null,
      
    }
  },
  methods: {
    submitPage(val) {
      this.$emit('change-page', val)
    }
  },
}
</script>
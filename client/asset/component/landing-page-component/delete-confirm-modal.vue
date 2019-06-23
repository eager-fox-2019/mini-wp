<template>
    <b-modal id="delete-modal" hide-footer title="Delete Confirmation">
      <div class="alert" role="alert">
        Delete this article?
      </div>
      <div class="d-flex justify-content-end">
        <b-button class="btn-danger mr-2" @click="deleteArticle">Delete</b-button>
        <b-button @click="$bvModal.hide('delete-modal')">Close</b-button>
      </div>
    </b-modal>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {

    };
  },
  methods: {
    deleteArticle () {
      this.$bvModal.hide('delete-modal')
      this.$emit('deleteArticle')
    }
  }
};
</script>

<style scoped>

</style>

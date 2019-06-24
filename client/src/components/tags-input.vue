<template>
  <section>
    <b-field label="Add some tags">
      <b-taginput v-model="tags" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
    </b-field>
    <!-- <p class="content">
      <b>Tags:</b>
      {{ tags }}
    </p>-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    };
  },
  watch: {
    tags() {
      this.$emit("added", this.tags);
    }
  }
};
</script>


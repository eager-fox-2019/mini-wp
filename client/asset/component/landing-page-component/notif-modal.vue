<template>
    <b-modal id="notif-modal" hide-footer title="Notification">
      <div class="alert alert-success" role="alert" v-if="notifStat == true">
        {{message}}
      </div>
      <div class="alert alert-warning" role="alert" v-else>
        {{message}}
      </div>
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('notif-modal')">Close</b-button>
      </div>
    </b-modal>
</template>

<script>
export default {
  props: {
    'notifStat' : Boolean,
    'message' : String
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped>

</style>

<template>
  <div class="menu pl-3 pr-3 pt-2 pb-2" @click="menuEvent" v-bind:class="{'menu-active':(menu == pageActive)}">
    <div class="menu"><i :class="logoButton"></i> {{menuTitle}}</div>
  </div>
</template>

<script>
export default {
  components: { 

  },
  props: {
    'pageActive': String,
    'menu': String,
    'menuTitle': String,
    'logoButton': String
  },
  data() {
    return {

    };
  },
  methods: {
    menuEvent(){
      this.$emit('menuEvent')
    }
  }
};
</script>

<style scoped>
  .menu div {
    font-size: 20px;
    color: #006bc3;
  }
  .menu-active {
    background-color: rgba(202, 202, 202, 0.596);
  }
  .menu-active div {
    color: #006bc3;
  }
  .menu:hover > div {
    text-decoration: none;
    opacity: 0.6;
  }
  .menu:hover {
    cursor: pointer;
  }
  .disabled div{
    color: black;
  }
  .disabled:hover > div {
    cursor: default;
    opacity: 1;
  }
  .disabled div:hover {
    text-decoration: none;
    opacity: 1;
    cursor: default;
  }
  .disabled:hover {
    cursor: default;
  }
</style>

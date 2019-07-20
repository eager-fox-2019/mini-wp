<template>
  <div class="col-2 p-0 menu-container">
    <h3 class="pl-3 pr-3">Menu bar</h3>

    <div class="pl-3 pr-3">
    <hr/>
    </div>

    <div id="menu-bar">
      <menu-button @menuEvent='rendAdd' :logoButton='logoButtons[0]' :menu='menu' :menuTitle='menuTitles[0]' :pageActive='pages[0]'></menu-button>
      <menu-button @menuEvent='rendList' :logoButton='logoButtons[1]' :menu='menu' :menuTitle='menuTitles[1]' :pageActive='pages[1]'></menu-button>

      <hr style="border-color: rgba(202, 202, 202, 0.596);">

      <menu-button :logoButton='logoButtons[2]' :menu='menu' :menuTitle='menuTitles[2]' :class="'disabled'" :pageActive='pages[2]'></menu-button>
      <menu-button :logoButton='logoButtons[3]' :menu='menu' :menuTitle='menuTitles[3]' :class="'disabled'" :pageActive='pages[3]'></menu-button>
    </div>
  </div>
</template>

<script>
import menuButton from '../button-&-form-component/menu-button'
export default {
  components: {
    'menu-button': menuButton
  },
  props: {
    'menu': String
  },
  data() {
    return {
      logoButtons: [
        "fas fa-feather-alt",
        "fas fa-bars",
        "fas fa-edit",
        "fas fa-info-circle"
      ],
      menuTitles: [
        "Add Article",
        "List Article",
        "Edit Article",
        "Article Detail"
      ],
      pages: [
        "add",
        "list",
        "edit",
        "detail"
      ]
    };
  },
  methods: {
    rendList() {
      this.$emit('rendList')
    },
    rendAdd() {
      this.$emit('rendAdd')
    }
  }
};
</script>

<style scoped>
  .menu-container {
    border-right-width: 3px;
    border-right-color: rgba(202, 202, 202, 0.596);
    border-right-style: solid;
  }
  hr {
    border-width: 3px;
    border-color: rgb(73, 73, 73); 
  }
</style>

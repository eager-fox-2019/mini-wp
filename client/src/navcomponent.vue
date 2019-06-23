<template>
  <nav>
    <a class="navitem" id="logo" href="#">Mini WP</a>
    <div id="navcenter">
      <button id="writebutton" class="button" :class="{currentsection: section === 3}" @click="goTo(3)">Write</button>
      <button id="explorebutton" class="button" :class="{currentsection: section === 4}" @click="goTo(4)">Explore</button>
      <button id="articlesbutton" class="button" :class="{currentsection: section === 5}" @click="goTo(5)">My Articles</button>
    </div>
    <div id="navright" style="display: flex; align-items: center;">
      <img class="navitem" id="userimg" src="./icons/user/default.png" alt="">
      <a class="navitem" id="logout" @click="logout">Log out</a>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['section',],
  methods: {
    goTo(num) {
      this.$emit('section', num)
    },
    logout() {
      localStorage.clear()
      this.goTo(0);
      this.$emit('logout');
    },
  },
}
</script>


import Vue from 'vue/dist/vue.esm';
import axios from 'axios';
import Tiptap from './tiptap.js';

const ax = axios.create({
  baseURL: 'http://localhost:3002',
});

Vue.component('tiptap', Tiptap)

let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    loggedIn: true,
  },
  methods: {
    sendRegister(event) {
      let inputs = event.target.elements
      console.log(inputs.email.value)
      console.log(inputs.password.value)
    },
    sendLogin() {

    },
  },
  mounted() {
    console.log("111")
  }
})
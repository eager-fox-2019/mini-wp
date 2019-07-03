import Vue from 'vue'
import App from './app.client.vue'
import VModal from 'vue-js-modal'

Vue.use(VModal, {dialog: true})

new Vue(App).$mount('#app')

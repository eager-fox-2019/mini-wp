import Vue from "vue"
import App from "./App"

Vue.prototype.$serverUrl = 'http://api-mini-wp.isnanirsyad.online'

new Vue(App).$mount('#app')
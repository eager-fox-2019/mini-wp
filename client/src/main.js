import Vue from "vue"
import App from "./App"

Vue.prototype.$serverUrl = 'http://localhost:3000'

new Vue(App).$mount('#app')
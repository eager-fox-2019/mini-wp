import Vue from "vue"
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css'
import App from "./src/app.vue"

Vue.use(Vuetify)

new Vue(App).$mount("#app")

import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "http://localhost:3080";

Vue.config.productionTip = false
Vue.use(Vuesax, {})
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')

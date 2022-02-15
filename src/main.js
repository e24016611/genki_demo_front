import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "./assets/index.css"
import animated from 'animate.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(ElementUI);
Vue.use(animated)
library.add(faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

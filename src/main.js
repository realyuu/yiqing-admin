import Vue from 'vue'
import VModal from "vue-js-modal"
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'  //global css

import App from './App.vue'
import store from './store'
import router from './router'

import './icons'//icon

import './permission'//Permission
//error-log

//Element register
Vue.use(Element,{
  size: Cookies.get('size') || 'medium'
})

Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h=>h(App)
})

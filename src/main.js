import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './ui'
import 'amfe-flexible'
Vue.config.productionTip = false
console.log(process.env)
if (process.env.VUE_APP_MODE === 'development') {
  require('../mock/mock')
}
if (process.env.VUE_APP_MODE === 'sit') {
  const eruda = require('eruda')
  eruda.init()
}
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

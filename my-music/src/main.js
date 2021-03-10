import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: function () {
    return {
      isShowloading: false
    }
  }
}).$mount('#app')

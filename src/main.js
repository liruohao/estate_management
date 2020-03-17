// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import plugins from '@/common/plugins'

// import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import axios from '@/common/axios'

// Vue.use(VueResource)
Vue.use(iView)
Vue.use(VueMoment)
Vue.use(VueRouter)
Vue.use(plugins)
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

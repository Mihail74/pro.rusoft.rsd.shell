// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { sync } from 'vuex-router-sync'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'vue-material/dist/vue-material.css'
import 'src/themes/default.scss'

import App from './App'

import serviceFactory from './services'
import storeFactory from './store'
import routerFactory from './router'
import material from './material'

Vue.config.productionTip = false

const store = storeFactory()
const applicationContext = serviceFactory(store)
const router = routerFactory({ store })

sync(store, router)

Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  provide () {
    return applicationContext
  },
  material,
  template: '<App/>',
  components: { App }
})

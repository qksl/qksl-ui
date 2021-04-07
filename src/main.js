import Vue from 'vue'
import App from './App.vue'
import router from './router'
import API from './module/API' // 引入API模块
import store from '@/module/store'
import xss from 'xss' // xss过滤
import '@/scss/main.scss'
import ViewUI from 'view-design'
import G2 from '@antv/g2'
import echarts from 'echarts'
import 'view-design/dist/styles/iview.css'

// 添加全局UI组件
import BtUI from '@/components/style/index.js'

// 注册iView
Vue.use(ViewUI)

// 添加API模块
Vue.prototype.$api = API

Vue.prototype.$xss = xss
Vue.prototype.$echarts = echarts
Vue.prototype.$G2 = G2

Vue.use(BtUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

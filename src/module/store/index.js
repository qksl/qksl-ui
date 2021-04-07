import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from './modules/user' // 用户模块
Vuex.Store.prototype.$vm = Vue.prototype

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: moduleUser
  },
  state: {
    userName: localStorage.getItem('userName') || '', // 用户名
    signature: '', // 个人签名
    currentTab: sessionStorage.getItem('currentTab') || 'home', // 当前选中的tab
    // eslint-disable-next-line
    mockGuessData: []
  },
  mutations: {
    resetUserInfo (state) {
      state.userName = ''
    },
    syncUserInfo (state, data) {
      console.log('同步用户信息', data)
      state.userName = data.username
      localStorage.setItem('userName', data.username)
    },
    switchTab (state, tab, isReplace) {
      state.currentTab = tab
      sessionStorage.setItem('currentTab', tab)
    },
    syncMockGuessData (state, data) {
      state.mockGuessData = data
    }
  },
  actions: {
    // 重置用户信息
    resetUserInfo ({ commit }) {
      commit('resetUserInfo')
    },
    syncUserInfo ({ commit }, data) {
      commit('syncUserInfo', data)
    },
    switchTab ({ commit }, tab) {
      commit('switchTab', tab)
    },
    getGuessLatestLimit2 ({ commit }) {
      Vue.prototype.$api.guessQueryLatest({
        tokenType: '', // 预测币种 BTC ETH EOS LTC,
        pageNum: 1, // 页数
        pageSize: 2 // 大小
      }).then(res => {
        if (res.code === '000000') {
          // 状态为0表示为可下注的
          const list = (res.list || []).filter(item => item.status === '0')
          commit('syncMockGuessData', list)
        }
      })
    }
  }
})

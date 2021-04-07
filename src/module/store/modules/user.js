import API from '@/module/API'
export default {
  namespaced: true,
  state: {
    defaultAvatar: 'http://bitnewstest.oss-cn-hangzhou.aliyuncs.com/tx_default_10001.jpg',
    nickName: '', // 昵称
    txPicture: '', // 头像
    txSignature: '', // 签名
    type: '' // 类型
  },
  actions: {
    queryUserInfo ({ commit }) {
      // 如果用户未登录，不需要查询登录态
      if (!API.Authorization) return
      API.userCurrent().then(res => {
        if (res.code === '000000') {
          commit('syncUserInfo', res.body)
        } else {
          this.$vm.$Message.error(res.messageZh)
        }
      })
    }
  },
  mutations: {
    syncUserInfo (state, { nickName, txPicture, txSignature, type }) {
      state.nickName = nickName
      state.txPicture = txPicture
      state.txSignature = txSignature
      state.type = type
      console.log(state)
    }
  },

  getters: {
    getUserInfo (state) {
      return {
        nickName: state.nickName || '未知',
        txPicture: state.txPicture || state.defaultAvatar,
        txSignature: state.txSignature || '',
        type: state.type || ''
      }
    }
  }
}

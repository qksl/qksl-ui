<template>
  <div class="bt-wrapper mt20">
    <bt-row class="bt-wrapper-body" justify="center">
      <div class="login">
        <bt-row justify="center">
          <img src="@/assets/icon/logo.png" style="width: 100%;">
        </bt-row>
        <div v-if="type === 'email'">
          <div><bt-input class="mt15" v-model="emailLoginVo.email" placeholder="请输入邮箱地址"></bt-input></div>
          <div><bt-input type="password" class="mt15" v-model="emailLoginVo.password" placeholder="请输入密码"></bt-input></div>
          <div><bt-button class="mt15" type="primary login-btn" @click="login">登录</bt-button></div>
          <bt-row class="mt15" justify="between">
            <a href="javascript:;" class="ft12 text-link" @click="changeType('mobile')">切换为手机号登录</a>
            <a href="javascript:;" class="ft12 text-link" @click="toRegister">注册账户</a>
          </bt-row>
        </div>
        <div v-else>
          <div><bt-input class="mt15" v-model="mobileLoginVo.phoneNumber" placeholder="请输入手机号"></bt-input></div>
          <bt-row class="mt15" justify="between">
            <bt-input class="code-input" v-model="mobileLoginVo.password" placeholder="请输入验证码"></bt-input>
            <bt-button class="getcode-btn ml10" type="primary login-btn" @click="getCode">{{waitingCode ? totalTime : '获取验证码'}}</bt-button>
          </bt-row>
          <div><bt-button class="mt15" type="primary login-btn" @click="loginByCode">手机号快捷登录</bt-button></div>
          <bt-row class="mt15">
            <a href="javascript:;" class="ft12 text-link" @click="changeType('email')">切换为邮箱登录</a>
          </bt-row>
        </div>
      </div>
    </bt-row>

    <!-- 领取Token弹窗 -->
    <Modal v-model="isShowDrawToken" width="360" :closable="false">
      <bt-row justify="center">
        <img src="@/assets/icon/logo.png" style="width: 100%;">
      </bt-row>
      <div style="text-align: center;">
        <p style="font-size: 18px;margin-bottom: 10px;">欢迎来到区块森林！</p>
        <p>作为种子用户，我们发送到您账户 <span style="font-weight: bold;">1000</span> Token</p>
        <p>看资讯、玩预测</p>
        <p>快去发现Token更多的玩法吧！</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="isShowDrawToken = false">我知道了</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'mobile', // mobile 手机号方式  email 邮箱方式
      emailLoginVo: {
        email: '',
        password: ''
      },
      mobileLoginVo: {
        phoneNumber: '',
        password: ''
      },
      totalTime: 60,
      waitingCode: false, // 是否等待验证码中
      timer: null, // 定时器
      drawTokenLoding: false, // 领取Token等待（调用接口）
      isShowDrawToken: false // 是否展示领取Token按钮
    }
  },
  watch: {
    isShowDrawToken (newVal) {
      // 如果是首次登陆 isShowDrawToken 会先变 true 后变 false
      if (!newVal) {
        // 登录成功跳转主页
        this.$router.replace({ name: 'home' })
      }
    }
  },
  methods: {
    // 切换登录方式
    changeType (type) {
      this.type = type
    },
    // 去注册页
    toRegister () {
      this.$router.replace({ name: 'register' })
    },
    checkPhoneNumber (phoneNumber) {
      var reg = /^1\d{10}$/g
      return reg.test(phoneNumber)
    },
    getCode () {
      if (this.waitingCode) return this.$Message.error('操作频繁，请稍后再试')
      if (this.mobileLoginVo.phoneNumber === '') return this.$Message.error('手机号不能为空')
      if (!this.checkPhoneNumber(this.mobileLoginVo.phoneNumber)) return this.$Message.error('请输入正确的手机号')

      this.$api.userMobileCode({
        type: 'mobile',
        username: this.mobileLoginVo.phoneNumber
      }).then(res => {
        if (res.code === '000000') {
          this.$Message.success(res.messageZh)
          this.initInterval()
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    login () {
      if (this.emailLoginVo.email === '') this.$Message.error('请输入邮箱')
      if (this.emailLoginVo.password === '') this.$Message.error('请输入密码')
      this.$api.userEmailLogin({
        username: this.emailLoginVo.email,
        password: this.emailLoginVo.password
      }).then(res => {
        if (res.code === '000000') {
          this.loginSuccess(res)
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    loginByCode () {
      if (this.mobileLoginVo.phoneNumber === '') this.$Message.error('请输入手机号')
      if (this.mobileLoginVo.password === '') this.$Message.error('请输入密码')

      this.$api.userMobileLogin({
        mobile: this.mobileLoginVo.phoneNumber,
        code: this.mobileLoginVo.password
      }).then(res => {
        if (res.code === '000000') {
          this.loginSuccess(res)
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    loginSuccess (res) {
      const { first } = res.body
      const { token_type: tokenType, access_token: accessToken } = res.body.token
      this.$api.Authorization = `${tokenType} ${accessToken}`

      // 后期需处理删除，该方式不优雅
      localStorage.setItem('Authorization', `${tokenType} ${accessToken}`)
      this.$store.dispatch('syncUserInfo', res.body)

      // first 为 true 表示用户是新用户
      if (first) {
        // 展示首次奖励弹窗
        this.isShowDrawToken = true
      } else {
        // 登录成功跳转主页
        this.$router.replace({ name: 'home' })
      }

      // 登录成功后查询用户信息
      this.$store.dispatch('user/queryUserInfo')
    },
    // 初始化定时器
    initInterval () {
      this.waitingCode = true
      this.timer = setInterval(() => {
        this.totalTime--
        if (this.totalTime <= 0) {
          this.resetInterval()
        }
      }, 1000)
    },
    // 重置定时器，还原状态
    resetInterval () {
      clearInterval(this.timer)
      this.totalTime = 60
      this.waitingCode = false
    }
  },
  destroyed () {
    this.resetInterval()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login{
    width: 400px;
    padding: 15px;
    border-radius: 4px;
    background: #FFF;
    &-btn{
      width: 100%;
    }
    .code-input {
      flex: 1;
    }
    .getcode-btn{
      flex: 0 0 auto;
      width: 100px;
    }
  }
</style>

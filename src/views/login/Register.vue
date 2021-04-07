<template>
  <div class="bt-wrapper mt20">
    <bt-row class="bt-wrapper-body" justify="center">
      <div class="login">
        <bt-row justify="center">
          <img src="@/assets/icon/logo.png" style="width: 100%;">
        </bt-row>
        <div><bt-input class="mt15" v-model="formData.email" placeholder="请输入邮箱地址"></bt-input></div>
        <bt-row class="mt15" justify="center">
          <bt-input type="text" v-model="formData.code" placeholder="输入验证码" />
          <bt-button class="ml15" @click="getCode">{{waitingCode ? totalTime : '获取验证码'}}</bt-button>
        </bt-row>
        <div><bt-input type="password" v-model="formData.password" class="mt15" placeholder="请输入密码" /></div>
        <div><bt-input type="password" v-model="password2" class="mt15" placeholder="请确认密码" /></div>
        <div><bt-button class="mt15" type="primary login-btn" @click="register">注册</bt-button></div>
        <bt-row class="mt15" justify="end">
          <a href="javascript:;" class="ft12 text-link" @click="toLogin">使用已有账户登录</a>
        </bt-row>
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
import { setInterval } from 'timers'
export default {
  data () {
    return {
      password2: '', // 确认用的密码
      formData: {
        email: '',
        password: '',
        code: ''
      },
      totalTime: 60,
      waitingCode: false, // 是否等待验证码中
      timer: null, // 定时器
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
    toLogin () {
      this.$router.replace({ name: 'login' })
    },
    login () {
      this.$api.userEmailLogin({
        email: this.formData.email,
        password: this.formData.password
      }).then(res => {
        if (res.code === '000000') {
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
        }
      })
    },
    // 注册
    register () {
      if (this.formData.email === '') return this.$Message.error('请输入邮箱')
      if (!this.checkEmail(this.formData.email)) return this.$Message.error('请输入正确的邮箱地址')
      if (this.formData.code === '') return this.$Message.error('请输入验证码')
      if (this.formData.password === '') return this.$Message.error('请输入密码')
      if (this.password2 === '') return this.$Message.error('请输入确认密码')
      if (this.password2 !== this.formData.password) return this.$Message.error('两次输入密码不一致')

      this.$api.userEmailRegistry({
        username: this.formData.email,
        password: this.formData.password,
        code: this.formData.code,
        setPassword: true,
        type: 'email'
      }).then(res => {
        if (res.code === '000000') {
          this.login()
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    getCode () {
      if (this.waitingCode) return this.$Message.error('操作频繁，请稍后再试')
      if (this.email === '') return this.$Message.error('邮箱地址不能为空')
      if (!this.checkEmail(this.formData.email)) return this.$Message.error('请输入正确的邮箱地址')
      this.$api.userEmailCode({
        type: 'email',
        username: this.formData.email
      }).then(res => {
        if (res.code === '000000') {
          this.$Message.success(res.messageZh)
          this.initInterval()
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 校验邮箱
    checkEmail (email) {
      // eslint-disable-next-line
      const reg = /[\w!#$%&'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g
      return reg.test(email)
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
  }
</style>

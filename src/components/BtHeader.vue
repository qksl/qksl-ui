<template>
  <div class="bt-wrapper">
    <bt-row class="bt-wrapper-body header" justify="between" align="middle">
      <div class="header-logo" @click="switchTab('home')">
        <img src="@/assets/icon/logo.png" :alt="siteName">
        <h1 class="header-logo__name">{{siteName}}</h1>
      </div>
      <ul class="header-nav">
        <li
          class="header-nav-item"
          @click="jumpTo('home')"
          :class="{ active: shareStore.currentTab === 'home' }">首页</li>
        <!-- <li
          class="header-nav-item"
          @click="jumpTo('news')"
          :class="{ active: currentTab === 'news' }">资讯</li> -->
        <li
          class="header-nav-item"
          @click="jumpTo('investCalendar')"
          :class="{ active: shareStore.currentTab === 'investCalendar' }">日历</li>
        <li
          class="header-nav-item"
          @click="jumpTo('guess')"
          :class="{ active: shareStore.currentTab === 'guess' }">预测</li>
      </ul>
      <bt-row justify="center" align="middle">
        <div v-if="shareStore.userName">
          <span>欢迎你，<a href="javascript:;" @click="toUserCenter">{{getUserInfo.nickName}}</a></span>
          <a class="ml15" href="javascript:;" @click="logout">退出</a>
        </div>
        <bt-row v-else class="header-user" justify="center" align="middle" @click="jumpToLogin">
          <Icon class="ft24" type="md-person" />
        </bt-row>
      </bt-row>
    </bt-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      shareStore: this.$store.state,
      siteName: process.env.VUE_APP_SITE_NAME
    }
  },
  computed: {
    ...mapGetters('user', [
      'getUserInfo'
    ])
  },
  created () {
    this.$store.dispatch('getGuessLatestLimit2')
    this.$store.dispatch('user/queryUserInfo')
  },
  beforeRouteUpdate () {
  },
  methods: {
    jumpTo (tab) {
      this.$router.push({ name: tab })
    },
    jumpToLogin () {
      this.$router.push({ name: 'login' })
    },
    toUserCenter () {
      this.$router.push({ name: 'userInfo' })
    },
    logout () {
      localStorage.setItem('Authorization', '')
      localStorage.setItem('userName', '')
      sessionStorage.setItem('currentTab', 'home')
      location.href = '/'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bt-wrapper{
  background: #FFF;
}

.header{
  height: 64px;
  background: #FFF;
  &-logo{
    cursor: pointer;
    img{
      height: 54px;
    }
    &__name{
      position: fixed;left: -10000px;
    }
  }
  // 导航条
  &-nav{
    display: flex;
    align-items: center;
    &-item{
      position: relative;
      font-size: 16px;
      color: #5D6576;
      letter-spacing: 0;
      transition: .3s all linear;
      cursor: pointer;
      & + &{
        margin-left: 67px;
      }
      &::after{
        position: absolute;
        bottom: -4px;
        left: 50%;
        content: ' ';
        background-image: linear-gradient(90deg, #54A6FF 0%, #407FFF 100%);
        border-radius: 4px;
        border-radius: 4px;
        width: 0;
        height: 6px;
        transform: scale(0.5) translateX(-50%);
        transform-origin: left bottom;
        transition: .3s all linear;
      }
      &.active{
        font-size: 18px;
        color: #407FFF;
        &::after{
          width: 56px;
        }
      }
    }
  }
  // 用户登录
  &-user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #5B606A;
    color: #5B606A;
    transition: all .3s;
    &:hover{
      color: #3185f2;
      border-color: #3185f2;
    }
  }
}
</style>

<template>
  <div class="bt-wrapper mt20">
    <bt-row class="bt-wrapper-body user" justify="between">
      <!-- 左侧目录 -->
      <div class="user-nav">
        <div class="user-nav-head">
          <bt-icon style="font-size: 150px;" name="avatar" color="#ADC2CF"></bt-icon>
        </div>
        <CellGroup class="user-nav-list">
          <div @click="jumpTo('userInfo')"><Cell title="基本信息" :selected="currentPage.name === 'userInfo'"/></div>
          <div @click="jumpTo('userModifyPassword')"><Cell title="账号密码" :selected="currentPage.name === 'userModifyPassword'"/></div>
          <div @click="jumpTo('userMyGuess')"><Cell title="我的预测" :selected="currentPage.name === 'userMyGuess'"/></div>
          <div @click="jumpTo('userTask')"><Cell title="任务中心" :selected="currentPage.name === 'userTask'"/></div>
        </CellGroup>
      </div>

      <!-- 右侧主体内容 -->
      <div class="user-body">
        <div class="pd15 mb15" style="border-bottom: 1px dashed #ccc;">
          <Breadcrumb>
            <BreadcrumbItem>{{currentPage.title}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <router-view></router-view>
      </div>
    </bt-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      currentPage: {
        name: '',
        title: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'getUserInfo'
    ])
  },
  watch: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.changeStatus(to, from)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.changeStatus(to, from)
    next()
  },
  created () {
  },
  mounted () {
  },
  methods: {
    jumpTo (name) {
      this.$router.replace({ name })
    },
    changeStatus (to) {
      if (to.name) {
        this.currentPage.name = to.name
      }
      if (to.meta && to.meta.title) {
        this.currentPage.title = to.meta.title
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user{
  padding-bottom: 80px;
  &-body{
    width: 890px;
    background: #FFF;
  }

  &-nav{
    width: 270px;
    padding-bottom: 60px;
    background: #FFF;
    &-head{
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-list{
    }
  }
}

</style>

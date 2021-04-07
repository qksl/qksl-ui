<template>
  <div class="bt-wrapper mt20">
    <bt-row class="bt-wrapper-body guess" justify="between">
      <!-- 左侧主体内容 -->
      <div class="guess-body">
        <bt-row class="guess-body-nav" justify="between" align="center">
          <!-- 咨询栏目 -->
          <section class="tabs">
            <bt-button class="tabs-item" :class="{ active: tokenType === '' }" @click="switchTokenType('')" circle :default-border="false">全部</bt-button>
            <bt-button class="tabs-item" :class="{ active: tokenType === 'BTC' }" @click="switchTokenType('BTC')" circle :default-border="false">BTC</bt-button>
            <bt-button class="tabs-item" :class="{ active: tokenType === 'ETH' }" @click="switchTokenType('ETH')" circle :default-border="false">ETH</bt-button>
            <bt-button class="tabs-item" :class="{ active: tokenType === 'EOS' }" @click="switchTokenType('EOS')" circle :default-border="false">EOS</bt-button>
            <bt-button class="tabs-item" :class="{ active: tokenType === 'LTC' }" @click="switchTokenType('LTC')" circle :default-border="false">LTC</bt-button>
          </section>

          <!-- 发起预测按钮 -->
          <!-- <bt-button class="ft14 pl30 pr30" type="primary" @click="actionLaunch(true)">发起预测</bt-button> -->
        </bt-row>

        <!-- 预测列表 -->
        <div class="guess-group" v-for="(item, index) in currentGuessData" :key="`guess${index}`">
          <div class="guess-group-title" v-if="item.title">{{item.title}}</div>
          <section class="guess-list">
            <BtGuessItem
              class="guess-list-item"
              :data="guessItem"
              @bets-ok="refreshGuessList"
              v-for="(guessItem, guessIndex) in (item.showAll ? item.list : item.list.slice(0, 9))"
              :key="guessIndex"
            ></BtGuessItem>
            <!--
              只有在item.showAll为true(表示用户想查看更多预测)
              大于等于10时（说明有下一页）
              并且长度与总长度不相等（相等表示展示完了，没有下一页了）
              并且板块不是我的预测（我的预测没有分页）
            -->
            <div class="load-more"
              :class="{ 'load-more_left': item.list.length % 3 !== 0 }"
              v-if="item.showAll && item.list.length >= 10 && item.list.length !== totalRow"
              @click="loadMore"
            >
              <Spin v-if="isSending" size="large" class="center"></Spin>
              <div v-else>加载更多</div>
            </div>
          </section>
          <div class="guess-group-footer" v-if="item.list.length > 9" @click="item.showAll = !item.showAll">{{item.showAll ? '收起' : '展开'}}</div>
          <div class="guess-group-footer" v-if="item.list.length === 0">暂无预测</div>
        </div>
      </div>

      <!-- 右侧图表模块
      <div class="guess-module">
        <bt-module title="最新预测" v-if="shareStore.mockGuessData.length > 0">
          <bt-row justify="center" :class="guessIndex > 0 ? 'mt10' : ''" v-for="(guessItem, guessIndex) in shareStore.mockGuessData" :key="guessIndex">
            <BtGuessItem style="width: 285px;" :data="guessItem"></BtGuessItem>
          </bt-row>
        </bt-module>

      </div> -->
    </bt-row>

    <!-- 发起预测弹窗 -->
    <BtGuessLaunch
      :is-show="isShowGuessLaunch"
      @on-cancel="actionLaunch(false)"
      @on-success="actionLaunch(false)"
      @on-complete="guessLaunchComplete"
    ></BtGuessLaunch>
  </div>
</template>

<script>
import BtGuessItem from '_c/BtGuessItem'
import BtGuessLaunch from '_c/BtGuessLaunch'
export default {
  components: {
    BtGuessItem,
    BtGuessLaunch
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      swiperOption: {},
      tokenType: '', // 预测币种，预测目录
      currentPage: 1, // 总条数
      totalRow: 0, // 总条数
      isSending: false, // 是否发送中，发送中不允许加载更多
      currentGuessData: [], // 当前展示的预测数据
      guessLatestList: [], // 当前选中的预测列表
      guessBetsList: [], // 自己参与的预测列表
      guessTopicList: [], // 自己发起的预测列表
      isShowGuessLaunch: false // 是否展示预测弹窗
    }
  },
  created () {
    // 页面初始化获取最新预测
    this.switchTokenType('')
  },
  mounted () {
    this.initChart()
  },
  methods: {
    actionLaunch (bool = false) {
      this.isShowGuessLaunch = bool
    },
    // 预测下注结束后，刷新列表
    refreshGuessList () {
      this.switchTokenType(this.tokenType)
    },
    loadMore () {
      if (this.isSending) return this.$Message.error('请勿频繁操作')
      this.currentPage++
      this.isSending = true
      this.guessQueryLatest(this.tokenType, this.currentPage).finally(() => {
        this.isSending = false
      })
    },
    // 去详情页
    toDetail () {
      this.$router.push({ name: 'news-detail' })
    },
    // 奇幻切换预测币种
    switchTokenType (tokenType = '') {
      this.currentPage = 1
      const promiseList = []
      promiseList.push(this.guessQueryLatest(tokenType, this.currentPage))

      Promise.all(promiseList).finally(() => {
        this.tokenType = tokenType
        this.formatGuessData()
      })
    },
    // 格式化预测数据
    formatGuessData () {
      const data = []
      data.push({
        list: this.guessLatestList,
        showAll: false
      })
      this.currentGuessData = data
    },
    // 查询自己参与的预测
    guessBets () {
      return this.$api.guessBets().then(res => {
        if (res.code === '000000') {
          this.guessBetsList = res.body || []
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 查询发起的预测
    guessTopic () {
      return this.$api.guessTopic().then(res => {
        if (res.code === '000000') {
          this.guessTopicList = res.body || []
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 最新预测查询
    guessQueryLatest (tokenType, currentPage) {
      return this.$api.guessQueryLatest({
        tokenType: tokenType, // 预测币种 BTC ETH EOS LTC,
        pageNum: currentPage, // 页数
        pageSize: 10 // 大小
      }).then(res => {
        if (res.code === '000000') {
          if (currentPage === 1) {
            this.guessLatestList = res.list || []
          } else {
            this.guessLatestList.splice((currentPage - 1) * 10, 10, ...res.list)
          }
          this.totalRow = res.totalRow
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 发起预测结束
    guessLaunchComplete () {
      // 发起新的预测后更新剩余Token 以及 列表信息
      this.switchTokenType(this.tokenType)
    },
    // 初始化图表
    initChart () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 加载更多按钮
.load-more{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 30px;
  width: 260px;
  border: 1px solid #eee;
  border-radius: 6px;
  cursor: pointer;
  transition: .3s font-size, .3s border-color;
  &_left{
    margin-left: 20px;
  }
  &:hover{
    font-size: 18px;
    border-color: #3185f2;
  }
}
.guess{
  padding-bottom: 80px;
  &-btns{
    padding: 16px;
  }
  &-body{
    width: 1230px;
    min-height: 800px;
    background: #FFF;
    padding-top: 30px;
    padding-bottom: 30px;
    &-nav{
      padding: 0 16px;
    }
  }

  &-module{
    width: 290px;
  }

  // banner信息
  .banner{
    width: 890px;
    height: 270px;
    background: #6c6;
  }

  // 咨询栏目
  .tabs{
    &-item{
      border-color: transparent;
      font-size: 18px;
      color: #5D6576;
      &:hover{
        border-color: #407FFF;
        color: #407FFF;
      }
      &.active{
        border-color: #407FFF;
        color: #407FFF;
      }
    }
    .tabs-item + .tabs-item{
      margin-left: 15px;
    }
  }

  .guess-group{
    margin-top: 15px;
    &-title{
      font-size: 28px;
      padding: 0 15px;
    }
    &-footer{
      margin-top: 20px;
      margin: 0 20px 72px;
      height: 40px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 3px;
      transition: all .3s;
      cursor: pointer;
      &:hover{
        border-color: #3185f2;
        color: #3185f2;
      }
    }
    // 资讯列表
    .guess-list{
      padding: 16px 16px 16px;
      display: flex;
      flex-wrap: wrap;
      &-item{
        width: 376px;
      }
    }
  }
}

</style>

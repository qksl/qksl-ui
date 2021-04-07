<template>
  <div class="guess-item">
    <!-- 预测主体内容 -->
    <div class="guess-item-body">
      <bt-row class="mt10" justify="between" align="middle">
        <div class="guess-item-title" :title="data.topic">{{data.topic}}</div>
        <Tooltip placement="top">
          <Icon size="18" type="ios-help-circle-outline" />
          <div slot="content">
            <p>自动赔率玩法：</p>
            <p style="text-indent: 1em;">自动赔率模式中，赔率由系统实时</p>
            <p style="text-indent: 1em;">计算，结算以最终截止预测赔率为准，</p>
            <p style="text-indent: 1em;">投注时赔率仅作参考。</p>
          </div>
        </Tooltip>
      </bt-row>
      <div v-if="data.context" class="mt40 pl34 pr34 ft20 text-center">{{data.context}}</div>
      <div class="guess-item-btns mt27">
        <Poptip placement="top" width="240" v-model="isDisabled">
          <Button class="guess-btn left">
            <div class="ft14">支持</div>
            <div style="opacity: .7;">赔率{{data.yesOdds}}</div>
          </Button>
          <!-- 投注数量 -->
          <div class="guess-data">{{data.yes || 0}}</div>

          <!-- 提示窗样式 -->
          <div class="pt10 pb10" slot="content">
            <div class="ft14 bold">资金池{{data.yes}}</div>
            <bt-row class="mt5" justify="between">
              <div>赔率{{data.yesOdds}}</div>
              <div>赢则获得 约{{ (userBetsGold * data.yesOdds).toFixed(2) }}</div>
            </bt-row>
            <div class="mt10">
              <bt-input v-model="userBetsGold" placeholder="请输入投注金额"></bt-input>
            </div>
            <bt-row class="mt10" justify="center">
              <Button type="primary" class="bet-btn bull" @click="guessJoin(0, data)">投注</Button>
            </bt-row>
          </div>
        </Poptip>

        <div class="guess-vs">
          <img src="@/assets/icon/vs.png">
        </div>

        <Poptip placement="top" width="240" v-model="isDisabled1">
          <Button class="guess-btn right">
            <div class="ft14">反对</div>
            <div style="opacity: .7;">赔率{{data.noOdds}}</div>
          </Button>
          <!-- 投注数量 -->
          <div class="guess-data">{{data.no || 0}}</div>

          <!-- 提示窗样式 -->
          <div class="pt10 pb10" slot="content">
            <div class="ft14 bold">资金池</div>
            <bt-row class="mt5" justify="between">
              <div>赔率{{data.noOdds}}</div>
              <div >赢则获得 约<span v-text="(userBetsGold * data.noOdds).toFixed(2)"></span></div>
            </bt-row>
            <div class="mt10">
              <bt-input v-model="userBetsGold" placeholder="请输入投注金额"></bt-input>
            </div>
            <bt-row class="mt10" justify="center">
              <Button type="primary" class="bet-btn bear" @click="guessJoin(1, data)">投注</Button>
            </bt-row>
          </div>
        </Poptip>
      </div>
    </div>
    <!-- 预测结束时间 -->
    <div class="guess-item-deadline">{{data.permitTime}} 截止</div>
    <div class="guess-item-footer news-info">
      <bt-row justify="between" align="middle">
        <!-- 头像及标题 -->
        <bt-row>
          <div class="news-info-avatar">
            <img :src="data.createUserImage">
          </div>
          <div class="news-info-username">{{data.createUserName}}</div>
        </bt-row>
        <div class="text-level2">{{data.createTime}}</div>
      </bt-row>
      <div class="ellipsis mt8">
        <a v-if="data.discussionId" :href="`/bitnews/news/detail?id=${data.discussionId}`" target="_blank">{{data.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: false,
      isDisabled1: false,
      userBetsGold: '100'
    }
  },
  props: {
    data: {
      typ: Object,
      default: {}
    }
  },
  created () {
  },
  methods: {
    reset () {
      this.isDisabled = false
      this.isDisabled1 = false
      this.userBetsGold = '100'
      this.$emit('bets-ok')
      this.$store.dispatch('getGuessLatestLimit2')
    },
    // 下注
    guessJoin (bets, data) {
      this.$api.guessJoin({
        bets, // 下注 00-能; 1-不能,
        betsGold: this.userBetsGold, // 赌注
        promoterTopicId: data.id, // 发起人主题ID
        type: data.type // 1 自动收益 2 水友开盘
      }).then(res => {
        if (res.code === '000000') {
          this.$Message.success(res.messageZh)
          this.reset()
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .guess-item .ivu-poptip-rel{
    width: 100%;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ivu-poptip{
  flex: 1;
}
  .guess-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 270px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow:0px 10px 18px 0px rgba(198,212,229,0.17);
    border:1px solid rgba(231,241,255,1);
    border-bottom: none;
    transition: all .3s ease-in-out;
    &:hover{
      box-shadow:0px 0 18px 0px rgba(198,212,229,1);
    }
    &:nth-of-type(3n + 2) { margin-left: 20px; }
    &:nth-of-type(3n + 3) { margin-left: 20px; }
    &:nth-of-type(n + 4) { margin-top: 20px; }

    // 主体部分
    &-body{
      padding: 16px 24px 27px;
      background: #FFF;
    }
    // 结束时间
    &-deadline {
      display: flex;
      align-items: center;
      justify-content: center;
      height:24px;
      background:rgba(248,251,255,1);
      font-size:12px;
      color:rgba(49,53,63,1);
    }
    &-footer{
      padding: 16px 24px;
      background:rgba(231,241,255,1);
      flex: 1; // 用于撑起全部内容
    }
    .news-info{
      color: #5D6D85;

      &-avatar{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        overflow: hidden;
        background: #ccc;
        img{
          width: 100%;
          height: 100%;
        }
      }
      &-username{
        width: 70px;
        margin-left: 4px;
        margin-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-titile{
        color: #31353F;
      }
    }
    &-title{
      width: 100%;
      color: #333;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size:16px;
      color:rgba(49,53,63,1);
    }
    &-btns{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .guess-btn{
        background: #3185f2;
        width: 100%;
        height: auto;
        color: #FFF;
        text-align: center;
        overflow: hidden;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: all .2s;
        border: none;
        &:focus{
          box-shadow: none !important;
          outline: none !important;
        }
        &:hover{
          transform: translateY(-5px);
        }
        &.left{
          background:linear-gradient(180deg,rgba(168,222,186,1) 0%,rgba(95,213,164,1) 100%);
        }
        &.right{
          background:linear-gradient(180deg,rgba(245,182,182,1) 0%,rgba(232,127,127,1) 100%);
        }
      }
      .guess-data{
        text-align: center;
        margin-top: 10px;
        color:rgba(49,53,63,1);
      }
      .guess-vs{
        font-size: 0;
        margin: 0 5px;
      }
    }
    &-info{
      display: flex;
      width: 100%;
    }
  }

  .bet-btn{
    width: 120px;
    border: none;
    transition: all .3s;
    &:hover{
      opacity: .9;
    }
    &:focus{
      box-shadow: none !important;
      outline: none !important;
    }
    &.bull{
      background:linear-gradient(180deg,rgba(168,222,186,1) 0%,rgba(95,213,164,1) 100%);
    }
    &.bear{
      background:linear-gradient(180deg,rgba(245,182,182,1) 0%,rgba(232,127,127,1) 100%);
    }
  }
</style>

<template>
  <div class="bt-wrapper userinfo pd15">
    <h3 class="bold">我的Token：{{ownTokenCount}}</h3>
    <div class="mt15">
      <Table width="100%" border :columns="labels" :data="guessBetsList"></Table>
      <Page
        class="mt15"
        :total="guessBetsTotalRow"
        :page-size="guessBetsFormData.pageSize"
        @on-change="pageChange"
        show-elevator
        />
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      ownTokenCount: '*', // 剩余Token数量
      guessBetsList: [], // 自己参与的预测
      guessBetsTotalRow: 0, // 自己参与的预测总条数
      guessBetsFormData: {
        pageNum: 1,
        pageSize: 10
      },
      labels: [
        {
          title: '预测ID',
          align: 'center',
          key: 'id',
          width: 100,
          fixed: 'left'
        },
        {
          title: '预测主题',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const { topic } = params.row
            console.log(params.row)
            return h('div', {}, topic)
          }
        },
        {
          title: '预测状态',
          align: 'center',
          key: 'statusStr'
        },
        {
          title: '投注项',
          align: 'center',
          key: 'guessWinnerStr'
        },
        {
          title: '赔率',
          align: 'center',
          key: 'odds'
        },
        {
          title: '投注额',
          align: 'center',
          key: 'betsGold'
        },
        {
          title: '盈亏',
          align: 'center',
          key: 'income'
        },
        {
          title: '参与时间',
          key: 'createTime',
          width: '110',
          align: 'center'
        }
      ]
    }
  },
  watch: {
  },
  computed: {
    canSave () {
      const len = this.newPassword.length
      console.log(len, len >= 6, len <= 16, this.newPassword === this.newPasswordAgain)
      return !(len >= 6 && len <= 16 && this.newPassword === this.newPasswordAgain)
    }
  },
  created () {
    this.tokenAmount()
    this.guessBets()
  },
  mounted () {
  },
  methods: {
    // 查询自己剩余Token
    tokenAmount () {
      return this.$api.tokenAmount().then(res => {
        if (res.code === '000000') {
          this.ownTokenCount = res.body
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    pageChange (val) {
      this.guessBetsFormData.pageNum = val
      this.guessBets()
    },
    // 查询自己参与的预测
    guessBets () {
      return this.$api.guessBets(this.guessBetsFormData).then(res => {
        if (res.code === '000000') {
          const { list, totalRow } = res
          this.guessBetsList = list || []
          this.guessBetsTotalRow = totalRow
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userinfo{
  &-avatar{
    &-img{
      width: 64px;
      height: 64px;
      border-radius: 50%;
      cursor: pointer;
      transition: box-shadow .2s ease-in-out;
      &:hover{
        box-shadow: 0 0px 5px 2px #ccc;
      }
    }
  }
}
</style>

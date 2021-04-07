<template>
  <div>
    <!-- 发起预测弹窗 -->
    <Modal
        :value="isShow"
        :loading="isLoadingGuessLaunchModel"
        title="发起预测"
        :mask-closable="false"
        @on-ok="guessLaunch"
        ok-text="提交"
        @on-cancel="cancelGuessLaunch">
        <Form :label-width="90">
          <FormItem label="预测标题">
            <Input v-model="gussLaunchFormData.topic" placeholder="请输入预测标题"></Input>
          </FormItem>
          <FormItem label="相关资讯ID">
            <p v-if="discussionId">{{discussionId}}</p>
            <Input v-else v-model="gussLaunchFormData.discussionId" placeholder="请输入相关资讯ID"></Input>
          </FormItem>
          <FormItem label="预测类型">
            <RadioGroup v-model="gussLaunchFormData.type">
              <Radio :label="1">自动收益</Radio>
              <Radio :label="2" disabled>水友开盘</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="预测币种">
            <Select v-model="gussLaunchFormData.tokenType">
              <Option value="BTC">BTC</Option>
              <Option value="ETH">ETH</Option>
              <Option value="EOS">EOS</Option>
              <Option value="LTC">LTC</Option>
            </Select>
          </FormItem>
          <FormItem label="预测时间">
            <Row>
              <DatePicker
                type="datetime"
                @on-change="settlementTimeChange"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择时间"
                :options="dateOptions"
              ></DatePicker>
            </Row>
            <Row class="mt5">
              <RadioGroup v-model="gussLaunchFormData.guessWinner">
                <Radio :label="0">价格大于</Radio>
                <Radio :label="1">价格小于</Radio>
              </RadioGroup>
            </Row>
            <Row class="mt5">
              <Input type="number" v-model="gussLaunchFormData.guessGold" placeholder="请输入金额">
                <span slot="prepend">$</span>
              </Input>
            </Row>
          </FormItem>
          <FormItem label="押注Token">
            <Input type="number" v-model="gussLaunchFormData.betsGold" placeholder="请输入押注Token"></Input>
            <div>您当前剩余Token：{{ownTokenCount}}</div>
          </FormItem>
          <FormItem label="截止预测时间">
            <Input type="number" v-model="gussLaunchFormData.permit">
              <span slot="prepend">开奖前</span>
              <span slot="append">天</span>
            </Input>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ownTokenCount: '*', // 当前用户剩余Token
      isLoadingGuessLaunchModel: true, // 发起预测弹窗Loding
      dateOptions: { // 日期配置
        disabledDate: (date) => {
          const dayTime = 24 * 60 * 60 * 1000
          return date && date.valueOf() < Date.now() + (this.gussLaunchFormData.permit * dayTime)
        }
      },
      gussLaunchFormData: { // 发起预测相关数据
        betsGold: 1000, // 赌注
        context: '', // 内容
        type: 1, //
        discussionId: '', // 如果有则添加
        guessWinner: 0, // 0：大于，1：小于
        permit: 7, // 截止预测时间
        settlementTime: '', // 预测时间
        guessGold: '',
        tokenType: 'BTC', // 预测币种 BTC ETH EOS LTC,
        topic: '' // 预测主题
      }
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    discussionId: { // => discussionId
      type: String,
      default: ''
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal) {
        this.tokenAmount()
      } else {
        this.reset()
      }
    }
  },
  created () {
  },
  methods: {
    reset () {
      this.gussLaunchFormData.betsGold = 1000
      this.gussLaunchFormData.context = ''
      this.gussLaunchFormData.type = 1
      this.gussLaunchFormData.discussionId = ''
      this.gussLaunchFormData.guessWinner = 0
      this.gussLaunchFormData.permit = 7
      this.gussLaunchFormData.settlementTime = ''
      this.gussLaunchFormData.guessGold = ''
      this.gussLaunchFormData.tokenType = 'BTC'
      this.gussLaunchFormData.topic = ''
    },
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
    // 预测时间发生改变
    settlementTimeChange (data) {
      this.gussLaunchFormData.settlementTime = data
    },
    // 校验发起预测的表单数据
    checkGussLaunchFormData () {
    },
    // 发起预测
    guessLaunch () {
      this.isLoadingGuessLaunchModel = false
      this.$nextTick(() => {
        this.isLoadingGuessLaunchModel = true
      })
      console.log('调用了')

      // 返回true，表示校验表单数据出现问题
      if (this.checkGussLaunchFormData()) return

      if (this.discussionId) {
        this.gussLaunchFormData.discussionId = this.discussionId
      }
      this.$api.guessLaunch(this.gussLaunchFormData).then(res => {
        if (res.code === '000000') {
          this.$emit('on-success')
          this.$Message.success(res.messageZh)
        } else {
          this.$Message.error(res.messageZh)
        }
      }).finally(() => {
        // 发起新的预测后更新剩余Token 以及 列表信息
        this.tokenAmount()
        this.$emit('on-complete')
      })
    },
    // 关闭预测弹窗
    cancelGuessLaunch () {
      this.$emit('on-cancel')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

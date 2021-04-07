<template>
  <div class="bt-wrapper mt20">
    <bt-row class="bt-wrapper-body home" justify="between">
      <!-- 左侧主体内容 -->
      <div>
        <!-- 轮播图 -->
        <swiper class="banner" :options="swiperOption" ref="banner">
          <swiper-slide v-for="(item, index) in bannerList" :key="index">
            <img class="banner-img" @click="jumpTo(item.jumpUrl)" :src="item.picturePath" alt="" srcset="">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>

        <div class="home-body">
          <!-- 咨询栏目 -->
          <section class="tabs">
            <bt-button @click="newsTag = '0'" :class="{ active: newsTag === '0' }" class="tabs-item" circle :default-border="false">最新</bt-button>
            <bt-button @click="newsTag = '1'" :class="{ active: newsTag === '1' }" class="tabs-item" circle :default-border="false">政策</bt-button>
            <bt-button @click="newsTag = '2'" :class="{ active: newsTag === '2' }" class="tabs-item" circle :default-border="false">技术</bt-button>
            <bt-button @click="newsTag = '3'" :class="{ active: newsTag === '3' }" class="tabs-item" circle :default-border="false">交易所</bt-button>
          </section>

          <!-- 资讯列表 -->
          <section class="news">
            <bt-news-card v-for="(item, index) in newsList" :key="index" :data="item" @on-detail="toDetail"></bt-news-card>
            <!-- <Divider class="mt30" size="small">我是有底线的</Divider> -->
            <!-- <bt-row justify="center"><Spin class="center"></Spin></bt-row> -->
          </section>
        </div>
      </div>

      <!-- 右侧图表模块 -->
      <div class="home-module">
        <bt-module title="风险提示：防范以“虚拟货币”“区块链名义进行非法集资的风险。" desc="-- 银保监会等五部门" link="http://www.cbrc.gov.cn/chinese/newShouDoc/02DD1CADB1AC45DF948E3AD36F93BEDD.html">
          <a class="text-level1" href="https://bcbeian.ifcert.cn/index" target="_blank" rel="nofollow">
            据国家互联网信息办公室《区块链信息服务管理规定》要求，“区块链信息服务提供者”应积极在区块链信息服务备案管理系统备案。
            <span class="risk_link" style="color:#009bf4; float: right;">备案入口 > </span>
          </a>
        </bt-module>

        <bt-module title="联系我们">
          <bt-row class="contact-us" justify="between" align="middle">
            <a class="contact-us-btn" href="http://qukuaisenlin.mikecrm.com/o8jajEJ" target="_blank" rel="nofollow">
              <svg t="1580699936835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3295" width="200" height="200"><path d="M759.84384 342.21568H497.07008V92.16h262.77376l23.03488 23.1168-21.12 113.8432 17.92 115.84z" fill="#FE9900" p-id="3296"></path><path d="M927.93856 812.29312c0 33.93024-27.50976 61.44-61.44 61.44H168.47872c-33.93024 0-61.44-27.50976-61.44-61.44l87.04-254.21312c0-33.93024 42.86976-81.92 76.8-81.92h493.21472c33.93024 0 61.44 47.98976 61.44 81.92l102.40512 254.21312z" fill="#F9DB91" p-id="3297"></path><path d="M277.8368 729.34912c-11.66848 0.1024-20.6336 9.22624-20.53632 20.89472 0.1024 11.66848 9.22624 20.6336 20.89472 20.53632l427.98592-1.06496c11.66848-0.1024 20.6336-9.22624 20.53632-20.89472a19.94752 19.94752 0 0 0-19.64032-20.2496" fill="#FE9900" p-id="3298"></path><path d="M825.53856 909.568H198.46656c-35.83488 0-71.66464-17.91488-89.57952-41.8048-23.88992-29.85984-23.88992-65.69472-11.94496-107.49952l71.66464-226.93888C180.54656 491.52 234.29632 455.68512 294.016 455.68512h107.49952c11.94496 0 17.91488 5.96992 17.91488 17.91488s-11.94496 17.91488-17.91488 17.91488H294.016c-41.8048 0-83.6096 23.88992-89.57952 53.74976l-71.66464 226.93888c-5.96992 29.85984-5.96992 53.74976 5.96992 71.66464 11.94496 17.91488 35.83488 29.85984 59.71968 29.85984h627.072c23.88992 0 47.77472-11.94496 59.71968-23.88992 11.94496-17.91488 17.91488-47.77472 5.96992-71.66464l-83.6096-232.91392C795.6736 515.40992 753.8688 491.52 712.064 491.52H604.5696c-11.94496 0-17.91488-5.96992-17.91488-17.91488s5.96992-17.91488 17.91488-17.91488h113.46944c53.74976 0 107.49952 35.83488 125.4144 77.63968l83.6096 226.93888c11.94496 41.8048 11.94496 77.63968-11.94496 107.49952-23.88992 29.85472-53.74976 41.79968-89.57952 41.79968z" fill="#513329" p-id="3299"></path><path d="M479.1552 688.59904c-11.94496 0-17.91488-5.96992-17.91488-17.91488V133.19168c0-11.94496 5.96992-17.91488 17.91488-17.91488s17.91488 5.96992 17.91488 17.91488v537.49248c0 11.94496-5.96992 17.91488-17.91488 17.91488z" fill="#513329" p-id="3300"></path><path d="M759.84384 372.07552H461.2352V127.22176a53.5296 53.5296 0 0 1 53.74976-53.74976h238.88384c17.91488 0 35.83488 5.96992 41.8048 23.88992s11.94496 29.85984 5.96992 47.77472l-29.85984 65.69472c-5.96992 11.94496-5.96992 17.91488 0 29.85984l35.83488 65.69472c5.96992 17.91488 5.96992 35.83488-5.96992 47.77472-11.94496 11.94496-23.88992 17.91488-41.8048 17.91488z m-262.77376-29.85984h262.77376c5.96992 0 11.94496 0 11.94496-5.96992s1.90464-7.2704 0-11.94496l-23.88992-71.66464c-5.96992-17.91488-5.96992-35.83488 0-53.74976l29.85984-65.69472v-11.94496c0-5.96992-5.96992-5.96992-11.94496-5.96992h-238.88384c-17.91488-11.94496-29.85984 0-29.85984 11.94496v214.99392z" fill="#513329" p-id="3301"></path><path d="M226.5856 344.53504c2.56 2.56 5.12 2.56 10.24 2.56s7.68 0 10.24-2.56c5.12-5.12 5.12-12.8 0-17.92l-23.04-23.04c-5.12-5.12-12.8-5.12-17.92 0s-5.12 12.8 0 17.92l20.48 23.04zM208.6656 416.21504c2.56 0 7.68 0 10.24-2.56l23.04-23.04c5.12-5.12 5.12-12.8 0-17.92s-12.8-5.12-17.92 0l-23.04 23.04c-5.12 5.12-5.12 12.8 0 17.92 2.56 0 5.12 2.56 7.68 2.56zM293.1456 413.65504c2.56 2.56 5.12 2.56 10.24 2.56s7.68 0 10.24-2.56c5.12-5.12 5.12-12.8 0-17.92l-23.04-23.04c-5.12-5.12-12.8-5.12-17.92 0s-5.12 12.8 0 17.92l20.48 23.04zM277.7856 349.65504c2.56 0 7.68 0 10.24-2.56l23.04-23.04c5.12-5.12 5.12-12.8 0-17.92s-12.8-5.12-17.92 0l-23.04 23.04c-5.12 5.12-5.12 12.8 0 17.92 2.56 0 5.12 2.56 7.68 2.56zM315.776 160.0768c2.56 2.56 5.12 2.56 10.24 2.56s7.68 0 10.24-2.56c5.12-5.12 5.12-12.8 0-17.92l-23.04-23.04c-5.12-5.12-12.8-5.12-17.92 0s-5.12 12.8 0 17.92l20.48 23.04zM297.856 231.7568c2.56 0 7.68 0 10.24-2.56l23.04-23.04c5.12-5.12 5.12-12.8 0-17.92s-12.8-5.12-17.92 0l-23.04 23.04c-5.12 5.12-5.12 12.8 0 17.92 2.56 0 5.12 2.56 7.68 2.56zM382.336 229.1968c2.56 2.56 5.12 2.56 10.24 2.56s7.68 0 10.24-2.56c5.12-5.12 5.12-12.8 0-17.92l-23.04-23.04c-5.12-5.12-12.8-5.12-17.92 0s-5.12 12.8 0 17.92l20.48 23.04zM366.976 165.1968c2.56 0 7.68 0 10.24-2.56l23.04-23.04c5.12-5.12 5.12-12.8 0-17.92s-12.8-5.12-17.92 0l-23.04 23.04c-5.12 5.12-5.12 12.8 0 17.92 2.56 0 5.12 2.56 7.68 2.56z" fill="#FE9900" p-id="3302"></path></svg>
              <span>申请入驻</span>
            </a>
          </bt-row>
        </bt-module>

        <bt-module class="market" title="市场概况" desc="24小时数据">
          <div class="market-item" :class="{ down: !item.flag }" v-for="(item, index) in marketInfo.list" :key="index">
            <div class="market-item-title">{{item.code_name}}</div>
            <div class="market-item-cap" v-if="item.price">$ {{item.price}}</div>
            <div class="market-item-cap" v-else>{{item.market_cap}}</div>
            <div class="market-item-percent">{{item.percent_change_24h}}</div>
          </div>
        </bt-module>

        <bt-module title="恐惧&贪婪指数" :desc="`市场情绪追踪 ${fearData.updateTime}`" v-if="fearData.updateTime">
          <div slot="tips">
            <p>波动性（25%）</p>
            <p>市值/交易量（25%）</p>
            <p>社交媒体（15%）</p>
            <p>调查（15%）</p>
            <p>市值比重（10%）</p>
            <p>趋势（10%）</p>
          </div>
          <div id="fear-greed"></div>
        </bt-module>

        <bt-module title="涨跌分布" desc="市场情绪追踪">
          <div ref="marketDisb" style="width: 100%;height: 160px;"></div>
        </bt-module>

        <!-- <bt-module title="最新预测" v-if="shareStore.mockGuessData.length > 0">
          <bt-row justify="center" :class="guessIndex > 0 ? 'mt10' : ''" v-for="(guessItem, guessIndex) in shareStore.mockGuessData" :key="guessIndex">
            <BtGuessItem style="width: 285px;" :data="guessItem"></BtGuessItem>
          </bt-row>
        </bt-module> -->

        <!-- <canvas ref="chart1"></canvas> -->
      </div>
    </bt-row>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BtNewsCard from '_c/BtNewsCard'
// import BtGuessItem from '_c/BtGuessItem'
export default {
  components: {
    BtNewsCard,
    swiper,
    swiperSlide
    // BtGuessItem
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      swiperOption: {
        loop: true, // 循环播放
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 3000
        },
        speed: 500
      }, // 轮播图配置
      bannerList: [], // banner数据
      fearData: { // 恐慌数据， 后端获取
        fearValue: 0, // 恐慌值
        updateTime: '', // 更新时间
        valueClassification: '' // 描述信息
      },
      marketInfo: { // 市场行情
        total_market_cap: '', // 总市值
        total_market_percent: '', // 总市值涨跌比
        list: []
      },
      distribution: [], // 涨跌分布数据
      newsList: [], // 新闻列表
      newsTag: '0' // 0表示不区分类别,标识：1-政策, 2-区块链,3-交易所
    }
  },
  watch: {
    newsTag () {
      this.newsCommentLatest()
    }
  },
  created () {
    // 获取横幅数据
    this.newsBannerList()
    this.newsCommentLatest()
    this.ajaxQuotesMarketInfo()
    this.quotesMarketDisb().finally(() => {
      this.$nextTick(() => {
        this.initMarketDisb()
      })
    })
    this.ajaxFearLatest().finally(() => {
      this.$nextTick(() => {
        if (this.fearData.updateTime) {
          this.initChart()
        }
      })
    })
  },
  mounted () {
  },
  methods: {
    // 去详情页
    toDetail (id) {
      this.$router.push({ name: 'news-detail', query: { id } })
    },
    // Banner跳转
    jumpTo (url) {
      if (!url) return this.$Message.error('跳转链接未配置')
      location.href = url
    },
    // 初始化图表
    initChart () {
      // 极坐标下的柱状图
      // 构造数据
      const data1 = []
      for (let i = 0; i < 50; i++) {
        const item = {}
        item.type = i + ''
        item.value = 10
        data1.push(item)
      }

      const data2 = []
      for (let i = 0; i < 50; i++) {
        const item = {}
        item.type = i + ''
        item.value = 0

        // 如果小于恐慌值，则置灰
        if (i <= (this.fearData.fearValue / 2)) {
          item.value = 14
        }
        data2.push(item)
      }

      const chart = new this.$G2.Chart({
        container: 'fear-greed',
        forceFit: true,
        height: 180,
        padding: 0
      })
      chart.scale({
        type: {
          range: [ 0, 1 ]
        },
        value: {
          sync: true
        }
      })
      chart.legend(false)
      chart.tooltip(false)
      const view1 = chart.view()
      view1.source(data1)
      view1.axis(false)
      view1.coord('polar', {
        startAngle: 13 / 16 * Math.PI,
        endAngle: 3 / 16 * Math.PI,
        innerRadius: 0.75,
        radius: 1
      })
      view1.interval().position('type*value')
        .color('#F3F3F5')
        .size(4)

      const view2 = chart.view()
      view2.source(data1, {
        type: {
          tickCount: 3
        }
      })
      // 隐藏坐标轴
      view2.axis(false)

      view2.coord('polar', {
        startAngle: 13 / 16 * Math.PI,
        endAngle: 3 / 16 * Math.PI,
        innerRadius: 0.95,
        radius: 0.7
      })

      // 中间小圆环颜色与大小
      view2.interval().position('type*value')
        .color('#F3F3F5')
        .size(4)

      const view3 = chart.view()
      view3.source(data2)
      view3.axis(false)
      view3.coord('polar', {
        startAngle: 13 / 16 * Math.PI,
        endAngle: 3 / 16 * Math.PI,
        innerRadius: 0.75,
        radius: 1
      })
      // 仪表盘对应值
      view3.interval().position('type*value')
        .color('#F3C61F')
        .opacity(1)
        .size(4)
      view3.guide().text({
        position: [ '50%', '65%' ],
        content: this.fearData.fearValue, // 当前恐慌值
        style: {
          fill: '#2A2A2A',
          fontSize: 36,
          textAlign: 'center',
          textBaseline: 'middle'
        }
      })

      view3.guide().text({
        position: [ '50%', '83%' ],
        content: this.fearData.valueClassification, // 当前恐慌状态描述
        style: {
          fill: '#8B8F98',
          fontSize: 12,
          textAlign: 'center',
          textBaseline: 'middle'
        }
      })

      chart.render()
    },
    initMarketDisb () {
      var myChart = this.$echarts.init(this.$refs.marketDisb)

      var data = this.distribution.map((item, index) => {
        return [index + 0.5, item]
      })
      // 绘制图表
      myChart.setOption({
        title: {
        },
        grid: {
          left: 0,
          right: 0,
          top: '10px',
          bottom: '20px'
        },
        tooltip: {},
        xAxis: {
          type: 'value',
          splitLine: { show: false },
          interval: 1,
          max: 12,
          axisLabel: {
            fontSize: 9,
            formatter: (value, index) => {
              var labels = ['', -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, '']

              if (labels[value] !== '') return `${labels[value]}%`
            }
          }
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'bar',
          stack: '广告',
          label: {
            show: true,
            color: '#66B28C',
            fontSize: 10,
            position: 'top'
          },
          itemStyle: {
            color: '#66B28C'
          },
          barWidth: '50%',
          data: data.slice(0, 6)
        },
        {
          type: 'bar',
          stack: '广告',
          label: {
            show: true,
            color: '#E0646F',
            fontSize: 10,
            position: 'top'
          },
          itemStyle: {
            color: '#E0646F'
          },
          barWidth: '50%',
          data: data.slice(-6)
        }]
      })
    },
    /* ====================================== 接口请求函数 ====================================== */
    ajaxQuotesMarketInfo () {
      this.$api.quotesMarketInfo().then(res => {
        if (res.code === '000000') {
          this.marketInfo = res.body
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 获取横幅数据
    newsBannerList () {
      this.$api.newsBannerList().then(res => {
        console.log(res)
        if (res.code === '000000') {
          this.bannerList = res.list
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 获取最新数据
    newsCommentLatest () {
      this.$api.newsCommentLatest({
        tag: this.newsTag, // 0表示不区分类别,标识：1-政策, 2-区块链,3-交易所
        pageNum: '1',
        pageSize: '10'
      }).then(res => {
        if (res.code === '000000') {
          this.newsList = res.list
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 获取最新恐慌值
    ajaxFearLatest () {
      return this.$api.fearLatest({
        limit: 1
      }).then(res => {
        if (res.code === '000000') {
          this.fearData = res.body[0]
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 获取涨跌分布数据
    quotesMarketDisb () {
      return this.$api.quotesMarketDisb().then(res => {
        if (res.code === '000000') {
          this.distribution = res.body.distribution || []
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
.home{
  padding-bottom: 80px;
  &-body{
    width: 890px;
    margin-top: 20px;
    overflow: hidden;
    background: #FFF;
  }

  &-module{
    width: 290px;
  }

  // banner信息
  .banner{
    width: 890px;
    height: 270px;
    background: #FFF;
    &-img{
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }

  // 咨询栏目
  .tabs{
    margin-top: 36px;
    padding: 0 16px;
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

  // 资讯列表
  .news{
    padding: 12px 16px 72px;
  }

  $marketItem: '.market-item';
  // 右侧市场信息
  .market{
    &-item{
      display: flex;
      align-items: center;
      &-title{
        color: #2A2A2A;
        font-weight: bold;
      }
      &-cap{
        margin: 0 20px;
        flex: 1;
        color: #5FD5A4;
        text-align: right;
      }
      &-percent{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 54px;
        height: 20px;
        color: #FFF;
        background: #5FD5A4;
      }
      &.down {
        #{$marketItem}-cap{
          color: #E66968;
        }
        #{$marketItem}-percent{
          background: #E66968;
        }
      }
    }
    #{$marketItem} + #{$marketItem}{
      margin-top: 15px;
    }
  }

  // 联系我们的按钮
  .contact-us{
    &-btn{
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0px;
      .icon {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }
  }
  .btn{

  }
}
</style>

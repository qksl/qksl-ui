<template>
  <div class="bt-wrapper mt20 pb60">
    <div class="calendar bt-wrapper-body">
      <div class="calendar-bigevent">
        <div class="calendar-bigevent-title">{{currentYear}}</div>
        <div class="calendar-bigevent-desc">大事记</div>
        <div class="calendar-bigevent-body">
          <div class="bigevent-item" v-for="(item, index) in bigEventOfYear" :key="index">
            <div class="bigevent-item-title" :title="item.title" @click="jumpToDetail(item)">
              <p class="bigevent-item-title-icon"></p>
              {{item.title}}
            </div>
            <bt-row class="mt8 text-level2 ft12" justify="end" align="middle">
              <div><Icon class="mr5" type="md-trending-up" />利好 {{item.bullCount}}</div>
              <div class="ml20"><Icon class="mr5" type="md-trending-down" />利空 {{item.bearCount}}</div>
            </bt-row>
          </div>
        </div>
      </div>
      <div class="calendar-body">
        <bt-row justify="center">
          <BtCalendar
            :data="bigEvent"
            @on-ok="jumpToDetail"
            @on-more="showMore"
            @on-date-change="actionDateChange"
          ></BtCalendar>
        </bt-row>
      </div>
    </div>

    <Modal v-model="isShowModel" width="600" footer-hide>
      <p slot="header" style="text-align:center;">
        <span class="ft18">日历卡片</span>
      </p>
      <div class="ft18 mb15" style="text-align:center">
        {{currentBigEvent.dateStr}}
      </div>
      <div class="big-event-list">
        <div @click="jumpToDetail(item)" class="big-event-list-item" v-for="(item, index) in currentBigEvent.data" :key="index">
          <div class="big-event-list-item__title">{{item.title}}</div>
          <div class="big-event-list-item__content">
            <bt-row justify="between" >
              <div class="bull-color">利好{{item.bullCount}}</div>
              <div class="bear-color">利空{{item.bearCount}}</div>
            </bt-row>
            <bt-row justify="between" class="big-event-list-item__content-progress">
              <div :style="`flex: ${item.bullCount};`" class="big-event-list-item__content-bull"></div>
              <div :style="`flex: ${item.bearCount};`" class="big-event-list-item__content-bear"></div>
            </bt-row>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import BtCalendar from '_c/BtCalendar'
export default {
  components: {
    BtCalendar
  },
  data () {
    return {
      formData: {
      },
      currentYear: '', // 当前年度
      bigEventOfYear: [], // 当前大事记 年度大事记
      bigEventList: [], // 未格式化的数据，页面左侧list展示
      bigEvent: {}, // 格式化后的数据，给日期组件用
      cacheEvens: {}, // 暂存事件
      isShowModel: false, // 是否展示日历弹窗
      currentBigEvent: {} // 当前选择的大事件
    }
  },
  created () {
    this.getBigEvent()
  },
  methods: {
    // 日期变更
    actionDateChange (dateStr) {
      const currentDate = new Date(dateStr)
      // 当前月
      const currentMonth = this.getDateStr(currentDate)
      // 下一个月
      currentDate.setMonth(currentDate.getMonth() + 1)
      const nextMonth = this.getDateStr(currentDate)

      this.newsEvent(currentMonth, nextMonth)
    },
    // 获取日期字符串
    getDateStr (date) {
      console.log(1123, date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      const monthStr = month.toString().padStart(2, 0)
      const dayStr = day.toString().padStart(2, 0)
      return `${year}-${monthStr}-${dayStr}`
    },
    register () {
      this.$router.replace({ name: 'register' })
    },
    newsEvent (currentMonth, nextMonth) {
      if (this.cacheEvens[currentMonth]) {
        this.initBigEvent(this.cacheEvens[currentMonth])
        return
      }
      this.$api.newsEvent({
        start: currentMonth,
        end: nextMonth
      }).then(res => {
        if (res.code === '000000') {
          this.bigEventList = res.list
          this.cacheEvens[currentMonth] = res.list
          this.initBigEvent(res.list)
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 获取大事记 （年度汇总）
    getBigEvent () {
      this.currentYear = new Date().getFullYear().toString()
      this.$api.newsEvent({
        start: `${this.currentYear}-01-01`,
        end: `${this.currentYear}-12-31`
      }).then(res => {
        if (res.code === '000000') {
          this.bigEventOfYear = res.list.reverse()
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 去详情页
    jumpToDetail ({ id }) {
      this.isShowModel = false
      this.$nextTick(() => {
        this.$router.push({ name: 'news-detail', query: { id } })
      })
    },
    initBigEvent (bitEventList) {
      const data = {}

      bitEventList.forEach(item => {
        const dateStr = item.eventTime.slice(0, 10)
        // 判断下是否已有当前日期，没有则导入
        data[dateStr] || (data[dateStr] = [])

        data[dateStr].push(item)
      })

      this.bigEvent = data
    },
    showMore (data) {
      this.currentBigEvent = data
      this.isShowModel = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$calendar: calendar;
  .calendar{
    display: flex;
    justify-content: space-between;
    // 大事记
    &-bigevent{
      width: 290px;
      padding: 20px;
      background: #FFF;
      &-title{
        font-size:22px;
        color:rgba(49,53,63,1);
      }
      &-desc{
        font-size:16px;
        color:rgba(126,138,163,1);
      }
      &-body{
        margin-top: 27px;
      }
      .bigevent-item{
        &-title{
          position: relative;
          padding-left: 6px;
          width: 100%;
          overflow: hidden;
          line-height: 32px;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all .3s;
          background: #F0F5FF;
          margin-bottom: 4px;
          cursor: pointer;
          &-icon{
            position: absolute;
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
            background: #D2F3FF;
          }
          &:hover{
            color: #3185f2;
          }
        }
      }
      .bigevent-item + .bigevent-item{
        margin-top: 40px;
      }
    }
    &-body{
      background: #FFF;
      width: 890px;
      padding: 20px;
    }
  }
  .big-event-list{
    max-height: 500px;
    padding-bottom: 30px;
    overflow: auto;
    &-item + &-item{
      margin-top: 15px;
      cursor: pointer;
    }
    &-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover{
        cursor: pointer;
        color: #3185f2;
      }
      &__title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        transition: all .3s;
      }
      &__content{
        margin-left: 20px;
        width: 160px;
        flex: 0 0 auto;
        .bull-color{
          font-weight: bold;
          color: #00CC00 !important;
        }
        .bear-color{
          font-weight: bold;
          color: #FF0000 !important;
        }
        &-progress{
          border-radius: 10px;
          overflow: hidden;
          background: #00CC00;
        }
        &-bull{
          height: 10px;
          flex: 1;
          background: #00CC00;
        }
        &-bear{
          flex: 1;
          background: #FF0000;
          height: 10px;
          border-radius: 10px;
        }
      }
    }
  }
</style>

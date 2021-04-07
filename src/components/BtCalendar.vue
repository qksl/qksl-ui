<template>
  <div class="bt-calendar-picker">
    <header class="bt-calendar-picker-header">
      <div class="bt-calendar-picker-header-title">日历</div>
      <ButtonGroup class="bt-calendar-picker-header-btns">
        <Button class="bt-calendar-picker-header-btn" @click="preMonth">上月</Button>
        <Button class="bt-calendar-picker-header-today">{{currentMonth.year}}年{{currentMonth.month}}月</Button>
        <Button class="bt-calendar-picker-header-btn" @click="nextMonth">下月</Button>
      </ButtonGroup>
    </header>
    <section class="bt-calendar-picker-container no-border">
      <div class="bt-calendar-picker-weekdays">
        <div
          class="bt-calendar-picker-weekdays-item no-border"
          v-for="(weekDay, weekDayIndex) in getMonth.weekDays"
          :key="`weekDay${weekDayIndex}`"
        >{{weekDay}}</div>
      </div>
    </section>
    <section class="bt-calendar-picker-container">
      <div class="bt-calendar-picker-datelist" v-for="(days, index) in getMonth.dayList" :key="`days${index}`">
        <div
          class="bt-calendar-picker-datelist-item"
          :class="`${day.status}
          ${day.reserveDate === selectedDate && 'selected'}`"
          v-for="(day, dayIndex) in days"
          :key="`day${dayIndex}`"
          @click="checkDay(day)"
        >
          <div>
            <div class="date-str" :class="day.status">{{day.showDate}}</div>
            <div
              class="date-more ft10"
              v-if="getShowData[day.reserveDate] && getShowData[day.reserveDate].length > 4"
              @click="showMore(day.reserveDate, getShowData[day.reserveDate])"
            >+{{getShowData[day.reserveDate].length - 3}} MORE</div>
            <ul class="date-info">
              <li
                class="date-info-item"
                v-for="(item, showDataIndex) in (getShowData[day.reserveDate] || []).slice(0, 5)"
                :key="`showData${showDataIndex}`"
                :title="item.title"
                @click="jumpTo(item)"
                >
                  <p class="date-info-item-icon"></p>
                  {{item.title}}
                </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'choose-date',
  data () {
    return {
      dateStr: '', // 为空表示获取当月
      isClosing: false,
      selectedDate: '', // 当前选中日期
      currentMonth: {}, // 初始化数据(单月)
      manyDate: [], // 拥挤日期列表
      // 插件相关
      // weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      weekDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      lastDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      currentDay: '',
      selectedStatus: '' // 当前选中的状态
    }
  },
  props: {
    isShow: {
      type: Boolean
    },
    hasBack: {
      type: Boolean,
      default: true
    },
    goodsCode: {
      type: String,
      default: ''
    },
    primaryColor: {
      typ: String,
      default: ''
    },
    data: {
      typ: Object,
      default: {}
    }
  },
  created () {
    this.generatorRestholidays()
  },
  computed: {
    getShowData () {
      return this.data
    },
    // 获取机构列表
    getMonth () {
      var month = this.currentMonth
      var len = Math.ceil(month.dayList.length / 7)

      var arr = []
      for (let i = 0; i < len; i++) {
        arr.push(month.dayList.slice(i * 7, i * 7 + 7))
      }
      month.dayList = arr
      return month
    }
  },
  methods: {
    // 跳转至
    jumpTo (item) {
      this.$emit('on-ok', item)
    },
    preMonth () {
      let year = parseInt(this.currentMonth.year)
      let month = parseInt(this.currentMonth.month)
      this.dateStr = (month - 1) < 1 ? `${year - 1}-12` : `${year}-${month - 1}`
      this.generatorRestholidays()
    },
    nextMonth () {
      let year = parseInt(this.currentMonth.year)
      let month = parseInt(this.currentMonth.month)
      this.dateStr = (month + 1) > 12 ? `${year + 1}-1` : `${year}-${month + 1}`
      this.generatorRestholidays()
    },
    // 展示更多
    showMore (day, data) {
      const dateArr = day.split('-').map(item => Number(item))
      const dayStr = this._thisWeekDay(dateArr[0], dateArr[1], dateArr[2])

      this.$emit('on-more', {
        dayStr: day,
        dateStr: `${dateArr[0]}-${dateArr[1]}-${dateArr[2]} ${this.weekDays[dayStr]}`,
        data
      })
    },
    // 关闭选择框
    closeDialog () {
      this.$emit('on-close', { action: 'close' })
    },
    // 返回上一步
    goBack () {
      if (!this.hasBack) return
      this.$emit('on-close', { action: 'goback' })
    },
    // 选择完成
    complete (dateData) {
      this.$emit('on-complete', { action: 'complete', data: this.selectedDate })
    },
    // 生成日期数据
    generatorRestholidays (restholidays) {
      const month = this._createMonthList({ monthNum: 1 })
      this.currentMonth = month[0]

      this.$emit('on-date-change', `${this.currentMonth.year}-${this.currentMonth.month}`)
      // console.log(month)
    },
    // 选择日期
    checkDay (day) {
      if (day.reserveDate && day.status && day.status !== 'unavailable') {
        this.selectedStatus = day.status
        this.selectedDate = day.reserveDate
      }
      console.log('====当前选择时间====')
      console.log(this.selectedDate)
    },
    // 创建月份列表
    _createMonthList ({
      startDay = '',
      endDay = '',
      monthNum = 3
    } = {}) {
      var d = this.dateStr ? new Date(this.dateStr) : new Date()
      console.log(this.dateStr)
      var renderDate = []
      var year = d.getFullYear()
      for (var i = 0; i < monthNum; i++) {
        var month = d.getMonth() + 1

        // 12月取余12为0，所以当month + i 为12的倍数，默认赋值12
        renderDate.push(year + '-' + ((month + i) % 12 !== 0 ? (month + i) % 12 : 12))
        // 如果为12月，年份加一
        if ((month + i) % 12 === 0) {
          year++
        }
      }

      renderDate = renderDate.map(item => {
        var _date = item.split('-')

        return {
          year: _date[0],
          month: _date[1],
          weekDays: this.weekDays,
          dayList: this._createMonth(_date[0], _date[1], startDay, endDay)
        }
      })

      return renderDate
    },
    // 判断是否为闰年
    _isBissextile (year) {
      var isBis = false
      if (year % 4 === 0 && ((year % 100 !== 0) || (year % 400 === 0))) {
        isBis = true
      }
      return isBis
    },
    // 计算某月的总天数，闰年二月为29天
    _getMonthCount (year, month) {
      var Mcount = this.lastDay[month - 1]
      if ((month === 2) && this._isBissextile(year)) {
        Mcount++
      }
      return Mcount
    },
    // 计算今天是星期几
    _thisWeekDay (year, month, date) {
      var d = new Date(year, month - 1, date)
      return d.getDay()
    },

    // 输出某月的数组
    _createMonth (year, month, startDay, endDay) {
      var cutNum = 0 // 日期前移天数
      var index = this._thisWeekDay(year, month, 1) // 获取今天是星期几
      var arr = [] // 输出最终的日期数组
      var count = index + this.lastDay[month - 1] // 遍历次数为当月天数＋上一跃剩余天数
      // 上一个月的天数
      var lastDay = this.lastDay[month - 2 < 0 ? this.lastDay.length - month - 2 : month - 2]
      var lastMonth = parseInt(month) === 1 ? 12 : parseInt(month) - 1
      var lastYear = parseInt(month) === 1 ? year - 1 : year
      for (var i = 0; i < count; i++) {
        if (i < index) {
          // arr.unshift(lastDay - i);
          arr.unshift(this._createDateMap(lastYear, lastMonth, lastDay - i, startDay, endDay, true))
          // arr.unshift({ status: 'empty' })
        } else {
          // arr.push(i - index + 1)
          arr.push(this._createDateMap(year, month, i - index + 1, startDay, endDay))
        }
      }
      for (i = 0; i < cutNum; i++) {
        arr.shift()
      }

      var len = arr.length % 7 > 0 && 7 - (arr.length % 7)
      var nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1
      // var nextYear = parseInt(month) === 12 ? year + 1 : year
      for (i = 1; i <= len; i++) {
        arr.push(this._createDateMap(year, nextMonth, i, startDay, endDay, true))
        // arr.push({ status: 'empty' })
      }
      return arr
    },
    // 生成日期对象
    _createDateMap (year, month, dateNum, startDay, endDay, notCurrentMonth = false) {
      var reserveDate = `${year}-${String(month).padStart(2, 0)}-${String(dateNum).padStart(2, 0)}`
      var reserveTime = new Date(reserveDate).getTime()
      var startDayTime = new Date(startDay).getTime()
      var endDayTime = new Date(endDay).getTime()

      const currentDay = new Date()
      const currentYear = currentDay.getFullYear()
      const currentMonth = currentDay.getMonth()
      const currentDate = currentDay.getDate()
      const currentDayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, 0)}-${String(currentDate).padStart(2, 0)}`

      var status = (reserveTime < startDayTime || reserveTime > endDayTime) ? 'unavailable' : 'open'

      // 添加今天
      if (reserveDate === currentDayStr) {
        status = 'today'
      } else if (notCurrentMonth) {
        status = 'other'
      }
      return {
        reserveDate: reserveDate,
        showDate: String(dateNum),
        // status: ''
        status: status
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$borderColor: #f0f2f9;

.no-border{
  border: none !important;
}
.bt-calendar-picker{
  width: 100%;
  font-size: 14px;
  &-header{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin: 10px 0 15px;
    &-title{
      font-size:22px;
      font-weight:600;
      color:rgba(0,34,100,1);
      letter-spacing:1px;
    }
    &-btns{
      position: absolute;
      right: 0;
      top: 0;
    }
    &-btn{
      width: 66px;
      background: #E5E6E9;
      color: #7e8aa3;
      transition: all .3s ease-in-out;
      font-size: 12px;
      box-shadow: none;
      &:hover{
        color: #FFF;
        background: #3B72E1;
      }
    }
    &-today{
      font-size:14px;
      font-weight:500;
      color:rgba(0,34,100,1);
      width: 110px;
      box-shadow: none;
    }
    &__content{
      font-size: 20px;
      margin: 0 15px;
    }
    &__icon{
      cursor: pointer;
      transition: all .3s;
      &:hover{
        color: #3185f2;
      }
    }
  }
  &-container{
    color: #333333;
    min-width: 300px;
    border-top: 1px solid $borderColor;
    border-left: 1px solid $borderColor;
  }

  &-weekdays{
    display: flex;
    width: 100%;
    text-align: center;
    &-item{
      font-size:10px;
      color:rgba(126,138,163,1);
      line-height:12px;
      padding: 0 5px;
      text-align: right;
      height: 3em;
      line-height: 3em;
      flex: 1;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
    }
  }

  &-datelist{
    display: flex;
    &-item{
      position: relative;
      flex: 1;
      overflow: hidden;
      border: 1px solid transparent;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      // min-height: 14em;
      height: 125px;
      padding: 32px 6px 6px;
      transition: .3s all ease-in-out;
      &:hover{
        cursor: pointer;
        border-color: #027AFF;
        .date-str{
          background: #3B72E1 !important;
          color: #FFF !important;
        }
      }
      .date-str{
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        border-radius: 50%;
        position: absolute;
        color: #2A2A2A;
        top: 5px;
        right: 5px;
        transition: .3s all ease-in-out;
        &.today{
          background:rgba(232,234,239,1);
        }
        &.other{
          color: rgba(126,138,163,.5);;
        }
      }
      .date-more{
        position: absolute;
        z-index: 1;
        background: #FFF;
        width: 100%;
        height: 24px;
        line-height: 24px;
        padding: 0 6px;
        color: #84929C;
        bottom: 0;
        left: 0;
        transition: all .3s;
        &:hover{
          color: #3185f2;
        }
      }
    }
  }
}

.date-info{
  &-item{
    cursor: pointer;
    position: relative;
    padding-left: 6px;
    font-size: 12px;
    width: 100%;
    overflow: hidden;
    line-height: 19px;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all .3s;
    background: #F0F5FF;
    margin-bottom: 4px;
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
</style>

<template>
  <div class="news-card" @click="$emit('click')" v-if="data">
    <!-- 标题 -->
    <div class="news-card-title" @click="clickTitle">{{getDetail.title}}</div>

    <!-- 详情 -->
    <div class="news-card-detail mt20">
      <div class="news-card-detail-img">
        <img :src="getDetail.picturePath">
      </div>
      <div class="news-card-detail-body">
         <!--  -->
        <div class="news-card-detail-body-content" v-html="$xss(getDetail.content)"></div>
        <bt-row class="news-card-detail-body-footer" justify="between" align="middle">
          <bt-row>
            <div class="news-card-tag news-card-tag__good">利好{{getDetail.bullCount}}</div>
            <div class="news-card-tag news-card-tag__bad">利空{{getDetail.bearCount}}</div>
          </bt-row>

          <!-- 分析展示 -->
          <div class="text-level2 ft14"><Icon class="ft18" type="ios-paper" /> {{getDetail.commontNums}} 条分析</div>
        </bt-row>
      </div>
    </div>

    <!-- 评论 -->
    <!-- maxComment 如果有则展示对应评论内容 -->
    <div class="news-card-comment mt20" v-if="getDetail.upCommontUserId">
      <div class="news-card-comment-header">
        <!-- 头像及标题 -->
        <bt-row align="middle">
          <div class="news-card-comment-avatar">
            <img :src="getDetail.upCommontUserImage">
          </div>
          <div class="news-card-comment-title">
            {{getDetail.upCommontUsername}}
          </div>
          <span class="ml5 text-level2 ft12">· {{getDetail.upCommontTime}}</span>
        </bt-row>
        <a v-if="getDetail.launchFlag" class="ft12" href="javascript:;" @click="actionToGuess(getDetail.upCommontUserId)">他的预测</a>
      </div>
      <div>
        <div class="news-card-comment-content">{{getDetail.upCommont}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created () {
  },
  computed: {
    // 获取详情
    getDetail () {
      return this.data || {}
    }
  },
  methods: {
    // 点击他的预测按钮
    actionToGuess (userId) {
      this.$Message.info('Coming soon!!!')
      this.ajaxGuessQueryTopicByUserId(userId).finally(() => {
      })
    },
    // 点击标题
    clickTitle () {
      this.$emit('on-detail', this.getDetail.id)
    },
    // 通过userID查询用户发起的预测
    ajaxGuessQueryTopicByUserId (userId) {
      return this.$api.guessQueryTopicByUserId({
        userId,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        if (res.code === '000000') {
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
.news-card{
  padding: 24px;
  transition: .2s box-shadow linear;
  &:hover{
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  }
  &-title{
    color: #000;
    font-weight: 600;
    font-size: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    transition: .2s color linear;
    &:hover{
      color: #3185f2;
    }
  }
  &-detail{
    display: flex;
    justify-content: space-between;
    &-img{
      width: 200px;
      height: 120px;
      border-radius: 4px;
      overflow: hidden;
      background: #ccc;
      flex: 0 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-body{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin-left: 20px;
      &-content{
        color: rgba(0,0,0,.56); // 颜色变灰
        word-break: break-all;
        text-align: justify;
        line-height: 22px;
        // 超出五行展示省略号
        max-height: 88px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      &-footer{
        position: relative;
      }
    }
  }
  &-comment{
    position: relative;
    padding: 10px 20px;
    background:rgba(250,250,252,1);
    border-radius:2px;
    // 向上尖角
    &::after{
      content: ' ';
      position: absolute;
      right: 30px;
      top: -24px;
      border: 12px solid transparent;
      border-bottom-color: rgba(250,250,252,1);
    }
    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-avatar{
      width: 24px;
      height: 24px;
      overflow: hidden;
      border-radius: 50%;
      background: #ccc;
      margin-right: 4px;
      flex: 0 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-title{
      font-weight: 600;
      font-size: 16px;
    }
    &-content{
      margin-top: 8px;
      margin-left: 28px;
      text-align: justify;
      word-break: break-all;
      color: #5D6576;
      line-height: 20px;
      // 超过两行省略号
      max-height: 40px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  &-tag{
    width: 74px;
    height: 24px;
    display: flex;
    line-height: 1;
    justify-content: center;
    align-items: center;
    // cursor: pointer;
    & + & {
      margin-left: 20px;
    }
    &__good{
      color: #F06D6D;
      background: rgba(240,109,109, .16);
    }
    &__bad{
      color: #57DAA2;
      background: rgba(87,218,162, .16);
    }
  }
}
</style>

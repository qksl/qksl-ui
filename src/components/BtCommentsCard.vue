<template>
  <div class="comments-card">
    <section class="comments-card-header">
      <div class="comments-card-header-btn-group" :style="`flex: ${bullCount}`">
        <div class="comments-card-header-btn-group__btn left">利好</div>
        <div class="comments-card-header-btn-group__num left">利好 {{bullCount}}</div>
      </div>
      <div class="comments-card-header-c">
        <img src="@/assets/icon/vs.png" alt="" sizes="" srcset="">
      </div>
      <div class="comments-card-header-btn-group" :style="`flex: ${bearCount}`">
        <div class="comments-card-header-btn-group__btn right">利空</div>
        <div class="comments-card-header-btn-group__num right">利空 {{bearCount}}</div>
      </div>
    </section>
    <section class="comments-card-list">
      <div class="comments-card-list-item" :class="{ good: item.type === '1', bad: item.type === '2' }" v-for="(item, index) in data" :key="index">
        <div class="comments-card-list-item-header">
          <div class="comments-card-list-item-avatar">
            <img :src="item.txPicture" alt="" srcset="">
          </div>
          <div class="comments-card-list-item-title">{{item.userName}}</div>
        </div>
        <div>
          <div :title="item.content" class="comments-card-list-item-content">{{item.content}}</div>
        </div>
        <div style="display: flex; align-items: center;justify-content: flex-end; color: #B0BCCA; text-align: right;">
          <Icon class="ft18" type="ios-thumbs-up" />
          <span class="ml3 pt4">{{item.likedSum}}</span>
        </div>
      </div>
      <!-- <div class="comments-card-list-item bad">
        <div class="comments-card-list-item-header">
          <div class="comments-card-list-item-avatar"></div>
          <div class="comments-card-list-item-title">抱住我的BTC</div>
        </div>
        <div>
          <div class="comments-card-list-item-content">币安将卖出所持有BNB，用于购买BTC进行被盗亏空的填补，近期看跌BNB，看涨BTC看涨看涨看涨币安将卖出所持有BNB</div>
        </div>
      </div> -->
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    data: { // 评论Top数据
      type: Array,
      default: () => {
        return []
      }
    },
    bearCount: { // 利空数
      type: Number,
      default: 0
    },
    bullCount: { // 利好数
      type: Number,
      default: 0
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.comments-card{
  padding: 25px 15px 35px;
  &-header{
    width: 100%;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-c{
      width: 32px;
      height: 32px;
      margin: 0 12px;
      padding-top: 12px;
    }
    &-btn-group{
      min-width: 85px;
      flex: 1 0 auto;
      &__btn{
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 2px;
        border-radius: 2px;
        font-size: 16px;
        color: #FFF;
        &.left{
          background: #57DAA2;
          box-shadow: inset 0 -4px 2px 0 rgba(18,19,23,0.16);
        }
        &.right{
          background: #F06D6D;
          box-shadow: inset 0 -4px 2px 0 rgba(18,19,23,0.16);
          border-radius: 2px;
          border-radius: 2px;
        }
      }
      &__num{
        font-size: 14px;
        margin-top: 8px;
        text-align: center;
        &.left{
          color: #57DAA2;
        }
        &.right{
          color: #F06D6D;
        }
      }
    }
  }
  &-list{
    &-item{
      margin-top: 12px;
      overflow: hidden;
      border-radius: 4px;
      position: relative;
      padding: 12px 10px;
      background: rgba(240,109,109,.04);;
      &::before{
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background: transparent;
      }
      &.good::before{
        background: #57DAA2;
      }
      &.bad::before{
        background: #F06D6D;
      }
      &::after{
        position: absolute;
        right: 0;
        top: 0;
        width: 38px;
        height: 31px;
        border-radius: 0 0 0 12px;
        font-size: 12px;
        line-height: 31px;
        text-align: center;
        background: transparent;
      }
      &.good::after{
        content: '利好';
        color: #57DAA2;
        background: rgba(87,218,162,.16);
      }
      &.bad::after{
        content: '利空';
        color: #F06D6D;
        background: rgba(240,109,109,.16);
      }
      &-header{
        display: flex;
        align-items: center;
      }
      &-avatar{
        width: 24px;
        height: 24px;
        overflow: hidden;
        border-radius: 50%;
        background: #ccc;
        margin-right: 4px;
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
        color: #5D6576;
        line-height: 20px;
        text-align: justify;
        // 超过四行省略号
        max-height: 80px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>

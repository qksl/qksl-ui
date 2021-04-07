<template>
  <div class="module-item">
    <a
      v-if="title && link"
      class="module-item-title link"
      href="http://www.cbrc.gov.cn/chinese/newShouDoc/02DD1CADB1AC45DF948E3AD36F93BEDD.html"
      target="_blank"
      rel="nofollow"
    >{{title}}</a>

    <bt-row v-else-if="title" style="padding-right: 16px;" justify="between" align="middle">
      <div class="module-item-title">{{title}}</div>
      <Tooltip v-if="isShowTips">
        <Icon size="18" type="ios-help-circle-outline" />
        <div slot="content">
          <slot name="tips"/>
        </div>
      </Tooltip>
    </bt-row>

    <div class="module-item-desc" :class="{ link: link }" v-if="desc">{{desc}}</div>
    <!-- 当标题和描述都没有时，不需要向上的边距 -->
    <div class="module-item-body" :class="{ mt0:  !title && !desc}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowTips: false // 是否展示提示
    }
  },
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 标题外链
    link: {
      type: String,
      default: ''
    },
    // 描述
    desc: {
      type: String,
      default: ''
    }
  },
  created () {
    if (this.$slots.tips) {
      this.isShowTips = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.module{
  &-item{
    padding: 16px 0 20px;
    background: #FFF;
    &-title{
      display: block;
      position: relative;
      padding: 0 20px 0 16px;
      font-size:16px;
      font-weight:bold;
      color:rgba(49,53,63,1);
      line-height:22px;
      &.link:hover{
        color: #3185f2;
      }
      &::before{
        position: absolute;
        content: ' ';
        left: 0;
        top: 0;
        width:4px;
        height: 100%;
        background:rgba(2,122,255,1);
      }
    }
    &-desc{
      padding: 0 20px 0 16px;
      font-size:12px;
      color:rgba(173,178,190,1);
      line-height:18px;
      margin-top: 5px;
      &.link{
        text-align: right;
      }
    }
    &-body{
      margin-top: 24px;
      padding: 0 20px 0 16px;
    }
  }

  &-item + &-item{
    margin-top: 20px;
  }
}
</style>

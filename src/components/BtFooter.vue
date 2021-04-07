<template>
  <div class="bt-wrapper">
    <bt-row class="bt-wrapper-body footer" justify="between" align="middle">
      <div class="footer-detail">
        <p class="footer-detail-logo"><img src="@/assets/icon/footer_logo.png"/></p>
        <p>领先的资讯解读社区，聪明的投资者都在这里</p>
      </div>
    </bt-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shareStore: this.$store.state,
      siteName: process.env.VUE_APP_SITE_NAME
    }
  },
  computed: {
  },
  created () {
  },
  beforeRouteUpdate () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bt-wrapper{
  background: #161841;
}

.footer{
  padding: 40px 0 70px;
  min-height: 175px;
  color: #FFFFFF;
  background: #161841;
  display: flex;
  justify-content: space-between;
  &-detail{
    &-logo{
      font-size: 24px;
      margin-bottom: 10px;
    }
    font-size:12px;
    font-weight:400;
    color:rgba(178,180,181,1);
  }
}
</style>

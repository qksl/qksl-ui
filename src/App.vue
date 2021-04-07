<template>
  <div id="app">
    <div id="nav">
      <bt-header />
    </div>
    <router-view style="min-height: calc(100vh - 259px);"/>
    <BackTop></BackTop>
    <bt-footer></bt-footer>
  </div>
</template>

<script>
import BtHeader from '_c/BtHeader.vue' // @ is an alias to /src
import BtFooter from '_c/BtFooter.vue' // @ is an alias to /src

export default {
  components: {
    BtHeader,
    BtFooter
  }
}
</script>

<style lang="scss">
</style>

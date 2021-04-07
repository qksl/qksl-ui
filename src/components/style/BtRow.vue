<template>
  <div class="bt-row" :class="getClass" @click="click">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 水平对齐方式
    justify: {
      type: String,
      default: 'start'
    },
    // 垂直对齐方式
    align: {
      type: String,
      default: 'top'
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  },
  computed: {
    getClass () {
      return {
        'bt-row__start': this.justify === 'start',
        'bt-row__center': this.justify === 'center',
        'bt-row__end': this.justify === 'end',
        'bt-row__between': this.justify === 'between',
        'bt-row__around': this.justify === 'around',
        'bt-row__top': this.align === 'top',
        'bt-row__middle': this.align === 'middle',
        'bt-row__bottom': this.align === 'bottom'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

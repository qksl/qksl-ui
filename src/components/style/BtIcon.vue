<template>
  <i class="bt-icon" :class="getClass" :style="getStyle"></i>
</template>

<script>
export default {
  props: {
    // 水平对齐方式
    name: {
      type: String,
      default: ''
    },
    // 垂直对齐方式
    color: {
      type: String,
      default: '#CCC'
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  },
  computed: {
    getClass () {
      if (this.name) {
        return `bt-icon-${this.name}`
      } else {
        return ''
      }
    },
    getStyle () {
      return [
        `color: ${this.color};`
      ].join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

<template>
  <button class="bt-btn" :class="getClass" @click="click">
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  props: {
    // 水平对齐方式
    type: {
      type: String,
      default: 'default'
    },
    circle: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    getClass () {
      return {
        [`bt-btn-${this.type}`]: true,
        [`bt-btn-${this.size}`]: true,
        'bt-btn-circle': this.circle
      }
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

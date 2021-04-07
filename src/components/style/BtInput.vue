<template>
  <div class="bt-input-wrapper bt-input-wrapper-default bt-input-type">
    <input autocomplete="off" :value="value" spellcheck="false" :type="type" @input="changeInput" :placeholder="placeholder" class="bt-input bt-input-default">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    // 水平对齐方式
    type: {
      type: String,
      default: 'text'
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
    changeInput (ev) {
      this.$emit('input', ev.target.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

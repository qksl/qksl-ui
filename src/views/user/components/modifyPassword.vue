<template>
  <div class="bt-wrapper userinfo pd15">
    <!-- 用户信息 -->
    <Form :label-width="100">
      <!-- <FormItem label="原密码" required>
        <Input
          v-model.trim="oldPassword"
          style="width: 300px"
          placeholder="请输入原密码"
          />
      </FormItem> -->
      <FormItem label="新密码" required>
        <Input
          v-model.trim="newPassword"
          type="password"
          maxlength="16"
          show-word-limit
          style="width: 300px"
          placeholder="请输入新密码（6~16位）"
          />
      </FormItem>
      <FormItem label="确认新密码" required>
        <Input
          v-model.trim="newPasswordAgain"
          type="password"
          maxlength="16"
          show-word-limit
          placeholder="请再次输入新密码（6~16位）"
          style="width: 300px"
          />
      </FormItem>
      <FormItem>
        <Button :disabled="canSave" type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      newPasswordAgain: '' // 确认新密码
    }
  },
  watch: {
    newsTag () {
      this.newsCommentLatest()
    }
  },
  computed: {
    canSave () {
      const len = this.newPassword.length
      return !(len >= 6 && len <= 16 && this.newPassword === this.newPasswordAgain)
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    save () {
      this.$api.userModifyPassword({
        newPassword: this.newPassword
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
.userinfo{
  &-avatar{
    &-img{
      width: 64px;
      height: 64px;
      border-radius: 50%;
      cursor: pointer;
      transition: box-shadow .2s ease-in-out;
      &:hover{
        box-shadow: 0 0px 5px 2px #ccc;
      }
    }
  }
}
</style>

<template>
  <div class="bt-wrapper userinfo pd15">
    <!-- 用户信息 -->
    <Form :label-width="100" label-colon>
      <FormItem label="头像">
        <bt-row class="userinfo-avatar" align="middle">
          <img class="userinfo-avatar-img" @click="showAvatar(getUserInfo.txPicture)" :src="getUserInfo.txPicture" alt="" srcset="">
          <template v-if="fileUrl">
            <p class="pl10 pr5">预览图:</p>
            <img class="userinfo-avatar-img" @click="showAvatar(fileUrl)" :src="fileUrl" alt="" srcset="">
          </template>
          <Upload
            v-if="isEdit"
            class="ml20"
            :before-upload="handleUpload"
            action="JavaScript:;">
            <Button icon="ios-cloud-upload-outline">上传新头像</Button>
          </Upload>
        </bt-row>
      </FormItem>
      <FormItem label="昵称" required>
        <Input v-if="isEdit" v-model="userFormData.nickName" style="width: 300px" />
        <Input v-else v-model="getUserInfo.nickName" disabled style="width: 300px" />
      </FormItem>
      <FormItem label="个人签名">
        <Input v-if="isEdit" maxlength="200" v-model="userFormData.signature" show-word-limit type="textarea" style="width: 300px" />
        <Input v-else disabled v-model="getUserInfo.txSignature" type="textarea" style="width: 300px" />
      </FormItem>
      <FormItem>
        <Button v-if="!isEdit" type="primary" @click="actionEdit">点我更改资料</Button>
        <Button v-if="isEdit" class="mr10" type="primary" @click="actionCancel">取消</Button>
        <Button v-if="isEdit" type="primary" @click="actionSave">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      userFormData: {
        image: null, // 图片
        signature: '', // 个人签名
        nickName: '' // 昵称
      },
      fileUrl: '',
      isEdit: false
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    actionEdit () {
      this.userFormData.nickName = this.getUserInfo.nickName
      this.userFormData.signature = this.getUserInfo.txSignature
      this.isEdit = true
    },
    actionCancel () {
      this.userFormData.image = null
      this.userFormData.signature = ''
      this.userFormData.nickName = ''
      this.fileUrl = ''

      this.isEdit = false
    },
    actionSave () {
      this.ajaxUserModifyInfo()
    },
    showAvatar (imgUrl) {
      this.$Modal.info({
        render: (h) => {
          return h('div', {
            style: {
              textAlign: 'center'
            }
          },
          [h('img', {
            style: {
              width: '350px'
            },
            attrs: {
              src: imgUrl
            }
          })]
          )
        }
      })
    },
    handleUpload (file) {
      console.log(file)
      this.fileUrl = URL.createObjectURL(file)
      this.userFormData.image = file
      return false
    },
    ajaxUserModifyInfo () {
      this.$api.userModifyInfo(this.userFormData).then(res => {
        if (res.code === '000000') {
          this.actionCancel()
          this.$store.dispatch('user/queryUserInfo')
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    }
  },
  computed: {
    ...mapGetters('user', [
      'getUserInfo'
    ])
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

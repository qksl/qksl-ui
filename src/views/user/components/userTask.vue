<template>
  <div class="bt-wrapper task pd15">
    <h3 class="bold mb15">我的Token：{{ownTokenCount}}</h3>
    <Tabs v-model="tabName">
      <TabPane
        :label="tab.tabLabel"
        :name="tab.tabName"
        v-for="(tab, tabIndex) in getTaskList"
        :key="`tab${tabIndex}`"
        :disabled="tab.tabData.length === 0"
      >
        <List item-layout="vertical">
          <ListItem v-for="item in tab.tabData" :key="item.title" style="align-items: center;">
            <ListItemMeta :avatar="icon" :title="item.desc" :description="`奖励 ${item.reward} TOKEN`" />
            <template slot="extra">
              <Button
                size="large"
                shape="circle"
                :type="item.status === 1 ? 'primary' : 'default'"
                :disabled="item.status !== 1"
                style="width: 140px;margin-right: 10px;"
                @click="actionTaskAwards(item)"
              >{{item.statusStr}}</Button>
            </template>
          </ListItem>
        </List>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      tabName: 'daily',
      icon: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
      isSending: false,
      ownTokenCount: '*', // 剩余Token数量
      dailyTasks: [], // 日常任务
      growUpTasks: [], // 成长任务
      operateTasks: [] // 运营活动
    }
  },
  computed: {
    getTaskList () {
      return [
        {
          tabLabel: '每日任务',
          tabName: 'daily',
          tabData: this.dailyTasks
        },
        {
          tabLabel: '成长任务',
          tabName: 'growing',
          tabData: this.growUpTasks
        },
        {
          tabLabel: '运营活动',
          tabName: 'operate',
          tabData: this.operateTasks
        }
      ]
    }
  },
  watch: {
  },
  created () {
    this.ajaxTaskList()
    this.ajaxTokenAmount()
  },
  mounted () {
  },
  methods: {
    // 用户点击领取奖励
    actionTaskAwards ({ id, status }) {
      if (status !== 1) return
      this.ajaxTaskAwards(id).finally(() => {
        // 领取奖励后更新下任务状态
        this.ajaxTaskList()
        this.ajaxTokenAmount()
      })
    },
    // 查询任务列表
    ajaxTaskList () {
      this.$api.taskList().then(res => {
        if (res.code === '000000') {
          const { dailyTasks, growUpTasks, operateTasks } = res.body

          this.dailyTasks = dailyTasks
          this.growUpTasks = growUpTasks
          this.operateTasks = operateTasks
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 领取任务奖励
    ajaxTaskAwards (id) {
      if (this.isSending) return
      this.isSending = true
      return this.$api.taskAwards({ id }).then(res => {
        if (res.code === '000000') {
          this.$Message.success(res.messageZh)
        } else {
          this.$Message.error(res.messageZh)
        }
      }).finally(() => {
        this.isSending = false
      })
    },
    // 查询自己剩余Token
    ajaxTokenAmount () {
      return this.$api.tokenAmount().then(res => {
        if (res.code === '000000') {
          this.ownTokenCount = res.body
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
.task{
}

</style>

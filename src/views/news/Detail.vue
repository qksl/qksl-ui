<template>
  <div class="bt-wrapper mt20">
    <bt-row class="bt-wrapper-body home" justify="between">
      <!-- 左侧主体内容 -->
      <div class="home-body">
        <!-- 资讯详情 -->
        <section class="news-detail">
          <div class="news-detail-title" :title="detail.title">{{detail.title}}</div>
          <div class="news-detail-source">来源 {{detail.source}} {{detail.updateTime}}</div>
          <div class="news-detail-content">
            <div class="news-detail-line" v-html="$xss(detail.content)"></div>
            <!-- <div class="news-detail-line">据Coindesk 报道，5月9日，美国众议院金融服务委员会投票决定成立一个专门针对金融技术的工作组——FinTech特别工作组。工作组将由马萨诸塞州众议员斯蒂芬· 林奇（Stephen Lynch）领导，负责审查区块链和加密货币工具等诸多工作。</div>
            <div class="news-detail-line image"></div>
            <div class="news-detail-line">目前，该工作组的职责不仅包括金融基础设施和数据隐私，还涉及从国内和国际两个角度管理金融科技，贷款承销中融资和“另类数据”使用，以及审查支付行业的法律和监管框架。</div>
            <div class="news-detail-line">据Coindesk 报道，5月9日，美国众议院金融服务委员会投票决定成立一个专门针对金融技术的工作组——FinTech特别工作组。工作组将由马萨诸塞州众议员斯蒂芬· 林奇（Stephen Lynch）领导，负责审查区块链和加密货币工具等诸多工作。</div>
            <div class="news-detail-line">据Coindesk 报道，5月9日，美国众议院金融服务委员会投票决定成立一个专门针对金融技术的工作组——FinTech特别工作组。</div> -->
          </div>
          <Row type="flex" justify="center" align="bottom" class="mt15" v-if="getUserInfo.type === '1'">
            <Button type="primary" @click="actionLaunch(true)">发起预测</Button>
          </Row>
        </section>

        <!-- 评论信息 -->
        <section class="news-comments mt20">
          <!-- 输入框 只有大V可以评论 -->
          <div class="news-comments-input" id="comment-input"  v-if="getUserInfo.type === '1'">
            <div class="news-comments-input-body">
              <RadioGroup v-model="commentType">
                <Radio label="1">利好</Radio>
                <Radio label="2">利空</Radio>
              </RadioGroup>
              <Input class="mt10" v-model="commentText" type="textarea" :autosize="true" placeholder="聊聊你的分析逻辑吧" />
            </div>
            <bt-row class="mt20" justify="between" align="top">
              <div class="text-level2">发表前请先选择观点</div>
              <bt-button type="primary login-btn" @click="userCommentIssue">发表</bt-button>
            </bt-row>
          </div>

          <!-- 评论列表 -->
          <div class="news-comments-body">
            <div class="news-comments-tabs">
              <div @click="newsType = '1'" class="news-comments-tabs-item" :class="{ active: newsType === '1' }">
                <span>利好</span>
                <span class="ft12 ml3">{{detail.bullCount}}</span>
              </div>
              <div @click="newsType = '2'" class="news-comments-tabs-item" :class="{ active: newsType === '2' }">
                <span>利空</span>
                <span class="ft12 ml3">{{detail.bearCount}}</span>
              </div>
            </div>
            <div ref="commentsList" class="news-comments-list">
              <div class="news-comments-list-item" v-for="(item, index) in commentList" :key="index">
                <div class="news-comments-list-item-logo">
                  <img class="news-comments-list-item-logo__img" :src="item.txPicture" alt="" srcset="">
                </div>
                <div class="news-comments-list-item-content">
                  <div class="news-comments-list-item-content__title">{{item.userName}}</div>
                  <div class="news-comments-list-item-content__detail" :class="{ maxheight: !item.isShowMore }">
                    <div class="comments-content">
                      <pre class="pre-style">{{item.content}}</pre>
                    </div>
                    <div
                      v-if="item.isShowBtn"
                      @click="actionShowMoreComment(item)"
                      class="news-comments-list-item-content__detail-showmore text-link"
                    >查看更多</div>
                  </div>
                  <div class="news-comments-list-item-content__footer">
                    <div>{{item.updateTime}}</div>
                    <div @click="userCommentLiked(item.id, item.liked)" class="news-comments-list-item-content__footer-liked" :class="{ like: item.liked }">
                      <Icon class="ft18" style="flex: 0 0 auto;" type="ios-thumbs-up" />
                      <span class="ml5 pt3" style="flex: 0 0 auto;">{{item.likedSum}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 页码相关 -->
            <div class="news-comments-pager" v-if="commentList.length > 0">
              <bt-page :total="totalComment" :current="currentPage" size="small" prev-text="上一页" next-text="下一页" @on-change="changePage"></bt-page>
              <bt-button class="news-comments-pager-btn" type="text" size="small" @click="scrollToCommit">发表观点</bt-button>
            </div>
          </div>

        </section>
        <!-- 相关资讯 -->
        <section class="relevance-info" v-if="lists.length > 0">
          <div class="relevance-info-title">相关资讯</div>
          <div class="relevance-info-list">
            <div class="relevance-info-list-item" v-for="(item, index) in lists" :key="index" @click="jumpToDetail(item)">
              <div class="relevance-info-list-item-header">
                <img :src="item.picturePath">
              </div>
              <div class="relevance-info-list-item-body">
                <div  class="relevance-info-list-item-body__title" :title="item.title">{{item.title}}</div>
              </div>
            </div>
            <!-- <div class="relevance-info-list-item">
              <div class="relevance-info-list-item-header"></div>
              <div class="relevance-info-list-item-body">
                币安5月13日开放冲提金地方
              </div>
            </div> -->
          </div>
        </section>

        <!-- 行为走势 暂时隐藏  -->
        <!-- <section class="run-chart">

        </section> -->
      </div>

      <!-- 右侧图表模块 -->
      <div class="home-module">
        <BtCommentsCard :data="posts" :bear-count="detail.bearCount" :bull-count="detail.bullCount"></BtCommentsCard>
        <div class=" pb20">
          <div class="ml16 mb15 ft16 bold" v-if="shareStore.mockGuessData.length > 0">最新预测</div>
          <bt-row justify="center" :class="guessIndex > 0 ? 'mt10' : ''" v-for="(guessItem, guessIndex) in shareStore.mockGuessData" :key="guessIndex">
            <BtGuessItem style="width: 285px;" :data="guessItem"></BtGuessItem>
          </bt-row>
        </div>
      </div>
    </bt-row>

    <BtGuessLaunch
      :is-show="isShowGuessLaunch"
      :discussion-id="id"
      @on-cancel="actionLaunch(false)"
      @on-success="actionLaunch(false)"
    ></BtGuessLaunch>
  </div>
</template>

<script>
import BtCommentsCard from '_c/BtCommentsCard'
import BtGuessItem from '_c/BtGuessItem'
import BtGuessLaunch from '_c/BtGuessLaunch'
import { mapGetters } from 'vuex'
export default {
  components: {
    BtCommentsCard,
    BtGuessItem,
    BtGuessLaunch
  },
  data () {
    return {
      shareStore: this.$store.state, // 数据中心
      // 文章详情，模拟
      // eslint-disable-next-line
      // detail: { "id": 1005, "bearCount": 0, "bullCount": 0, "adminId": 1, "content": "11111111111111111111111111111111111", "eventFlag": "2", "eventTime": "2019-08-29 19:30:50", "picturePath": "https://bitnewstest.oss-cn-hangzhou.aliyuncs.com/big.jpg", "source": "me", "status": "2", "stickyPostId": null, "tag": "3", "title": "年中大跌", "updateTime": "2019-08-29 19:30:50" },
      detail: {}, // 详情
      lists: [], // 相关资讯
      posts: [], // 点赞Top
      id: '', // 新闻ID
      newsType: '1', // 消息面，默认利好: 1-利好, 2-利空
      commentList: [], // 评论列表
      totalComment: 0, // 全部评论数
      currentPage: 1, // 第一页开始
      commentText: '', // 发表评论内容
      commentType: '1', // 发表评论消息面: 1-利好, 2-利空
      isShowGuessLaunch: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'getUserInfo'
    ])
  },
  watch: {
    newsType () {
      console.log('消息面变了: ', this.newsType)
      this.currentPage = 1 // 切换利好利空都要从第一页开始
      this.newsCommentList()
    }
  },
  created () {
    const { id } = this.$route.query
    this.id = String(id)

    // 获取资讯内容与评论内容
    this.newsDetails()
    this.newsCommentList()
    console.log(this.id)
  },
  // 路由更新后重新获取数据
  beforeRouteUpdate (to, from, next) {
    const { id } = this.$route.query
    this.id = id

    // 获取资讯内容与评论内容
    this.newsDetails().finally(() => {
      try {
        const oBody = document.documentElement || document.body
        oBody.scrollTop = 0
      } catch (err) {
        console.log(err)
      }
      next()
    })
    this.newsCommentList()
  },
  methods: {
    actionLaunch (bool = false) {
      this.isShowGuessLaunch = bool
    },
    actionShowMoreComment (item) {
      console.log(item)
      item.isShowMore = true
      item.isShowBtn = false
    },
    // 滚动到发表评论的位置
    scrollToCommit () {
      location.href = '#comment-input'
    },
    // 查询新闻详情
    newsDetails () {
      return this.$api.newsDetails({
        id: this.id
      }).then(res => {
        if (res.code === '000000') {
          const { discussionVo, lists, posts } = res.body

          this.detail = discussionVo
          this.lists = lists // 相关资讯
          this.posts = posts
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 评论页面切换
    changePage (page) {
      this.currentPage = page
      this.newsCommentList()
    },
    jumpToDetail ({ id }) {
      this.$router.push({ name: 'news-detail', query: { id: String(id) } })
    },
    initCommentBtn () {
      const nodeList = this.$refs.commentsList.querySelectorAll('.comments-content')

      Array.from(nodeList).forEach((node, index) => {
        if (node.offsetHeight > 200) {
          const item = { ...this.commentList[index] }

          item.isShowBtn = true
          this.commentList.splice(index, 1, item)
        }
      })
    },
    // 查询评论列表
    newsCommentList () {
      this.$api.newsCommentList({
        pageNum: this.currentPage,
        pageSize: '10',
        id: this.id, // 评论的id
        type: this.newsType // 消息面: 1-利好, 2-利空
      }).then(res => {
        if (res.code === '000000') {
          this.commentList = res.list
          this.totalComment = res.totalRow

          this.commentList.forEach(item => {
            item.isShowMore = false
            item.isShowBtn = false
          })

          this.$nextTick(() => {
            this.initCommentBtn()
          })
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 发表评论
    userCommentIssue () {
      if (this.commentText === '') {
        this.$Message.error('请输入评论内容')
        return
      }
      this.$api.userCommentIssue({
        id: this.id, // 资讯消息的ID
        content: this.commentText, // 评论内容
        type: this.commentType // 消息面: 1-利好, 2-利空
      }).then(res => {
        if (res.code === '000000') {
          this.newsDetails()
          this.newsCommentList()
          this.commentText = ''
          this.$Message.success(res.messageZh)
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    },
    // 点赞评论
    userCommentLiked (id, isLiked = false) {
      if (isLiked) return this.$Message.error('您已经点过赞喽~')
      this.$api.userCommentLiked({
        id // 评论id
      }).then(res => {
        if (res.code === '000000') {
          this.newsCommentList()
          this.$Message.success(res.messageZh)
          console.log('发表评论')
        } else {
          this.$Message.error(res.messageZh)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.news-detail-content{
  img{
    max-width: 100%;
    height: 100%;
    display: block;
    margin: 15px auto;
  }
}
</style>
<style scoped lang="scss">
.home{
  padding-bottom: 80px;
  &-body{
    width: 890px;
  }

  &-module{
    width: 270px;
    background: #FFF;
  }

  // 资讯详情
  .news-detail{
    background: #FFF;
    padding: 36px 40px;
    &-title{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
      font-size: 36px;
      letter-spacing: 2px;
      height: 50px;
      line-height: 50px;
    }
    &-source{
      font-size: 13px;
      color: #B0BCCA;
      letter-spacing: 0.43px;
      height: 18px;
      line-height: 18px;
    }
    &-line{
      margin-top: 20px;
      font-size: 16px;
      color: #5D6576;
      &.image{
        margin: 40px 0;
        border-radius: 5px;
        width: 100%;
        height: 240px;
        background: #CCC;
      }
    }
  }

  // 资讯评论
  .news-comments{
    background: #FFF;
    padding: 40px 0 20px;
    &-input{
      width: 780px;
      margin: 0 auto 40px;
      &-body{
        padding: 24px 20px;
        background: #FAFAFA;
        border: 1px solid #E5EBF0;
        border-radius: 3px;
      }
    }
    &-body{
      padding: 24px 40px;
      border-top: 1px solid #F3F3F3;
    }
    &-pager{
      height: 20px;
      line-height: 20px;
      position: relative;
      margin-top: 20px;
      text-align: center;
      &-btn{
        position: absolute;
        right: 0;
        top: 0;
        box-shadow: none;
      }
    }

    &-tabs{
      display: flex;
      align-items: center;
      &-item{
        position: relative;
        font-size: 16px;
        color: #5D6576;
        letter-spacing: 0;
        transition: .3s all linear;
        cursor: pointer;
        &::after{
          position: absolute;
          bottom: -4px;
          left: 50%;
          content: ' ';
          background-image: linear-gradient(90deg, #54A6FF 0%, #407FFF 100%);
          border-radius: 4px;
          border-radius: 4px;
          width: 0;
          height: 6px;
          transform: scale(0.5) translateX(-50%);
          transform-origin: left bottom;
          transition: .3s all linear;
        }
        &.active{
          color: #407FFF;
          &::after{
            width: 56px;
          }
        }
      }
      .news-comments-tabs-item + .news-comments-tabs-item{
        margin-left: 66px;
      }
    }
    // 评论列表
    &-list{
      margin-top: 20px;
      &-item{
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f3f3f3;
        &-logo{
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          background: #f66;
          &__img{
            width: 100%;
            height: 100%;
          }
        }
        &-content{
          margin-left: 20px;
          flex: 1;
          &__title{
            font-weight: bold;
            height: 22px;
            line-height: 22px;
            font-size: 16px;
          }
          &__detail{
            position: relative;
            text-align: justify;
            word-break: break-all;
            margin-top: 7px;
            font-size: 14px;
            color: #5D6576;
            line-height: 20px;
            overflow: hidden;
            &.maxheight {
              max-height: 200px;
            }
            &-showmore{
              position: absolute;
              left: 0;
              bottom: 0;
              text-align: center;
              line-height: 40px;
              font-size: 20px;
              width: 100%;
              background-image: linear-gradient(transparent, #FFF);
              height: 60px;
              line-height: 95px;
              font-size: 16px;
              cursor: pointer;
            }
          }
          &__footer{
            display: flex;
            margin-top: 8px;
            font-size: 14px;
            justify-content: space-between;
            color: #B0BCCA;
            &-liked{
              cursor: pointer;
              display: flex;
              align-items: center;
              &.like{
                color: #3185f2;
              }
            }
          }
        }
      }
    }
  }

  // 相关资讯
  .relevance-info{
    margin-top: 40px;
    &-title{
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      color: #121317;
    }
    &-list{
      margin-top: 20px;
      display: flex;
      &-item{
        cursor: pointer;
        background: #FFF;
        width: 200px;
        height: 196px;
        border-radius: 4px;
        overflow: hidden;
        &-header{
          width: 100%;
          height: 120px;
          background: #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &-body{
          word-break: break-all;
          width: 100%;
          height: 76px;
          padding: 20px 18px;
          line-height: 20px;
          font-size: 14px;
          &__title{
            max-height: 40px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .relevance-info-list-item + .relevance-info-list-item{
        margin-left: 20px;
      }
    }
  }

  .run-chart{
    background: #FFF;
    margin-top: 40px;
    width: 100%;
    height: 576px;
  }
}

.pre-style{
  white-space: pre-wrap!important;
  word-wrap: break-word!important;
  *white-space:normal!important;
}

</style>

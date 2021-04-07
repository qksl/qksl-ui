import Base from './base'
import Store from '@/module/store'
/**
 * 用户操作模块
 * http://47.111.109.21:12010/swagger-ui.html
 */
class Api extends Base {
  // 通过手机号获取验证码
  userMobileCode (data) {
    return this.post('/user/send/code', data)
  }

  // 通过手机号登录
  userMobileLogin (data) {
    return this.post('/user/fast/login', data)
  }
  // 通过邮箱获取验证码接口
  userEmailCode (data) {
    return this.post('/user/send/code', data)
  }

  // 校验验证码接口
  userEmailCodeValidation (data) {
    return this.post('/user/email/codeValidation', data)
  }

  // 邮箱登录
  userEmailLogin (data) {
    this.Authorization = ''
    Store.dispatch('resetUserInfo')
    return this.post('/user/password/login', data)
  }

  // 邮箱注册
  userEmailRegistry (data) {
    return this.post('/user/registry', data)
  }

  // 获取用户列表, 需要管理员权限
  userList (data) {
    return this.get('/user/list', data)
  }

  // 获取用户列表, 需要管理员权限
  userCurrent (data) {
    return this.get('/user/current', data)
  }

  // 修改用户密码
  userModifyPassword (data) {
    return this.post('/user/modify/password', data)
  }

  // 用户修改基本信息
  userModifyInfo (data) {
    return this.form('/user/modify/info', data)
  }

  // 禁止,需要管理员权限
  userModifyStatus (data) {
    return this.post('/user/modify/status', data)
  }

  // 修改用户名
  userModifyUsername (data) {
    return this.post('/user/modify/username', data)
  }

  // ============用户评论接口
  // 发布评论
  userCommentIssue (data) {
    return this.post('/user/comment/issue', data)
  }

  // 点赞评论
  userCommentLiked (data) {
    return this.post('/user/comment/liked', data)
  }

  // ============用户评论接口
  // 获取横幅数据
  newsBannerList (data) {
    return this.get('/news/banner/list', data)
  }

  // 查询评论
  newsCommentList (data) {
    // 如果有登录态，就调用用户对应的评论数据
    if (this.Authorization) {
      return this.get('/user/comment/list', data)
    } else {
      return this.get('/news/comment/list', data)
    }
  }

  // 获取资讯详情页
  newsDetails (data) {
    return this.get('/news/details', data)
  }

  // 重大事件
  newsEvent (data) {
    return this.get('/news/event', data)
  }

  // 获取最新资讯
  newsCommentLatest (data) {
    return this.get('/news/latest', data)
  }

  // 查询点赞最多评论
  newscommentMax (data) {
    return this.get('/news/comment/max', data)
  }

  // ============身份验证接口
  // getUser
  authenticationCurrent (data) {
    return this.get('/authentication/current', data)
  }

  // =============预测相关接口
  // 最新预测
  guessQueryLatest (data) {
    return this.get('/guess/query/latest', data)
  }

  // 预测投注变化
  guessQueryLatestById (data) {
    return this.get('/guess/query/latest/byId', data)
  }

  // 查询自己参与的预测
  guessBets (data) {
    return this.get('/guess/bets', data)
  }

  // 参加预测
  guessJoin (data) {
    return this.post('/guess/join', data)
  }

  // 发起一个预测
  guessLaunch (data) {
    return this.post('/guess/launch', data)
  }

  // 查询自己发起的预测
  guessTopic (data) {
    return this.get('/guess/topic', data)
  }

  // ============== 预测获取接口
  // 通过UserId查询用户关联的预测
  guessQueryTopicByUserId (data) {
    return this.get('/guess/query/topic', data)
  }

  // ============== Token操作接口
  // 查询积分
  tokenAmount (data) {
    return this.get('/token/amount', data)
  }

  // ===========测试用接口
  // 关闭预测（截止预测）
  guessClose (data) {
    return this.post('/guess/close', data)
  }

  // 结算 就是一个预测到了结算时间后，结算参与者的输赢
  guessSettlement (data) {
    return this.post('/guess/settlement', data)
  }

  // =========== 任务相关
  // 获取任务列表
  taskList (data) {
    return this.get('/task/list', data)
  }

  // 领取奖励
  taskAwards (data) {
    return this.post('/task/awards', data)
  }

  // ============ 恐慌值相关
  // 获取最新恐慌值
  fearLatest (data) {
    return this.get('/fear/latest', data)
  }

  // ============ 市场行情接口
  // 市场情况
  quotesMarketInfo (data) {
    return this.get('/quotes/market/info', data)
  }

  // 获取涨跌分布数据
  quotesMarketDisb (data) {
    return this.get('/quotes/market/disb', data)
  }
}

export default new Api()

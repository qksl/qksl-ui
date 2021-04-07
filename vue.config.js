const VConsolePlugin = require('vconsole-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const plugins = [
  new VConsolePlugin({
    enable: false
  })
]
if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        drop_console: true // DEBUG关闭时，删除console，常用于生产
      },
      output: {
        comments: false // 是否保留部分注释
      }
    }
  }))
}

// externals: {
//   jquery: 'jQuery'
// }

// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import API from './module/API' // 引入API模块
// import store from './store'
// import xss from 'xss' // xss过滤
// import '@/scss/main.scss'
// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

const externals = {}
if (process.env.NODE_ENV === 'production') {
  externals['vue-router'] = 'VueRouter'
  externals['axios'] = 'axios'
  externals['vuex'] = 'Vuex'
  externals['@antv/g2'] = 'G2'
// 'view-design/dist/styles/iview.css': ''
}

module.exports = {
  configureWebpack: {
    externals,
    plugins
  },
  chainWebpack: config => {
    config.resolve.alias.set('_c', path.resolve(__dirname, 'src/components'))

    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].CDN = `
          <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
          <script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
          <script src="https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js"></script>
          <script src="https://gw.alipayobjects.com/os/lib/antv/g2/3.5.11/dist/g2.min.js"></script>
          `
        }
        return args
      })

    // eslint 保存时自动修复异常
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/vars.scss";`
      }
    }
  },
  assetsDir: 'bitnews_static',
  devServer: {
    hot: true,
    proxy: {
      '/v1': {
        target: 'http://47.111.109.21:12010',
        changeOrigin: true
      }
    }
  }
}

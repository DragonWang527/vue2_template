const { defineConfig } = require('@vue/cli-service')
// 处理打包js与css缓存问题
const version = new Date().getTime()
// 环境变量
const env = process.env.VUE_APP_MODE
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
module.exports = defineConfig({
  // 如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app。
  publicPath: env === 'development' ? './' : '/my-app',
  // 打包输出的目录
  outputDir: env === 'production' ? 'dist' : 'dist-test',
  // 静态资源目录
  assetsDir: 'asstes',
  // 关闭线上源码(根据情况，测试环境打开也行)
  productionSourceMap: false,
  // less全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')]
    }
  },
  // css相关预设配置
  css: {
    loaderOptions: {},
    extract: {
      filename: `asstes/css/[name].${version}.css`,
      chunkFilename: `asstes/css/[name].${version}.css`
    }
    // sass: {
    //   旧版sass-loader写法(8.0以下)
    //   data: `@import "~@/assets/scss/variables.scss";`
    //   新版scss-loader(8.0及以上)
    //   prependData: `@import "~@/assets/scss/variables.scss";`
    // }
  },
  // 外部扩展:使用cdn方式引入的，不用被打包的模块
  // externals: {
  //   'element-ui': 'ELEMENT',
  //    vue: Vue
  //   'vue-router': 'VueRouter'
  // },
  // webpack相关配置
  configureWebpack: {
    // 别名
    resolve: {
      alias: {
        '@/': 'src/'
      }
    },
    // 打包js重命名
    output: {
      filename: `asstes/js/[name].${version}.js`,
      chunkFilename: `asstes/js/[name].${version}.js`
    },
    // 打包优化
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: env === 'production' // 生产去除console
            }
          }
        })
      ]
    }
  },
  // 本地开发代理配置，使用测试数据
  devServer: {
    hot: true,
    port: 8080
    // proxy: {
    //   '/my-app': {
    //     target: process.env.VUE_APP_HOSTNAME,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: { '^/my-app': '/my-app' }
    //   }
    // }
  }
})

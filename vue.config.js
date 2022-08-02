const { defineConfig } = require('@vue/cli-service')
// 处理打包js与css缓存问题
const version = new Date().getTime()
// 环境变量
const is_prod = process.env.NODE_ENV
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
module.exports = defineConfig({
  // 如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app。
  publicPath: is_prod === 'production' ? '/my-app' : './',
  // 打包输出的目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'asstes',
  // 关闭线上源码
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
  },
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
              drop_console: is_prod // 生产去除console
            }
          }
        })
      ]
    }
  },
  // 本地开发配置
  devServer: {
    hot: true,
    port: 8080,
    proxy: {
      '/my-app': {
        target: 'https://www.my-app.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/my-app': '/my-app' }
      }
    }
  }
})

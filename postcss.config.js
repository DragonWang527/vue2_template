module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 37.5, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'],
      exclude: /node_modules/i //这里表示不处理node_modules文件夹下的内容
    })
  ]
}

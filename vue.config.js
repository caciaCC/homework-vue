// vue.config.js
module.exports = {
  // 选项...
  css: {
    loaderOptions: {

      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192
          })
        ]
      }
    },
  },
}

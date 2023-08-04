const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true, //兼容ie
  lintOnSave: false, //es语法检查关闭（否则子组件必须驼峰或连字符）

  //开启8080端口代理服务器并且 转发至目标端口3000（方式一）
  /* devServer: {
    //缺点：只能转发一个代理、不能灵活控制到底走不走代理（优先匹配本地资源，找不到才转发）
    proxy: "http://localhost:3000",
  }, */
  //开启8080端口代理服务器（方式二）
  devServer: {
    //缺点：请求资源时要加/前缀
    proxy: {
      '/demo': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/demo': '' }, //重写
        changeOrigin: false, //缺省为true，用于控制请求头的host值，简而言之是否伪装端口号
        ws: true //支持websocket
      }
    }
  },

  //配置css预处理器less
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});

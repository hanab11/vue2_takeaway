const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true, // 兼容ie
  lintOnSave: false, // es语法检查关闭（否则子组件必须驼峰或连字符）

  // 开启8080端口代理服务器并 转发至目标端口4000（方式二）
  devServer: {
    proxy: {
      '/api': { // 匹配以 /api 开头的请求路径
        target: 'http://localhost:4000', // 接口的基本url
        pathRewrite: { '^/api': '' }, // 重写路径
        changeOrigin: false, // 缺省为true，用于控制请求头的host值，简而言之是否伪装端口号
        ws: true // 支持websocket
      }
    }
  },

  // less-loader6之后
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true, // 解决less定义全局变量问题
        },
      },
    },
  },
  // less-loader6之前
  /* css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  }, */
});

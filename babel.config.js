module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 按需引入mint-ui
  plugins: [
    ["component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
  ]
}

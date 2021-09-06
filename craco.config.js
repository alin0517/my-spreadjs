const CracoAntDesignPlugin = require("craco-antd"); // 按需引入css
const CracoLessPlugin = require("craco-less"); // 自定义样式

module.exports = {
  plugins: [
    // 自定义样式
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { },
            javascriptEnabled: true,
          },
        },
      },
    },
    // 按需引入css
    { plugin: CracoAntDesignPlugin },
  ],
};


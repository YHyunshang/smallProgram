/*
 * @Description: babel.config
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-09-01 15:21:52
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-01 17:39:39
 */

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@utils': './src/utils',
          '@services': './src/services',
          '@components': './src/components',
          '@img': './src/assets/imgs',
          '@const': './src/constants',
          '@theme': './src/theme',
          '@common': './src/common',
        },
      },
    ],
  ],
}

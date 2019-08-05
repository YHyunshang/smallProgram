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
        },
      },
    ],
  ],
}

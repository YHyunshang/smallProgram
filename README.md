## reactNative文档说明和使用
`git-clone后：yh-supermarketapp 修改成 supermarketapp，否则会造成android和ios项目启动问题`
### 项目启动
```
brew install node
brew install watchman
npm install react-native-cli
npm run start 启动服务 
react-native run-ios 开发环境ios
react-native run-android 开发环境android
npm run bundle-ios ios打包
npm run bundle-android android 打包
```
### 注意事项

- `勿用cnpm，否则因路径等问题缺失文件无法启动`
- `独立android启动 设置：export ANDROID_HOME= “你的SDK”`
- `线上服务为 http://localhost:8081/index.bundle?platform= androidh 或者 ios`


### react-native规范

- `请遵守eslint开发规范，务必安装eslint，IDE建议使用vscode`

- 版本支持TypeScript, 如果使用增加开发时间，请合理安排。

- 组件中处理事件（onClick, onChange等）的方法，命名以handler为前缀；只在组件其他方法中调用的方法，命名以_为前缀；反之需要作为props向子元素传递的方法，不需要_；

- 调用组件，如果需要传递多个属性，则分行显示；同理，import一个文件中多个对象时，同样分行显示；

- api接口定义请独立抽离, A.js:处理A页面里面的所有的js请求，B.js：处理B页面的所有请求；以名词+动词形式命名；全部大写，以_为分隔符，如：NAME_GET；

### css class
1. 使用中划线命名法，如：`indicator-text`
2. 公共组件命名规则：`comp__<compName>[__<compElement>]`，如 `comp__panel__tips` 表示 Panel 公用组件的 tips 块

### JS
1. 采用小驼峰命名法，如 `dialogVisible`
2. 对于 Boolean 类型的变量，灵活使用 is、shall、able（如 visible、clickable）等
3. 禁止采用 A、B、C 等不明所以的单词作变量名
4. 事件回调函数加上 'handle' 前缀，如 `handleCurrentRowChange`
5. 导入 src 下的模块时不要使用绝对路径，推荐使用项目中定义的别名 `@`，注意`@`后加`/`，如 '@/public' 编译后为'src/public'
6. 推荐使用 lodash 模块进行对象合并等操作，而非 es6，后者可能有浏览器兼容性问题
7. html 字符串作为变量值时，注意文本的可视化与 html 的结构化，提高阅读性
8. 禁止父组件通过 $refs 直接调用子组件方法、修改数据！


### 目录结构说明
- 项目可选择UI库为： `react-native-element`

```
├─ _test_ # 单元测试地址
├─ android # android项目
├─ bundleApp # 打包后bundle存放位置
├─ components # 公共模块地
├─ images # 图片地址
├─ ios # ios项目
├─ node_modules # 利用npm管理的所有包及其依赖
├─ page # 页面
├─ public # 公共依耐资源
├─ server
	├─ api # 处理各页面接口存放地
	├─ http # http请求封装
├─ App # 首页开发
├─ index # 项目入口
├─ packge.json # 启动配置
```
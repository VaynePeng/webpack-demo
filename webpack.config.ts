const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化
  mode: 'development',
  // 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的
  entry: './main.ts',
  // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中
  output: {
    path: path.resolve(__dirname, './dist'), // 目标输出目录 path 的绝对路径
    filename: 'build.js'
  },
  // loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理
  module: {
    rules: [
      {
        test: /\.ts$/, // 用于标识出应该被对应的 loader 进行转换的某个或某些文件
        use: ['ts-loader'], // 表示进行转换时，应该使用哪个 loader
        // 建议 在 include 和 exclude 中使用绝对路径数组
        // include: [],  // 必定匹配选项
        exclude: [path.resolve(__dirname, './node_modules')] // 必不匹配选项 -- 也可以用正则 /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'], // 从后往前加载
        include: [path.resolve(__dirname, './src')]
      }
    ]
  },
  // loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量
  // 想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html' // 模板地址
    })
  ],
  // 解析
  resolve: {
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
    // 自动解析确定的扩展, 能够使用户在引入模块时不带扩展
    extensions: ['.js', 'jsx', '.json', '.ts', '.tsx']
  }
}

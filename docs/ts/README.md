# 创建项目
1.初始化一个项目
```sh
npm init --y
```
2.安装typescript,可以使用tsc命令
```sh
npm i typescript -D
```

```tip 查看帮助
tsc -h
tsc有很多配置项,那么这些配置项大部分可以通过一个配置文件来实现   
```

4.创建配置项
```sh
tsc --init
```
tsconfig.json
里面有很多配置，后面有注释

5.新建一个index.ts执行
```sh
tsc ./src/index.ts
```

6.构建工具webpack,为了我们的项目跑起来，安装webpack时，也会自动安装node
安装
webpack webpack-cli webpack-dev-serve
webpack要区别开发环境和生产环境，因为两个环境的配置不一样，做不同的事情，为了工程的可维护性，我们可以把生产环境和开发环境和公共环境的配置分开来书写,最后通过插件来合并
7.build存在打包后的文件
```text
.
├── build
│   ├── webpack.base.config.js  // 公共环境的配置
│   ├── webpack.config.js // 所有配置文件的入口
│   ├── webpack.dev.config.js // 开发环境的配置
│   └── webpack.pro.config.js // 生产环境的配置
├── index.js
├── index.ts
├── package-lock.json
├── package.json
└── tsconfig.json

```

#### (1)先看公共环境的配置webpack.base.config.js
```js
// 公共环境的配置
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.ts', // 入口文件
    output: {
        filename: 'app.js' // 配置输出,输出的目录用默认的dist,文件名app.js
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'] // 指定三个扩展名
    },
    module: { // 引入新的文件类型ts,安装相应的loader,选ts-loader
        rules: [
            {
                test: /\.tsx?$/i, // 正则匹配.ts或是.tsx结尾的文件
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/ // 排除一下node_modules下的文件
            }
        ],
    },
    // 这里之前写到了module里面一直报错
    plugins: [ // 通过一个模板帮助生成网站的首页，而且帮助我们把输出文件自动嵌入到这个文件中
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html'
        })
    ]
}
```

```details
引入新的文件类型ts,安装相应的loader,选ts-loader,安装ts-loader,
内部还需要安装 typescript
通过一个模板帮助生成网站的首页，而且帮助我们把输出文件自动嵌入到这个文件中:安装插件html-webpack-plugin
````


#### (2)开发环境的配置webpack.dev.config.js
```tip
module.exports = {
    devtool: 'eval-cheap-module-source-map' // 开启source-map,官网推荐,
    // cheap: source-map要忽略文件的列信息，因为我们在调试的时候，列信息是没有用的。
    // module: 会定位到ts源码，而不是经过node转译后的js源码，
    // eval-source-map: 会将source-map以data_url的形式打包到文件中，他的重编译速度是很快的，所以不必担心性能问题
}
```

#### (3)生产环境的配置
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    plugins: [
        // 每次构建成功后，清空dist目录，避免缓存，需要文件后加入hash，在多次构建后，会产生很多无用文件。
        // 帮我们清空dist目录
        new CleanWebpackPlugin()
    ]
}
```



#### (4)所有文件的入口，合并一下环境文件webpack.config.js 
webpack的配置已经完成
```js
// 所有文件的入口
// 把两个文件合并
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};

```

#### (5)修改npm脚本, package.json  
```js
{
    "main": "./src/main.js", // 更改入口
    "script": {
        // 启动命令
        "start": "webpack-dev-serve --mode=development --config ./build/webpack.config.js"
        // 用webpack-dev-serve启动
        // --mode=development将当前环境变量设定为development
        // --config ./build/webpack.config.js指定配置文件
        "build": "webpack --mode=development --config ./build/webpack.config.js"
    }
}
```



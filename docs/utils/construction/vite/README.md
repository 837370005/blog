# vite

### 搭建第一个 Vite 项目
```js
npm create vite@latest
```
你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:
```js
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

已安装了vite
```js
# npm 6.x
$ npm init vite@latest my-vue-app --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest my-vue-app -- --template vue
```

```js
$ cd my-vue-app
$ npm install
$ npm run dev

```
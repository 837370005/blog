# Markdown 里面的树状目录

```text
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json

```

在mac上，安装tree
```yaml
brew install tree
```
常用命令
tree -a 显示所有
tree -d 显示文件夹
tree -L n 显示项目的层级，n代表层级
tree -I "node_modules" 用于过滤不想要显示的文件或文件夹
tree > tree.md将项目结构输出到tree.md这个文档
tree -N 防止中文乱码
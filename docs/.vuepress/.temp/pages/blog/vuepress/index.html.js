export const data = {
  "key": "v-47cde344",
  "path": "/blog/vuepress/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "快速搭建博客",
      "slug": "快速搭建博客",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1645674826000,
    "contributors": [
      {
        "name": "zhailiqiong",
        "email": "zhailiqiong@123.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "blog/vuepress/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

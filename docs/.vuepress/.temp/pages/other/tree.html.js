export const data = {
  "key": "v-3baaaba3",
  "path": "/other/tree.html",
  "title": "Markdown 里面的树状目录",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
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
  "filePathRelative": "other/tree.md"
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

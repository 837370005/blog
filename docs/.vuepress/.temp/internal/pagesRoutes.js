import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"hll00"},["/index.html","/README.md"]],
  ["v-2d0a9a6d","/js/",{"title":""},["/js/index.html","/js/README.md"]],
  ["v-2d0abff7","/ts/",{"title":"创建项目"},["/ts/index.html","/ts/README.md"]],
  ["v-f726e524","/ts/checkType.html",{"title":"类型检查"},["/ts/checkType","/ts/checkType.md"]],
  ["v-1e8b3998","/ts/class.html",{"title":"类"},["/ts/class","/ts/class.md"]],
  ["v-5205f4fa","/ts/fanType.html",{"title":"泛型"},["/ts/fanType","/ts/fanType.md"]],
  ["v-0448ecc0","/ts/fnType.html",{"title":"函数类型接口"},["/ts/fnType","/ts/fnType.md"]],
  ["v-9c2f9a12","/ts/interface.html",{"title":"对象类型接口"},["/ts/interface","/ts/interface.md"]],
  ["v-78b56bc8","/ts/type.html",{"title":"typeScript的类型"},["/ts/type","/ts/type.md"]],
  ["v-3baaaba3","/other/tree.html",{"title":"Markdown 里面的树状目录"},["/other/tree","/other/tree.md"]],
  ["v-47cde344","/blog/vuepress/",{"title":""},["/blog/vuepress/index.html","/blog/vuepress/README.md"]],
  ["v-592715e7","/blog/vuepress/setting.html",{"title":""},["/blog/vuepress/setting","/blog/vuepress/setting.md"]],
  ["v-6e802fbc","/other/tree/tree.html",{"title":"Markdown 里面的树状目录"},["/other/tree/tree","/other/tree/tree.md"]],
  ["v-3d7e007d","/other/blog/vuepress/",{"title":""},["/other/blog/vuepress/index.html","/other/blog/vuepress/README.md"]],
  ["v-fae25cf4","/other/blog/vuepress/setting.html",{"title":""},["/other/blog/vuepress/setting","/other/blog/vuepress/setting.md"]],
  ["v-7e54f869","/utils/construction/webpack/",{"title":"Webpack"},["/utils/construction/webpack/index.html","/utils/construction/webpack/README.md"]],
  ["v-3d1277a4","/utils/construction/vite/",{"title":"vite"},["/utils/construction/vite/index.html","/utils/construction/vite/README.md"]],
  ["v-1f8ea521","/utils/install/homebrew/install.html",{"title":"安装homebrew"},["/utils/install/homebrew/install","/utils/install/homebrew/install.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)

import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"hll00"},["/index.html","/README.md"]],
  ["v-3baaaba3","/other/tree.html",{"title":"Markdown 里面的树状目录"},["/other/tree","/other/tree.md"]],
  ["v-47cde344","/blog/vuepress/",{"title":""},["/blog/vuepress/index.html","/blog/vuepress/README.md"]],
  ["v-592715e7","/blog/vuepress/setting.html",{"title":""},["/blog/vuepress/setting","/blog/vuepress/setting.md"]],
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

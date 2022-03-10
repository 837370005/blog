
module.exports = {
<<<<<<< HEAD
    themeConfig:{
      title: "Ella",
      description:"vuepress搭建的个人博客",
      logo:"/element3.svg",
      base: '/blog/',
      navbar:[
        {
          link:"/",
          text:"首页"
        },{
          link:"/blog/vuepress",
          text:"博客"
        },
      ],

    sidebar:[
        {
          text:'安装',
          link:'/blog/vuepress/'
        },
        {
          text:'配置',
          link:'/blog/vuepress/setting'
        },
      ]
  
=======
    title: "Ella",
    keywords: "前端开发",
    description: "vuepress搭建的个人博客",
    repo: "https://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@github.com/837370005/blog.git",
    base: '/blog/',
    head: [
        ['link',
            {
                rel: 'icon', href: '/favicon.ico'
            }
        ]
    ],
    lastUpdated: 'Last Updated',
    themeConfig: {
        logo: "/element3.svg",
        navbar: [
            {
                link: "/",
                text:"首页"
            },
            {
                link: "/js",
                text: "JS"
            },
            {
                link: "/ts",
                text: "ts"
            },
            {
                link: "/utils/construction/webpack",
                text: "工具",
            },
            {
                link: "/blog/",
                text: "其它"
            },
        ],
        sidebar:[
            {
                text: '首页',
                link: '/'
            },
            {
                text: '工具',
                children: [
                    '/utils/construction/vite',
                    '/utils/construction/webpack'
                ]
            }
        ]
>>>>>>> 327850a (项目的的建立)
    }
  }
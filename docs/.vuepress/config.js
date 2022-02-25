
module.exports = {
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
  
    }
  }
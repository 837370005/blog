
module.exports = {
    themeConfig:{
      title:"Element3",
      description:"vuepress搭建的Element3文档",
      logo:"/element3.svg",
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
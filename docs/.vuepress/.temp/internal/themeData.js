export const themeData = {
  "logo": "/element3.svg",
  "navbar": [
    {
      "link": "/",
      "text": "首页"
    },
    {
      "link": "/js",
      "text": "JS"
    },
    {
      "link": "/ts",
      "text": "ts"
    },
    {
      "link": "/utils/construction/webpack",
      "text": "工具"
    },
    {
      "link": "/blog/",
      "text": "其它"
    }
  ],
  "sidebar": [
    {
      "text": "首页",
      "link": "/"
    },
    {
      "text": "工具",
      "children": [
        "/utils/construction/vite",
        "/utils/construction/webpack",
        "/utils/install/homebrew/install"
      ]
    }
  ],
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}

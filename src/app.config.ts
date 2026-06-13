export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/test-list/index',
    'pages/test-detail/index',
    'pages/quiz/index',
    'pages/result/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '心测研究所',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f5f7fa'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#0f8d83',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/test-list/index',
        text: '测试'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})

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
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f7efe2',
    navigationBarTitleText: '心测研究所',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f7efe2'
  },
  tabBar: {
    color: '#6b665b',
    selectedColor: '#275241',
    backgroundColor: '#fffaf0',
    borderStyle: 'white',
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

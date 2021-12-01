const {getDirFiles} = require('./tools')
module.exports = {
  title: 'Hello my friend!',
  description: 'Welcome to my blog site',
  themeConfig: {
    lastUpdated: 'Last Updated',
    head: [
      ['link', { rel: 'icon', href: `/icon.png` }],
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端', link: '/fe/js/curry' },
      { text: '后端', link: '/rd/tomcat' },
      { text: '网络', link: '/net/http/http' },
      { text: '工具软件', link: '/software/iterm2' },
      { text: 'GitHub', link: 'https://github.com/sunweilibo/blog' },
    ],
    sidebar: {
      '/fe/': getDirFiles('fe'),
      '/rd/': getDirFiles('rd'),
      '/net/': getDirFiles('net'),
      '/software/': getDirFiles('software')
    },
    dest: './docs/.vuepress/dist',
    ga: '',
    evergreen: true,
    plugins: [
      ['@vuepress/back-to-top', true],
      ['@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: true
      }],
      ['@vuepress/medium-zoom', true],
      ['container', {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      }],
      ['container', {
        type: 'upgrade',
        before: info => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      }],
    ],
  }
}
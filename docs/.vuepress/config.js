const FeNav = require('./fe.js');
const RdNav = require('./rd.js');
const NetNav = require('./net.js');
const SoftwareNav = require('./software.js');
module.exports = {

  title: 'Hello my friend!',
  description: 'Welcome to my blog site',
  themeConfig: {
    head: [
      ['link', { rel: 'icon', href: `/icon.png` }],
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端', link: '/fe/jsExtend' },
      { text: '后端', link: '/rd/' },
      { text: '网络', link: '/net/' },
      { text: '工具软件', link: '/software/md' },
      { text: 'GitHub', link: 'https://github.com/sunweilibo/blog' },
    ],
    sidebar: {
      '/fe/': FeNav,
      '/rd/': RdNav,
      '/net/': NetNav,
      '/software/': SoftwareNav,
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
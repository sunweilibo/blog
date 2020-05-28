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
      { text: 'GitHub', link: 'https://github.com/sunweilibo/blog' },
    ],
    sidebar: {
      '/fe/': [
        {
          title: '基础',
          children: [
            'jsExtend',
          ]
        },
        {
          title: '框架',
          children: [
            'frame'
          ]
        },
        {
          title: 'CSS',
          children: [
            'px2rem'
          ]
        }
      ],
      '/rd/': [
        {
          title: '后端',
          children: [
            'test'
          ]
        }
      ],
      '/net/': [
        {
          title: '浏览器',
          children: [
            'browser/',
          ]
        },
        {
          title: 'HTTP',
          children: [
            'http/http',
            'http/http1.x',
            'http/http2',
            'http/compare',
          ]
        },
        {
          title: 'NGNIX',
          children: [
            'nginx/nginx-basic',
            'nginx/nginx-cmd',
            'nginx/nginx-basic-config',
            'nginx/nginx-trans-config',
            'nginx/nginx-application',
            'nginx/nginx-varias',
          ]
        }
      ]
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
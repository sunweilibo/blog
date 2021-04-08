const {getFiles} = require('./tools')
module.exports = [
  {
    title: '浏览器',
    children: [
      'browser/',
    ]
  },
  {
    title: 'HTTP',
    children: getFiles('http/', '../net/http')
  },
  {
    title: 'NGNIX',
    children: getFiles('nginx/', '../net/nginx')
  }
]
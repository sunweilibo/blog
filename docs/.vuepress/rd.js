const {getFiles} = require('./tools')
module.exports = [
  {
    title: '后端',
    children: getFiles('', '../rd')
  }
]
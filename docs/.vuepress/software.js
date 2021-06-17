const {getFiles} = require('./tools')
module.exports = [
  'md',
  'iterm2',
  {
    title: 'Git',
    children: getFiles('git/', '../software/git')

  }
]
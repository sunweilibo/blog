const {getFiles} = require('./tools')
module.exports = [
  {
    title: 'JS',
    children: getFiles('js/', '../fe/js')
  },
  {
    title: '框架',
    children: getFiles('frame/', '../fe/frame')
  },
  {
    title: 'CSS',
    children: getFiles('css/', '../fe/css')
  },
  {
    title: 'WebGL',
    children: getFiles('webgl/', '../fe/webgl')
  }
]
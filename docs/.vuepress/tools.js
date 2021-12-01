const fs = require('fs')
const path = require('path')
const _ = require('lodash')
function getFiles(prefix, filePath) {
  const readPath = path.join(__dirname, filePath)
  const files = fs.readdirSync(readPath).filter(file => file.endsWith('.md'))
  const res = files.map(file => prefix + file.split('.')[0])
  return res
}

function getDirFiles(dir) {
  const dirPath = path.join(__dirname, `../${dir}`)
  const files = fs.readdirSync(dirPath, {withFileTypes: true}).filter(item => item.name !== 'img')
  console.log("🚀 ~ file: tools.js ~ line 14 ~ getDirFiles ~ files", files)
  const res = []
  files.forEach(item => {
    if (item.isDirectory()) {
      res.push({
        title: _.capitalize(item.name),
        children: getFiles(item.name + '/', `../${dir}/${item.name}`)
      })
    } else {
      res.push(item.name.split('.')[0])
    }
  })
  console.log("🚀 ~ file: tools.js ~ line 27 ~ getDirFiles ~ res", res)
  return res
}
module.exports = {
  getDirFiles
}

const fs = require('fs')
const path = require('path')
function getFiles(prefix, filePath) {
  const readPath = path.join(__dirname, filePath)
  const files = fs.readdirSync(readPath).filter(file => file.endsWith('.md'))
  const res = files.map(file => prefix + file.split('.')[0])
  return res
}
module.exports = {
  getFiles
}

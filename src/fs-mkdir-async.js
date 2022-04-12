/* 
  同步实现 目录创建
*/

const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function AsyncMkdir(dirPath, cb) {
  let parts = dirPath.split('/')
  for(let index = 1; i <= parts.length; i++) {
    let current = parts.slice(0, index).join('/')
    try {
      await access(current)
    } catch (error) {
      await mkdir(current)
    }
  }
  cb && cb()
}

AsyncMkdir('a/b/c', () => {
  console.log('创建成功')
})
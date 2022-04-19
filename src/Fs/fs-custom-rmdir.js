/* 
  异步实现 目录删除
  1 判断当前传入的路径是否为一个文件，是的话直接删除文件即可
  2 如果当前传入的是一个目录，我们需要继续读取目录中的内容，然后再执行删除操作者
  3 将删除行为定义成一个函数，然后通过递归的方式进行复用
  4 将当前的名称拼接成在删除时可使用的路径
*/

const fs = require('fs')
const path = require('path')

function customRmDir(dirPath, cb) {
  // 判断当前 dirPath类型
  fs.stat(dirPath, (err, statObj) => {
    if(statObj.isDirectory()) {
      fs.readdir(dirPath, (err, files) => {
        let dirs = files.map(item => {
          return path.join(dirPath, item)
        })
        let index = 0
        function next() {
          if(index === dirs.length) return fs.rmdir(dirPath, cb)

          let curr = dirs[index++]

          customRmDir(curr, next)
        }
        next()
      })
    } else {
      // 直接删除文件
      fs.unlink(dirPath, cb)
    }
  })
}

customRmDir('add-dir', () => {
  console.log('删除成功')
})
/* 
  fs Api:
    readFile: 从指定文件中读取数据
    writeFile: 向指定文件中写入数据
    appendFile: 追加的方式向指定文件中写入数据
    copyFile: 将某个文件中的数据拷贝至另一文件
    watchFile: 对指定文件进行监控
*/
const fs = require('fs')
const path = require('path')
const dataPath = path.resolve('data.txt')
// readFile
// fs.readFile(dataPath, 'utf-8', (err, data) => {
//   if(!err) {
//     console.log('data===', data)
//   } else {
//     console.log('err===', err)
//   }
// })
// 如果路径不存在，会创建一个新的文件
// 第三个参数可以配置  写入方式、写入权限等
fs.writeFile(dataPath, 'hello world', {
  mode: 438,
  flag: 'r+', // w+ 是清空后写入，r+是在原内容上进行覆盖
  encoding: 'utf-8'
}, (err, data) => {
  if(!err) {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
      console.log('data===', data)
    })
  }
})

fs.appendFile(dataPath, 'append', (err,data) => {
  console.log('append')
})

fs.copyFile(dataPath, 'copy-data.txt', (err,data) => {
  console.log('copyFile')
})

// 监听文件变化
fs.watchFile(dataPath, {interval: 20}, (curr, prev) => {
  // curr 修改之后的文件
  // prev 修改之前的文件
  if(curr.mtime !== prev.mtime) {
    console.log('文件被修改了')
    fs.unwatchFile(dataPath)
  }
})
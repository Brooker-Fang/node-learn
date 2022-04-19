// 自定义拷贝实现

const fs = require('fs')

const buf = Buffer.alloc(20)

// 流程：
// 打开指定文件
// fs.open('data.txt', 'r', (err, rfd) => {
//   // 打开要写入的文件
//   fs.open('b.txt', 'w', (err, wfd) => {
//   // 从打开的文件 读取数据 到Buffer缓冲区
//     fs.read(rfd, buf, 0, 20, 0, (err, readBytes, buffer) => {
//         // 从Buffer缓存区 写入数据到打开的文件
//       fs.write(wfd, buf, 0, 20, 0, (err, written) => {
//         console.log('写入成功')
//         fs.close(rfd)
//          fs.close(wfd)
//       })
//     })
//   })
// })

/* 
  完全拷贝
*/

const BUFFER_SIZE = buf.length
let readOffset = 0
fs.open('data.txt', 'r', (err, rfd) => {
  // 打开要写入的文件
  fs.open('b.txt', 'w', (err, wfd) => {
    function next() {
      fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes, buffer) => {
        if(!readBytes) {
          // readBytes为0, 说明内容已经全部读取完
          console.log('写入成功')
          fs.close(rfd)
          fs.close(wfd)
          return
        }
        readOffset += readBytes
        fs.write(wfd, buf, 0, readBytes, (err, written) => {
          next()
        })
      })
    }
    next()
  })
})
// 大文件读写操作
const fs = require('fs')

// read: 所谓的读操作就是将数据从磁盘文件中写入到buffer中
let buf = Buffer.alloc(10)

/* 
  读取操作
  fs.read参数:
    fd: 定位当前被打开的文件
    buf: 用于表示当前缓冲区
    offset: 表示当前从buf 的那个位置开始执行写入
    length: 表示当前次写入的长度
    position：表示当前从文件的那个位置开始读取
*/
fs.open('data.txt', 'r', (err, fd) => {
  console.log(fd)
  fs.read(fd, buf, 0 ,3 ,0, (err, readBytes, data) => {
    console.log(readBytes)
    console.log(data)
  })
})
/* 
  写操作
  fs.write
*/

buf = Buffer.from('1234567890')
fs.open('b.txt', 'w', (err, fd) => {
  fs.write(fd, buf, 0, 3, 0, (err, written, buffer) => {
    console.log(written)
    console.log(buffer)
    console.log(buffer.toString())
    fs.close()
  })
})
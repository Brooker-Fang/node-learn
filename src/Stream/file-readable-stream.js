/* 
  文件可读流的创建和消费
*/
const fs = require('fs')

let rs = fs.createReadStream('test.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3, // 读取到文件的那个位置结束
  highWaterMark: 4 // 每次读多少字节到缓存区
})
/* 
  流动模式：
    可以通过pause 暂停，resume恢复到流动状态

*/
/* rs.on('data', (chunk) => {
  console.log(chunk.toString())
  rs.pause()
  setTimeout(() => {
    rs.resume()
  }, 1000)
}) */

/* 
  暂停模式
*/
// rs.on('readable', () => {
//   let data
//   // read: 每次从缓存区读多少字节出来
//   while((data = rs.read(1)) !== null) {
//     console.log(data.toString())
//     console.log('----', rs._readableState.length) // 缓存区还剩多少字节
//   }
// })

rs.on('open', (fd) => {
  console.log('文件打开了')
})
let buff = []
rs.on('data', (chunk) => {
  buff.push(chunk.toString())
})
// 等到可读流的数据全部读出，会依次触发 end => close事件
rs.on('end', () => {
  console.log(buff.join(''))
  console.log('文件清空了')
})
rs.on('close', (fd) => {
  console.log('文件关闭了')
})
rs.on('error', (err) => {
  console.log(err)
})
/* 
  文件可写流
*/
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt', {
  flags: 'w',
  encoding: 'utf-8',
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  highWaterMark: 4 // 每次写多少字节到缓存区
})

let buf = Buffer.from('write')
// 只能是string 或者buffer类型
// ws.write(buf, () => {
//   console.log('write success')
// })

ws.on('open', (fd) => {
  console.log('文件打开了')
})

ws.write(buf)
ws.on('close', () => {
  console.log('CLOSE')
})
ws.end('end111', () => {
  console.log('end')
})

ws.on('error', (err) => {
  console.log(err)
})
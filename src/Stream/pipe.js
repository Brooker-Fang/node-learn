/* 
  pipe管道：其实是 可读流可写流 操作流的 语法糖
*/

const fs = require('fs')

let rs = fs.createReadStream('test.txt', {
  highWaterMark: 4
})
let ws = fs.createWriteStream('t1.txt', {
  highWaterMark: 1
})

// let flag = true
// rs.on('data', (chunk) => {
//   flag = ws.write(chunk, () => {
//     console.log('写入了')
//   })
//   // 如果flag为false，改为暂停模式
//   if(!flag) {
//     rs.pause()
//   }
// })
// ws.on('drain', () => {
//   rs.resume()
// })

// pipe即实现上面的操作语法糖
rs.pipe(ws)
/* 
  可写流 write方法的执行流程
    当第一次调用write方法时，是将数据直接写入到文件中
    第二次开始write方法就是将数据写入至 可写流的缓存区中
    读取速度和写入速度是不一样，一般读取速度 比 写入速度快很多
    （读取速度即 从生产数据到 可写流缓存区中的输入速度，写入速度即 从可写流缓存区 到目标文件的输出速度）
    当flag为false时，即当前的写入速度已经跟不上读取速度了，即写入的字节>= highWaterMark（即缓存区设置的大小值），此时应该将可读流的模块修改为暂停模式
    当数据生产者暂停之后，消费者会慢慢消化它内部缓存中的数据，直到可以再次被执行写入操作。
    当缓冲区可以继续写入数据时，就会触发drain事件
*/
const fs = require('fs')

// let ws = fs.createWriteStream('./test.txt', {
//   highWaterMark: 3
// })

// let flag = ws.write('1')
// console.log(flag)

// flag = ws.write('2')
// console.log(flag)

// // 当写入字节 > highWaterMark 时返回false
// flag = ws.write('3')
// console.log(flag)

// // 只有当flag为false 时，才会触发drain事件
// ws.on('drain', () => {
//   console.log('drain')
// })


let rs = fs.createReadStream('test.txt', {
  highWaterMark: 4
})
let ws = fs.createWriteStream('t1.txt', {
  highWaterMark: 1
})

let flag = true
rs.on('data', (chunk) => {
  flag = ws.write(chunk, () => {
    console.log('写入了')
  })
  // 如果flag为false，改为暂停模式
  if(!flag) {
    rs.pause()
  }
})
ws.on('drain', () => {
  rs.resume()
})


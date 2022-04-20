/* 
  通过drain控制写入速度
*/

const fs = require('fs')

let ws = fs.createWriteStream('./test.txt', {
  highWaterMark: 3
})
let source = "为恶趣味全文盾吉安市的获取我等会".split('')
console.log(source)
let num = 0
let flag = true

function executeWrite() {
  while(num !== source.length-1 && flag) {
    flag = ws.write(source[num])
    num++
  }
}

executeWrite()
ws.on('drain', () => {
  flag = true
  console.log('drain')
  executeWrite()
})
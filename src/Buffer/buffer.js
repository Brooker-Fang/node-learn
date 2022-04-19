/* 
  Buffer创建：
    alloc: 创建指定字节大小的buffer
    allocUnsafe：创建指定大小的buffer（不安全）
    from：接收参数，创建buffer
*/
const b1 = Buffer.alloc(3) // <Buffer 00 00 00>
console.log(b1)
const b2 = Buffer.allocUnsafe(3)

const b3 = Buffer.from('3', 'utf-8')
const b4 = Buffer.from(['3', 1])
const b5 = Buffer.from(b1) // 可以通过根据其他的buffer 来创建新的buffer

console.log(b3)
console.log(b4)
console.log(b5)

/* 
  Buffer实例方法：
    fill：使用数据填充满buffer
    write：向buffer中写入数据
    toString：从buffer中提取数据
    slice：截取buffer
    indexOf：在buffer中查找数据
    copy：拷贝buffer中的数据
*/
// fill: 
// const buf = Buffer.alloc(6) // <Buffer 00 00 00 00 00 00>

// // buf.fill('123') // 123123
// // buf.fill('123', 1) // 空格12312 第二个参数指定从buffer的第几位开始填充
// buf.fill('123', 1,5) // 从buffer的第一位填充到第四位 
// console.log(buf)
// console.log(buf.toString())

// write: 没有填充效果
const buf = Buffer.alloc(6) // <Buffer 00 00 00 00 00 00>

buf.write('123456', 1, 4) // 1234 第三个参数是写入长度
console.log(buf)
console.log(buf.toString())

// indexOf(find, start)

/* 
  Buffer静态方法
    concat：将多个buffer拼接成一个新的buffer、
    isBuffer：判断当前数据是否为buffer

*/

const buf1 = Buffer.from('哇')
const buf2 = Buffer.from('哈哈')
const buf3 = Buffer.concat([buf1, buf2])
console.log(buf3)
console.log(buf3.toString())

/* 
  自定义Buffer slpit方法（buffer自身没有实现）
*/
ArrayBuffer.prototype.split = function(sep) {
  let len = Buffer.from(sep).length
  let ret = []
  let start = 0
  let offset = 0

  while(offset = this.indexOf(sep, start) !== -1) {
    if(offset !== 0) {
      ret.push(this.slice(start, offset))
    }
    start = offset + len
  }
  ret.push(this.slice(start))
  return ret
}

let buf4 = 'abcdaqwerang'
let bufArr = buf4.split('a')
console.log(bufArr)
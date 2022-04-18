const {Readable} = require('stream')
/* 
  Readable：可读流
    可读流以两种模式之一有效地运行：流动和暂停：
      在流动模式下，数据会自动从底层系统读取，并通过 EventEmitter 接口使用事件尽快提供给应用程序。
      在暂停模式下，必须显式调用 stream.read() 方法以从流中读取数据块

*/
let source = ['aa', 'bb', 'vv']

/* 
  自定义可读流实现
    1、类继承 Readable 
    2、重写_read方法
*/
class MyReadable extends Readable {
  constructor(source) {
    super()
    this.source = source
  }
  _read() {
    let data = this.source.shift() || null
    this.push(data)
  }
}

let myRead = new MyReadable(source)
// 暂停模式读取可读流
// myRead.on('readable', () => {
//   let data = null
//   while((data = myRead.read()) !== null) {
//     data && console.log(data.toString())
//   }
// })
// 流动模式读取可读流
myRead.on('data', (chunk) => {
  console.log(chunk.toString())
})
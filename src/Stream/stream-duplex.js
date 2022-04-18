const {Duplex} = require('stream')
/* 
  Duplex: 双工流

*/
/* 
  自定义双工流实现
    1、类继承 Duplex
    2、重写_read 和 _write 方法
*/
class MyDuplex extends Readable {
  constructor(source) {
    super()
    this.source = source
  }
  _read() {
    let data = this.source.shift() || null
    this.push(data)
  }
  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + '<---')
    process.nextTick(done)
  }
}

let source = ['aa', 'bb', 'vv']
let myDuplex = new MyDuplex(source)
// myDuplex.on('data', (chunk) => {
//   console.log(chunk.toString())
// })

myDuplex.write('1111', () => {
  console.log('end')
})
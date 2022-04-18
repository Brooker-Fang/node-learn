const {Writable} = require('stream')

/* 
  自定义可读流实现
    1、类继承 Writable
    2、重写_write方法
*/
class MyWriteable extends Writable{
  constructor() {
    super()
  }
  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + '<---')
    process.nextTick(done)
  }
}

let myWriteable = new MyWriteable()

myWriteable.write('1111', 'utf-8', () => {
  console.log('end')
})
const {Transform} = require('stream')
/* 
  Transform: 转换流

*/
/* 
  自定义 转换流实现
    1、类继承 Transform
    2、重写_transform 方法
*/
class MyTransform extends Transform{
  constructor() {
    super()
  }
  _transform(chunk, en, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  }
}
let t = new MyTransform()
t.write('a')
t.on('data', (chunk) => {
  console.log(chunk.toString())
})
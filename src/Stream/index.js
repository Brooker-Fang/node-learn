/* 
  node中的流： http://nodejs.cn/api/stream.html
  Node.js 中有四种基本的流类型：
    Writable: 可以写入数据的流（例如，fs.createWriteStream()）。
    Readable: 可以从中读取数据的流（例如，fs.createReadStream()）。
    Duplex: Readable 和 Writable 的流（例如，net.Socket）。
    Transform: 可以在写入和读取数据时修改或转换数据的 Duplex 流（例如，zlib.createDeflate()）。
*/

const fs = require('fs')

// 创建一个可读流
let rs = fs.createReadStream('./test.txt')
// 创建一个可写流
let ws = fs.createWriteStream('./test1.txt')

rs.pipe(ws)
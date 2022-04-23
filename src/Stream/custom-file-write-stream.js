/* 
  模拟文件可写流实现
*/
const fs = require('fs')
const EventEmitter = require('events')
const {Queue} = require('../LinkedList')
class MyFileWriteStream extends EventEmitter{
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || "w"
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || "utf8"
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.open()

    this.writeOffset = this.start
    this.writing = false // 是否正在写入
    this.writeLen = 0
    this.needDrain = false
    this.cache = new Queue()
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if(err) {
        this.emit('error', err)
        return
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }
  write(chunk, encoding, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    this.writeLen += chunk.length
    let flag = this.writeLen < this.highWaterMark
    this.needDrain = !flag
    
    // 是否正在写入
    if(this.writing) {
      // 第二次写入 要放到缓冲区排队
      this.cache.enQueue({chunk, encoding, cb})
    } else {
      // 首次写入
      this.writing = true
      this._write(chunk, encoding, () => {
        cb()
        // 清空排队的内容
        this._clearBuffer()
      })
    }
    
    return flag
  }

  _write(chunk, encoding, cb) {
    if(typeof this.fd !== 'number') {
      return this.once('open', () => {return this._write(chunk, encoding, cb)})
    }
    fs.write(this.fd, chunk, this.start, chunk.length, this.writeOffset, (err, written) => {
      this.writeOffset += written
      this.writeLen -= written
      cb && cb()
    })
  }
  _clearBuffer() {
    let data = this.cache.deQueue()
    if(data) {
      const { element } = data
      const {chunk, encoding, cb} = element
      this._write(chunk, encoding, () => {
        cb && cb()
        // 清空排队的内容
        this._clearBuffer()
      })
    } else {
      if(this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
}

const ws = new MyFileWriteStream('./t1.txt', {
  highWaterMark: 1
})

ws.on('open', (fd) => {
  console.log('open', fd)
})

let flag = ws.write('12', "utf8", () => {
  console.log('write')
})
flag = ws.write('3', "utf8", () => {
  console.log('write')
})
flag = ws.write('4', "utf8", () => {
  console.log('write')
})
flag = ws.write('5', "utf8", () => {
  console.log('write')
})
ws.on('drain', () => {
  console.log('drain')
})
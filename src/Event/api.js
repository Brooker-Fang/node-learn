/* 
  events模块api： 很多核心模块都继承了 events类
*/
const EventEmitter = require('events')
const ev = new EventEmitter()

// on 监听
ev.on('click', () => {
  console.log('click')
})
// emit 触发
ev.emit('click')
// once 触发一次后会移除 对应的事件监听

ev.once('test-once', () => {
  console.log('test-once')
})
ev.emit('test-once')
ev.emit('test-once')

// off 移除监听
const cb = () => {
  console.log('cb')
}
ev.on('test-remove', cb)
ev.off('test-remove', cb)

// 传参

ev.on('params', (a,b) => {
  console.log(a+b)
})
ev.emit('params', 1, 2)
ev.on('params', (...args) => {
  console.log(args)
})
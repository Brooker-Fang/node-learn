/* 
  发布订阅模式
*/

class PubSub{
  constructor() {
    this._events = {}
  }
  subscribe(event, callback) {
    if(this._events[event]) {
      this._events[event].push(callback)
    } else {
      this._events[event] = [callback]
    }
  }

  publish(event, ...args) {
    const events = this._events[event] || []
    events.forEach(function(callback) {
      callback.call(...args)
    })
  }
}
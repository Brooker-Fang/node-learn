/* 
  require 模块加载流程 模拟实现
*/
const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}
Module._extensions = {
  '.js'(module){
    // 读取
    let content = fs.readFileSync(module.id, 'utf-8')

    // 包装
    content = Module.wrapper[0] + content + Module.wrapper[1]
    console.log(content)

    // 通过内置模块vm去执行 代码字符串
    let compileFn = vm.runInThisContext(content)

    // 传入参数
    let exports = module.exports
    let dirname = path.dirname(module.id)
    let filename = module.id

    compileFn.call(exports, exports, myRequire, module, filename,dirname)
  },
  '.json'(module){
    let content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
    module.exports = content
  }
}
Module.wrapper= [
  "(function(exports, require, module, __filename, __dirname){", 
  "})"
]
  
Module._cache = {}
Module.prototype.load = function() {
  let extname = path.extname(this.id)
  Module._extensions[extname](this)
}
Module._resolveFilename = function (filename) {
  // 用path 将filename 转为绝对路径
  let absPath = path.resolve(__dirname, filename)
  // 判断当前路径对应的内容是否存在
  if(fs.existsSync(absPath)) {
    return absPath
  } else {
    // 生成后缀 .js => .json => .node ，定位文件
    let suffix = Object.keys(Module._extensions)
    for(let i = 0; i< suffix.length; i++) {
      let newPath = absPath + suffix[i]
      if(fs.existsSync(newPath)) {
        return newPath
      }
    }
    // 如果添加扩展名后还没找到，应该去找 package.json \ module.paths
    // ...
  }
  throw new Error(`${filename} is not exits`)
}
function myRequire(filename) {
  // 获取绝对路径
  let mPath = Module._resolveFilename(filename)

  // 缓存优先
  let cacheModule = Module._cache[mPath]
  if(cacheModule) return cacheModule.exports

  // 创建空对象加载目标模块
  let module = new Module(mPath)
  // 缓存已加载过的模块
  Module._cache[mPath] = module

  // 执行加载
  module.load()
  // 返回数据
  return module.exports
}

let obj = myRequire('./custom-require-test')
console.log(obj)
let json = myRequire('./custom-require-test.json')
console.log(json)
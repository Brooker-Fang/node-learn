/* 
  module信息：每个模块都有module变量可以获取当前module信息
*/

// console.log(module)
/* 
  模块导入导出：
    module.exports / require
    require导入是同步的，即require导入的模块的代码会先执行完，才会执行后面的代码
*/
/* 
  module.exports 和 exports 区别
    exports只是node为了方便使用增加的，module.exports 和 exports是指向同一个引用对象
    exports = {} 这种直接赋值的方式无效，只能使用exports.[key] = value形式，如exports.name = 111
*/
const test = require('./test')
console.log(test)

/* 
  判断是不是主模块
    require.main
*/
console.log(require.main === module, require.main) // true
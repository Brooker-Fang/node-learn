/* 
  获取资源信息：通过 process 获取相关内存或cpu信息
  {
    rss: 20254720, 常驻内存
    heapTotal: 4468736, 刚开始申请的内存大小
    heapUsed: 2641312, 当前模块所使用的内存大小
    external: 880204, 扩展占用的内存大小，如 一些底层c或c++模块的内存大小
    arrayBuffers: 9898 缓冲区的大小
  }
*/
// console.log(process.memoryUsage()) // 获取内存的信息
// console.log(process.cpuUsage()) // 获取cpu信息

/* 
  获取运行环境：运行目录、node环境、cpu架构、用户环境、系统平台
*/
console.log('cwd===', process.cwd()) // 目录
console.log('version===', process.version) // 版本 
console.log('versions===', process.versions) // 详细版本信息
console.log('arch===', process.arch) // 操作系统
console.log('env===', process.env.NODE_ENV) // 用户环境
console.log('PATH===', process.env.PATH) // 系统环境变量
console.log('USERPROFILE===', process.env.USERPROFILE) // 当前用户管理员HOME目录
console.log('platform===', process.platform) // 操作系统


/* 
  获取运行状态：启动参数、PID、运行时间...
*/
// 没有参数默认为 ['D:\\nodejs\\node.exe','E:\\my-project\\my\\node\\node-learn\\src\\process.js']
// 即[node调用路径，当前文件路径]
console.log('argv===', process.argv) // 获取参数
console.log('argv0===', process.argv0) // 可以通过argv0 获取第一个参数, 其他的不行如argv1
console.log('execArgv===', process.execArgv) // 获取 --参数, 如 node --init process.js  : --init
console.log('execPath===', process.execPath) // node调用路径
console.log('pid===', process.pid) // node调用路径
console.log('uptime===', process.uptime()) // 这个文件运行时间

/* 
  事件
*/
// 进程被回收时
process.on('exit', (code) => {
  console.log('exit===' + code)
})
// 进程被回收前
process.on('beforeExit', (code) => {
  console.log('beforeExit===' + code)
})

process.exit() // 主动退出，不执行beforeExit回调
## 常见全局变量

__filename: 返回正在执行脚本文件的绝对路径
__dirname: 返回正在执行脚本所在目录
__timer类函数: 执行顺序与事件循环间的关系
process: 提供与当前进程互动的接口
require: 实现模块的加载
module、exports: 处理模块的导出

## CommonJS规范
+ CommonJS规范期初是为了弥补JS语音模块化缺陷
+ CommonJS是语言吃呢闺蜜的规范，当前主要用于Node.js
+ CommonJS规定模块化分为引人、定义、标识符三个部分
+ Module在任意模块中可直接使用包含模块信息
+ Require接收标识符，加载目标模块
+ Exports与module.exports都能导出模块数据
+ CommonJS规范定义模块的加载是同步完成
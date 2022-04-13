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


## 模块分类
+ 内置模块：即node的核心模块，fs、path等
+ 文件模块：即自定义模块、第三方模块，如node_modules等

## 模块加载速度
+ 内置模块，即核心模块，在node源码编译阶段就写入到二进制文件中，所以加载会快一些
+ 文件模块：是在代码运行时，动态加载的

## 模块加载流程
+ 路径分析：依据标识符确定模块位置
+ 文件定位：确定目标模块中具体的文件以及文件类型
  + 如require('test')
  + 如果模块路径没有写扩展名，会按照 test.js -> test.json -> test.node的顺序给模块补齐扩展名
  + 如果没有找到，会去找package.json，并通过JSON.parse()解析，获取package.json里的main的值
  + 依旧按顺序查找 main.js -> main.json -> main.node
  + 如果没有找到，或者没有package.json文件，则会将index作为目标模块中的具体文件名称
  + 然后会在当前目录按顺序查找 index.js -> index.json -> index.node
  + 如果当前目录还是没有找到，则会根据module.paths 的数组，一层一层的查找index文件
  + 如果还是没有找到，则抛出 错误
+ 编译执行：采用对应的方式完成文件的编译执行
  + 将某个具体类型的文件按照相应的方式进行编译和执行
  + 创建新对象，按路径载入，完成编译执行
    + 如js文件的编译执行：
      + 使用fs模块同步读入目标文件内容
      + 对内容进行语法包装，生成可执行js函数
      + 调用函数时传入exports、module、require等属性值
    + json文件的编译：
      + 将读取到的内容通过JSON.parse进行解析，将结果返回给exports对象

+ 模块加载完成后，会使用路径作为索引进行缓存，下次直接从缓存取
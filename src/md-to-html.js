const fs = require('fs')
const path = require('path')
const marked = require('marked')
const browserSync = require('browser-sync')

/* 
  1 读取 md 和 css内容
  2 将上述读取处理的内容替换占位符，生成一个最终需要展示的 html 字符串
  3 将上述的 html字符 吸入到指定的 html文件中
  4 监听 md 文档内容的变化，然后更新 html 内容
  5 使用 browser-sync 来实时显示 html内容

*/
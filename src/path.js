const path = require('path')

// 返回path的最后一部分
console.log(__filename) // E:\my-project\my\node\node-learn\src\path.js
console.log(path.basename(__filename)) // path.js
console.log(path.basename(__filename, '.js')) // path 传入第二个参数，如果匹配的到会返回后缀之前的文件名称
console.log(path.basename(__filename, '.css')) // path.js 如果没有则会忽略，依旧返回完整文件名称
console.log(path.basename('/a/b/c.')) // 返回 c.
console.log(path.basename('/a/b/c/')) // 返回 c, 如果结尾处有路径分割符，则会被忽略掉

// 获取路径目录名,即返回文件名之前的一部分
console.log(path.dirname(__filename)) // E:\my-project\my\node\node-learn\src
console.log(path.dirname('/a/b/c.')) // 返回 /a/b
console.log(path.dirname('/a/b/c/')) // 返回 c, 如果结尾处有路径分割符，则会被忽略掉

// 获取路径扩展名, 即最后一个·的部分
console.log(path.extname(__filename)) // .js
console.log(path.extname('/a/b/index.js.html.css')) // .css


// 解析路径 path.parse
console.log(path.parse('/a/b/index.js')) // { root: '/', dir: '/a/b', base: 'index.js', ext: '.js', name: 'index' }
console.log(path.parse('./a/b/index.js')) // 相对路径 { root: '', dir: './a/b', base: 'index.js', ext: '.js', name: 'index' }
console.log( path.parse(__filename))

// 序列化路径
const obj = path.parse('/a/b/index.js')
console.log(path.format(obj)) // /a/b/index.js

// 判断当前路径是否为绝对路径
console.log(path.isAbsolute('/foo')) // true
console.log(path.isAbsolute('foo')) // false
console.log(path.isAbsolute('./foo')) // false
console.log(path.isAbsolute('../foo')) // false

// 拼接路径
console.log(path.join('a/b', 'c', 'index.html')) // a\b\c\index.html
console.log(path.join('a/b', 'c', '../', 'index.html')) // a\b\index.html

// 规范化路径
console.log(path.normalize('a///b/c/../d')) // a\b\d

// 返回绝对路径
console.log(path.resolve()) // E:\my-project\my\node\node-learn\src 没有参数，则为当前目录绝对路径
console.log(path.resolve('a', 'b')) //E:\my-project\my\node\node-learn\src\a\b 没有参数，则为当前目录绝对路径
console.log(path.resolve('/a', 'b')) // E:\a\b
console.log(path.resolve('a', '/b')) // E:\b
console.log(path.resolve('/a', '/b')) // E:\b
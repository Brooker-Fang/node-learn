/* 
  同步实现 目录创建
*/

const fs = require('fs')
const path = require('path')

/* 
  1 将来调用时需要接收类似于 a/b/c  这样的路径，它们之间是采用 / 去链接
  2 利用/ 分割符将路径进行拆分，将每一项放入一个数组进行管理 ['a', 'b', 'c']
  3 对上述的数组进行遍历，需要拿到每一项，然后与签一下进行 拼接
  4 判断一个当前对拼接之后的路径是否具有可操作权限，如果有则证明存在，否则就需要执行创建
*/
function makeDirSync(dirPath) {
  let items = dirPath.split(path.sep) // path.sep === \
  for(let i = 1; i <= items.length; i++) {
    let dir = items.slice(0, i).join(path.sep)
    try {
      fs.accessSync(dir)
    } catch (error) {
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync('a\\b\\c')
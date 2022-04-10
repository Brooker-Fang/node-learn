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
// node index.js index.md
const mdPath = path.join(__dirname, process.argv[2])
const cssPath = path.resolve('index.css')
const htmlPath = mdPath.replace(path.extname(mdPath), '.html')
console.log(mdPath)
console.log(cssPath)
console.log(htmlPath)

const mdToHtml = function () {
  fs.readFile(mdPath, 'utf-8', (err, data) => {
    // 将md转为html
    const htmlStr = marked.marked(data)
    fs.readFile(cssPath, 'utf-8', (err, data) => {
      const retHtml = temp.replace('{{content}}', htmlStr)
      // 写入 到指定html文件
      fs.writeFile(htmlPath, retHtml, (err, data) => {
  
      })
    })
  })
}
fs.watchFile(mdPath, {interval: 20}, (curr, prev) => {
  if(curr.mtime !== prev.mtime) {
    mdToHtml()
  }
})
browserSync.init({
  browser: '',
  server: __dirname,
  watch: true,
  index: path.basename(htmlPath)
})
const temp = `
<!DOCTYPE html>
<html lang="en">
<link>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="./index.css"></link>
</head>
<body>
  <div>
    {{content}}
  </div>
</body>
</html>`
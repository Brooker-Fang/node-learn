/* 
  操作目录api: 
    access: 判断文件或目录是否具有操作权限
    stat: 获取目录及文件信息
    mkdir: 创建目录
    rmdir: 删除目录
    readdir: 读取目录中的内容
    unlink: 删除指定文件
*/
const fs = require('fs')
const path = require('path')
const dataPath = 'data.txt'
// access
fs.access(dataPath, (err) => {
  if(!err) {
    console.log('有操作权限')
  } else {
    console.log(err)
  }
})

// stat
fs.stat(dataPath, (err, statObj) =>{
  // console.log(statObj)
  console.log(statObj.isFile()) // true 是否是文件
  console.log(statObj.isDirectory()) // false 是否是目录
})

/*  
  mkdir：
    recursive默认为false。如果为false，则只会创建basedir，如/add-dir/a/b/c 只会创建c，（并且如果没有b目录会报错）
    如果设置为true，则会创建add-dir、a、b、c四个目录 
*/
// fs.mkdir(__dirname+'/add-dir/a/b/c', {recursive: true}, (err) => {
//   if(!err) {
//     console.log('创建成功')
//   } else {
//     console.log(err)
//   }
// })

/* 
  rmdir 
    recursive为false只会删除非空目录 
    为true则可以删除目录下的所有
*/
// fs.rmdir(__dirname+'/add-dir',  {recursive: true}, (err) => {
//   if(!err) {
//     console.log('删除成功')
//   } else {
//     console.log(err)
//   }
// })

/* 
  readdir
*/
fs.readdir('add-dir/a', (err,files) =>{
  console.log(files)
})
// unlink
fs.unlink('add-dir/a/a.txt', (err,files) =>{
  if(!err) {
    console.log('删除成功')
  }
})
// 链接MongoDB数据库的文件

//  引入moogoose
const mongoose = require('mongoose');

// 创建链接的地址

const uri = 'mongodb://127.0.0.1:27017/people';

// 通过mongoose的connect的方法去链接，方法返回的是一个 promise 对象；

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { console.log('数据库链接成功') })
  .catch(error => {
    console.log('数据库链接失败')
    console.log(error);
  })

// 然后将这个moos模块暴露出去

module.exports = mongoose
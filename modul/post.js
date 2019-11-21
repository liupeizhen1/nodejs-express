
// 引入bd文件暴露出来的模块
const mongoose = require('../confi/bd');

// 实例化schema (描述表的结构的东西)
const scheme = new mongoose.Schema({
    title:String,
    body:String
})

const modul = mongoose.model('post', scheme);

module.exports = modul;
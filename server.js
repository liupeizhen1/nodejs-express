const express = require('express');

const server = express();

const Modul = require('./modul/post');

//先把post请求所需的中间件设置好；

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/lpz/good', async (req, res) => {
    console.log(req.body)
    const modul = new Modul(req.body);

    // let date = modul.save();
    // date.then(()=>{
    //     console.log('写入成功')
    //     console.log(date)
    //     res.send({
    //         "code": 0,
    //         "msg": "ok"
    //     })
    // })
    // .catch(error=>{
    //     console.log(error);
    //     res.send({
    //         "code": -1,
    //         "msg": "写入失败"
    //     })

    // });
    try {
        const date = await modul.save();
        console.log(date);
        res.send({
            "code": 0,
            "msg": 'ok'
        })
    } catch (error) {
        console.log(error);
        res.send({
            "code": -1,
            "msg": '写入失败'
        })
    }



})

server.get('/lpz/good', async (req, res) => {
    let pageNum = (req.query.pageNum) * 1 || 1;
    let pageSize = (req.query.pageSize) * 1 || 2;
    let title = req.query.title;

    try {
        const posts = await Modul.find({
            title: new RegExp(title)
        }).skip((pageNum - 1) * pageSize)
            .limit(pageSize)
        const count = await Modul.find({
            title: new RegExp(title)
        }).countDocuments()
        res.send({
            code: 0,
            msg: "ok",
            back: {
                list: posts,
                count
            }
        })
    } catch(error){
        console.log(error)
        res.send({
            code: -1,
            msg: "寻找失败",
            
        })
    }

})

server.get('/lpz/:id',async (req,res)=>{
    let id = req.params.id;
    

    try{
        const del = await Modul.deleteOne({_id:id})
        res.send('删了')
    } catch(error){
        console.log(error)
        res.send('没删')
    }

})

server.post('/lpz/alter',async (req,res)=>{
    console.log(req.body)
    let up = await Modul.updateOne({title:req.body.title},{body:req.body.body});
    console.log(up)
    res.send({
        code:0,
        msg:"ok"
    })
})

server.listen(9090);
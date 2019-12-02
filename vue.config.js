
// 请求回的数据转对象
// const bodyParser=require("body-parser");
const bodyParser=require("body-parser")
const list=require("./data")
let userList=[{
    "username":"admin",
    "password":"123"
},{
    "username":"admin2",
    "password":"123456"
}]

module.exports={
    // then回调函数中没有逻辑代码不会报错
    lintOnSave:false,

    devServer:{
        before(app){
        // 使用中间件将请求回的数据转对象 
        app.use(bodyParser.json());

        // 登录
        app.post("/list",(req,res)=>{
            let {username,password}=req.body;
            // 查找是否存在此用户
         let user= userList.find((item,index)=>{
            return item.username===username;
            })
            // 存在
            if(user){
                // 判断密码是否正确
            if(user.password===password){
                res.send({
                    code:200,
                    msg:"登陆成功"
                })
            }else{
                res.send({
                    code:400,
                    msg:"密码不对"
                })
            } 

            }else{
                // 不存在
            res.send({
                code:400,
                msg:"用户不存在"
            })
            }

        })

        app.get("/navList",(req,res)=>{
            res.send(list)
        })

        app.post("/innerList",(req,res)=>{
            // console.log(req.body)
            let {id}=req.body;
         let AllList= list.bookMallData.find((item,index)=>{
                return item.id==id
            })
            res.send(AllList)
        })

        app.post("/detailList",(req,res)=>{
            let {id}=req.body;
            console.log(req.body)
         let DList 
         list.bookMallDetailData.forEach((item,index)=>{
                item.list.forEach((i,index)=>{
                   if(i.id==id){
                     DList=i
                   }               
                })
            })
            console.log(DList)
        
            res.send(DList);
        })

        }
    }
}
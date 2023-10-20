//connect mongo db

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const userModel = require('./model/userSchema')
const PORT = 5000

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//mongodb connect 
const DB_URL = mongoose.connect('mongodb+srv://minhajwahid:HaniaEB20103087@cluster0.yxxq8sv.mongodb.net/')
mongoose.connection.on('connected',()=>{console.log('mongo connected sucessfuly')})
mongoose.connection.on('error',(err)=>{console.log('mongo connected sucessfuly',err.message)})

//post api
// app.post('/api/createuser', async (req,res)=>{
//     console.log(req.body)
//     const body = req.body

//     const obj ={
//         first_name:body.Name,
//         gender: body.gender,
//         age: body.age
//     }
//     const data = await userModel.create(obj)
//     try {
//         res.json({
//             message: 'successfully create',
//             status: true,
//             data,
//         })
//     } catch (error) {
//         res.json({
//             message: error.message,
//             status: false,
//             data: null
//         })
//     }
// })

//get api
app.get("/api/getuser", async (req, res) => {
  try {
    const userRecords = await userModel.find({});
    console.log(userRecords);
    res.json({
      message: "data get",
      status: true,
      data: userRecords,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
});


app.get('/',(request,response)=>{
    response.json({
        message:'server up'
    })
})

app.listen(PORT,()=>{
    console.log("server is runing")
})
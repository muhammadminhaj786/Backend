//signup
//complete crud

const express = require("express")
const mongoose = require('mongoose')
const app = express();
const userModel = require('./model/userSchema')
const bcrypt = require("bcryptjs")
const PORT = 3001;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',()=>{
    console.log('server up')
})

// mongo connection
const DB_URL = mongoose.connect('mongodb+srv://minhajwahid:HaniaEB20103087@cluster0.yxxq8sv.mongodb.net/')
mongoose.connection.on('connected',()=>{console.log('mongo connected sucessfuly')})
mongoose.connection.on('error',(err)=>{console.log('mongo connected sucessfuly',err.message)})

//signup
//post api
app.post('/api/createuser', async (req,res)=>{
    try {
        const body = req.body
        console.log(body)
        const {firstName,LastName,phoneNo,email,password} = body
        if(!firstName || !LastName || !phoneNo || !email || !password){
            res.json({
                message:"credential missing",
                status: false,
                data: null
            })
            return;
        }
    
        //covert password into hash
        const hashPass = await bcrypt.hash(password,10) 
        console.log(hashPass)
        const objToSend = {
            first_Name: firstName,
            Last_Name: LastName,
            phone_No:phoneNo,
            email,
            password: hashPass
        }
    
        //for unique email
        const emailExist = await userModel.findOne({email})
        if(emailExist){
            res.json({
                message:"email exist",
                status:false,
                data:null
            })
            return;
        }
    
        const userSave = await userModel.create(objToSend)
    
        res.json({
            message:"user successfully created",
            status:true,
            data:userSave
        })
    } catch (error) {
        res.json({
            message: error.message,
            status: false,
            data: null
        })
    }
})


//get api
app.get('/api/getallusers', async (req,res)=>{
    try {
        const userRef = await userModel.find({})
        res.json({
            message: "get all users",
            status: true,
            data: userRef
        })
        
    } catch (error) {
        res.json({
            message: error.message,
            status: false,
            data: null
        }) 
    }
})

app.get("/api/singleuser/:id", async (req, res) => {
    try {
      // const userRecords = await UserModel.find({}); get all data's
      const { id } = req.params;
  
      const userRecords = await UserModel.findById(id);
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
  
  app.put("/api/updateuser/:id", async (req, res) => {
    try {
      // const userRecords = await UserModel.find({}); get all data's
      const { id } = req.params;
  
      const body = req.body;
  
      const userRecords = await UserModel.findByIdAndUpdate(id, body);
      console.log(userRecords);
      res.json({
        message: "update  user",
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
  
  app.delete("/api/deleteuser/:id", async (req, res) => {
    try {
      // const userRecords = await UserModel.find({}); get all data's
      const { id } = req.params;
      const userRecords = await UserModel.findByIdAndDelete(id);
      console.log(userRecords);
      res.json({
        message: "delete  user",
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

//check
app.get('/',(req,res)=>{
    res.json({
        message:"server up"
    })
})

app.listen(PORT,()=>{
    console.log('server is runing')
})

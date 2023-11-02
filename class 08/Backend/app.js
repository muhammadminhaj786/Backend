//Login

const express = require("express")
const mongoose = require('mongoose')
const app = express();
const userModel = require('./model/userSchema')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
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

//Login
//Post api
app.post('/api/login', async (req,res)=>{
    const {email,password} = req.body
    console.log(email,password)

    const emailExist = await userModel.findOne({email})
    if(!emailExist){
        res.json({
            message: "Invalid Cridentials",
            status: false,
            data: null
        })
        return
    }
    const comparePass = await bcrypt.compare(password,emailExist.password)
    if(comparePass){

        var token = jwt.sign({email:emailExist.email},'Hania')
        console.log(token)

        res.json({
            message:'User Login',
            status: true,
            data: emailExist,
            token
        })
        return
    }
    else{
        res.json({
            message: 'invalid credentials',
            status: false,
            data: null
        })
    }
})

//check
app.get('/',(req,res)=>{
    res.json({
        message:"server up"
    })
})

app.listen(PORT,()=>{
    console.log('server is runing')
})

const express = require("express");
const app = express();
const PORT = 5000;

//middleware 
app.use(express.json());

//get api
app.get('/',(request,response)=>{
    response.json({
        message: 'server up'
    })
})

//post api
app.post('/createuser',(request,response)=>{
    console.log(request.url)
    console.log(request.body)

    //destructure body values
    const {email,password} = request.body

    response.json(
        {
            email,
            password
        }
    )
})

//put api
app.put('/edituser',(request,response)=>{
    response.json('server up')
})

//delete api
app.delete('/edituser',(request,response)=>{
    response.json('server up')
})

app.listen(PORT,()=>{
    console.log('server is runing on')
})
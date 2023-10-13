const express = require('express');
const app = express()
const PORT = 8080;

//creating get api
app.get('/',(request,response)=>{
    response.json({
        message: "server up"
    })
})

app.listen(PORT,()=>{
    console.log(`server is runing on http://localhost:${PORT} `)
})
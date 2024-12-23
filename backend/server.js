const express = require('express')
const app = express();
const dotenv = require('dotenv')
const  chats = require('./data/data')

dotenv.config()

app.get('/',function(req,res){
    res.send("successfull")
})

app.get('/user/chat',function(req,res){
    console.log(chats   )
    res.send(chats)
})

app.get('/user/chat/:id',(req,res)=>{
    
    const id =req.params.id 
    console.log("id is " ,id)
    if(id.length == 0){
        res.send("id is required")
    }
    // debugger
    console.log(id)
    res.send(chats)
})

const PORT = process.env.PORT || 5000
app.listen(PORT,function(){console.log(`Server is running on port ${PORT}`)})
const express = require('express')
const app = express();
const dotenv = require('dotenv')
const  {chats} = require('./data/data')
const cors = require('cors')
const connectDB = require('./config/database')
const userRoutes = require('./routes/userRoutes')


const {errorHandler,notFound} = require('./middleware/errorMidleware')

dotenv.config()
connectDB()
const corsOptions = {
    origin: 'http://localhost:3002', // Ensure no trailing slash
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies or other credentials
  };
app.use(cors(corsOptions))

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded data (optional, for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use('/app/user',userRoutes)

app.get('/user/chat/:id',(req,res)=>{
    
    const id =req.params.id 
    const chat_details = chats.find((data)=>data._id==id)
    res.send(chat_details)
})

app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT,function(){console.log(`Server is running on port ${PORT}`)})
const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        
        const dbconnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo db connection: ${dbconnection.connection.host} `, )
    }catch(error){
        console.log(`Error while connecting to mongodb and error: ${error.message} `)
        process.exit()
    }
}

module.exports= connectDB
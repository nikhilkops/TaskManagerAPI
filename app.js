const express = require('express') ;
const app = express() ;
const  tasks = require('./routes/tasks.js')
require('dotenv').config()
const connectDB = require('./DB/connect')  
//middleware
const notFound = require('./middleware/notFound.js')
const errorHandler  = require('./middleware/errorHandler.js')
app.use(express.static('./public'))
app.use(express.json())

const PORT = 3000;
 
app.use('/api/v1/tasks',tasks) 
app.use(notFound)
app.use(errorHandler)
const start = async()=>{
    try 
    {
        await connectDB(process.env.MONGO_URL); 
        app.listen(PORT, ()=>{
        console.log(`Server is hosted on http://localhost:${PORT}`) ;
        }) 
    } 
    catch (error) {
        console.log(error)
    }
}
start()

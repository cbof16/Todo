// require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config() //to process the .env file using package



const port = 5001

//middleware
app.use(cors())
// app.use(express.static('./public'))
app.use(express.json())

//routes

app.use('/api/v1/tasks',tasks)


//app.get('/api/vi/tasks')          --get all the tasks
//app.post('/api/vi/tasks')         --create a new task
//app.get('/api/vi/tasks/:id')      --get single task
//app.patch('/api/vi/tasks/:id')    --update task
//app.delete('/api/vi/tasks/:id')   --delete task


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,(req,res)=>{
            console.log(`listening to ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()
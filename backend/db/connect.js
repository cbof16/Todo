const mongoose = require('mongoose')

// const connectionString='mongodb+srv://cbof16:l8RMiAzAA4eJza5l@cluster0.aclv7tl.mongodb.net/TASK_MANAGER?retryWrites=true&w=majority'


const connectDB = (url)=>{
    return  mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    }).then(()=>{
    console.log('CONNECTED TO THE DB')
    }).catch((error)=>{
    console.log(error)
    })
}

module.exports= connectDB

//not connect here as it makes sense to first load the database then
//listen to the server

// mongoose.connect(connectionString,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true,
// }).then(()=>{
//     console.log('CONNECTED TO THE DB')
// }).catch((error)=>{
//     console.log(error)
// })

//to counter deprecation warnings
// useNewUrlParser:true,
// useCreateIndex:true,
// useFindAndModify:false,
// useUnifiedTopology:true,
const  mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    name:{type:String, required:true,trim:true,required:[true,'Must Provide Name .....']},
    completed: {type:Boolean, default:false},  
})


module.exports =mongoose.model('Task',TaskSchema)
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const {createCustomAPIError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async(req,res)=>{

    const tasks = await Task.find({});
    res.status(200).json({task:tasks}); 

}) 

const createTask = asyncWrapper(async (req,res)=>{  

        const obj = req.body ; 
        const name = obj.name;  
        const task = await Task.create({
            name: name,
            completed:false
        })
        res.status(200).json(task) 
}) 

const getTask = asyncWrapper(async(req,res,next)=>{ 

        const id = req.params.id ; 
        const task = await Task.findOne({_id:id});

        if(!task)
        {
            return next(createCustomAPIError(`No Task with this id:${id}`,404))
    
        }
        res.status(200).json(task);
       
}) 

const  updateTask = asyncWrapper(async(req,res)=>{
    
        const obj = req.body ;
        const id = req.params.id ; 
        const updatedName = obj.name;
        const completed = obj.completed;

        const update = {name:updatedName, completed:completed}
         
        const updated = await Task.findOneAndUpdate({_id:id},update,{
            new:true,runValidators:true
        })

        if(!updated)
        {
            return res.status(500).json({message:`No Task with this id:${id}`})
        }
        res.status(200).json(updated)
    
}
) 
const  deleteTask = asyncWrapper(async(req,res)=>{
    
        const id = req.params.id ; 
        const task = await Task.deleteOne({_id:id});

        console.log(typeof(task.deletedCount))
        if(task.deletedCount===0)
        {
            return res.status(404).json({message:`No Task with this id:${id}`})
        }
        
        res.status(200).json({task:null,status:'success'});
         
} ) 

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
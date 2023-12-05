const Todo = require('../models/todoSchema')

exports.getAll = async (req, res) => {
    try {
        const todos = await Todo.find({ find: req.user._id })
        res.status(200).json(todos)
    } catch (error) {
        console.log('展示所有todos')
        res.status(500).json(error)
    }
}

exports.create = async (req, res) => {
  
    try {
        const todos = await Todo.create({
            user: req.user._id,
            text:req.body.text
        })
        res.status(201).json(todos)
    } catch (error) {
        console.log('创建todo失败')
        console.log(error)
        res.status(500).json(error)
    }
}


// exports.update = async (req, res) => {
//     console.log(req.params.id)
//     console.log(req.body.text)
//     try {
//         const todo = await findById(req.params.id)
//         todo.text = req.body.text;
//         todo.save();
//         res.status(201).json(todo)
//     } catch (error) {
//         console.log('创建todo失败')
//         console.log(error)
//         res.status(500).json(error)
//     }
// }

exports.complete = async (req, res) => {
    try{
	const todo = await Todo.findById(req.params.taskId);
    console.log(req.params.taskId)
	todo.complete = !todo.complete;
	todo.save();
	res.json(todo); 
}catch (error) {
        console.log('修改complete失败')
        console.log(error)
         res.status(500).json(error)
    }
}

exports.delete =async(req,res)=>{
    try{
        const result = await Todo.findByIdAndDelete(req.params.taskId);
        res.status(200).json({result});
    }catch (error) {
                console.log('删除todo失败')
                console.log(error)
                 res.status(500).json(error)
             }
  
}
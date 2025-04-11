// import model
// const { response } = require("express");
const Todo = require("../models/Todo");

// define route handler
exports.createTodo = async(req,res) =>{
   try{
    //  extract title  and description from request body
    const {title,description} = req.body;
    // create a new todo object insert in db
    const response =  await Todo.create({title,description});

    // send a json response with a sucess flag
    res.status(200).json(
        {
            success:true,
            data:response,
            message:'Entry Created Successfully'
        }
    );

   }

   catch(error){
      console.log(error);
      console.log(error);
      res.status(500)
     .json(
        {
            success:false,
            data:"internal server error",
            message:error.message,
        }
     );
      
   }
};
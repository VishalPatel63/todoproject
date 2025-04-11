// import model
const Todo = require("../models/Todo");

// define route handler
exports.getTodo = async(req,res) =>{
   try{
//      fetch all todo items from database
       const todos = await Todo.find({});

       res.status(200)
       .json(
        {
            success:true,
            data:todos,
            message:"Entire Todo Data is fetched "
        }
       )
   }

   catch(err){
      console.error(err);
      console.log(err);
      res.status(500)
      .json({
        success:false,
        error:err.message,
        message:"Server Error",
      })

      
   }
};

// .create function databse me entry create karnta hai and insert karta hai



// ____________________________________________________________________

// fetch Todo item based on id

exports.getTodoById = async(req,res) =>{
    try{
      // extract todo items basis on id
      const id = req.params.id;
      const todo = await Todo.findById({_id: id});


    //   data forgiven id not found
    if(!todo){
        return res.status(404).json({
            success:false,
            message:"No data found with given id",
        })
    }

    // data for given  id found
    res.status(200).json({
        success:true,
        data:todo,
        message:`Todo ${id} data successfully fetched`,
    })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
          success:false,
          error:err.message,
          message:"Server Error",
        });
  
        
     }
}
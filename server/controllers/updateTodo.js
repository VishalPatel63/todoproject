// import model
const Todo = require("../models/Todo");

// define route handler
exports.updateTodo = async (req, res) => {
  try {
    // fetch id and updated fields
    const { id } = req.params;
    const { title, description } = req.body;

    // update the todo
    const todo = await Todo.findByIdAndUpdate(
      id, // you can directly pass id
      { title, description, updatedAt: Date.now() },
      { new: true } // return the updated document
    );

    // if todo not found
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // success response
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} updated successfully`,
    });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};

 
 // .create function databse me entry create karnta hai and insert karta hai
 
 

 
 
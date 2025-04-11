// Import model
const Todo = require("../models/Todo");

// Define route handler
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the todo exists before deletion
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "🗑️ Todo deleted successfully",
      data: deletedTodo,
    });

  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};

 
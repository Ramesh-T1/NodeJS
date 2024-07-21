const mongoose = require("mongoose");
//Sets structure of your document
//If we pass more data other than what defined in schema it will not be stored
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
//with model we can perform all our CRUD operations
module.exports = mongoose.model("Task", TaskSchema);

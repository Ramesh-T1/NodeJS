const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
//get and Post
router.route("/").get(getAllTasks).post(createTask);
//get single item,update,delete
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;

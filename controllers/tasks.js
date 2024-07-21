const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
//asyncWrapper is used to remove try and catch block from controller and use it as middleware
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });
});
const createTask = asyncWrapper(async (req, res) => {
  //res.send("Task created");
  //res.json(req.body);
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res, next) => {
  // res.send("Get single item");
  // res.json({ id: req.params.id });
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    //If we search for a document using id and we change its value to wrong but keep the number of digits same then we get 404
    //return res.staus(404).json({ msg: `No task with id :${taskID}` });
    return next(createCustomError(`No task with id :${taskID}`, 404));
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  //res.send("Updated task");
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id :${taskID}`, 404));
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  //res.send("delete task");
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id :${taskID}`, 404));
  }
  res.status(200).json({ task });
});
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

import express from "express";
import Task from "../Models/taskModel.js";
import User from "../Models/userModel.js";
import { isAuth } from "../utils.js";



 
const taskRouter = express.Router();


taskRouter.post(
  '/',
  isAuth,
  async (req, res) => {

    const newTask = new Task({
    
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      user: req.user._id,
    });

    
    const task = await newTask.save();

    res.status(201).send({ message: 'New Task Created', task });

  }
);




taskRouter.get(
  '/',
  isAuth,
  async (req, res) => {

    const tasks = await Task.find({user: req.user._id});

    if (tasks) {

      res.send(tasks);
      
    } 
    
    else {

      res.status(404).send({ message: 'Task Not Found' });

    }
    
  }
);




taskRouter.get(
  '/:id',
  isAuth,
  async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (task) {

      res.send(task);
      
    } 
    
    else {

      res.status(404).send({ message: 'Task Not Found' });

    }
    
  }
);



taskRouter.put(
  '/:id',
  isAuth,
  async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (task) {

      task.title = req.body.title || task.title;
      task.description= req.body.description || task.dueDate;
      task.dueDate= req.body.dueDate || task.dueDate;
      task.priority= req.body.priority || task.priority;
      task.status= req.body.status || task.status;
      task.user = req.user._id;

      const updatedTask = await task.save();

      res.send(updatedTask);
      
    } 
    
    else {

      res.status(404).send({ message: 'Task Not Found' });

    }
    
  }
);





taskRouter.delete(
  '/:id',
  isAuth,
  async (req, res) => {

    const task = await Task.findById(req.params.id);

    if(task) {
      await task.remove();

      res.send({message: 'Task is deleted'});
    }

    else {
      res.status(404).send({message: 'Task not found'});
    }
    
  }


);



export default taskRouter;
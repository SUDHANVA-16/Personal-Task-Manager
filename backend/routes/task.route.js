const Task = require("../models/Task");

const router = require("express").Router();
// const router = require("./user.route");
// const { route } = require("./user.route");

router.post("/",async(req,res)=>{
    const data = req.body;

    try {
        const createdTask = new Task(data);
        await createdTask.save();
        res.send("Created Task")
    } catch (error) {
        res.send(error)
    }
});

//read all the tasks
router.get("/", async(req,res)=>{
    try {
            const taskList = await Task.find();
            res.send(taskList);
    } catch (error) {
        res.send(error);
}
});

//get task by id
router.get("/:id", async(req,res) => {
    try {
        const task = await Task.findOne({_id: req.params.id})
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

//update a task
router.put("/:id", async(req,res) => {
    try {
        const data = req.body;
        await Task.updateOne({_id: req.params.id},{$set: data})
        res.send(' Task Updated');
    } catch (error) {
        res.send(error);
    }
});

//delete a task
router.delete("/:id", async(req,res) =>{
    try {
        await Task.deleteOne({_id: req.params.id});
        res.send("Task Deleted");
    } catch (error) {
        alert(error);
    }
});
module.exports = router
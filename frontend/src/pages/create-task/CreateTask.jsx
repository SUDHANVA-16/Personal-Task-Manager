import React, { useEffect, useState } from 'react'
import './CreateTask.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CreateTask() {
    const [title,setTitle] =useState("");
    const [description,setDescription] = useState("");
    const [status,setStatus] = useState("");
    const [deadline, setDeadline] = useState("");

    const [isEdit, setIsEdit] = useState("");
    const params = useParams(); //provides url from url bar

    useEffect(() => {
        if (params && params.id) {
            getTaskById(params.id);
        }else{
            setIsEdit(false);
        }
    }, [params]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            status: status,
            deadline: deadline
        
        };
        try {
            let response;
            if (isEdit) {
                response = await axios.put(`http://localhost:5000/task/${params.id}`,data);
            }else{
                response = await axios.post('http://localhost:5000/task',data);
            }
            alert(response.data);
        } catch (error) {
            alert(error);
        }
    };
    const getTaskById = async(taskId) =>{
        const response = await axios.get(`http://localhost:5000/task/${taskId}`);
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setDeadline(data.deadline);
        setIsEdit(true);
    };
  return (
    <div className='ct-cont'>
        <h4>Task Form</h4>
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <label>Title : </label>
                <input type="text" placeholder='Enter Task Title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </div>
            <div className='form-control'>
                <label>Description : </label>
                <textarea placeholder='Enter Task Description' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div className='form-control'>
                <label>Task Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value={"todo"} selected>
                        To-Do
                    </option>
                    <option value={"inProgress"}>In Progress</option>
                    <option value={"done"}>Done</option>
                </select>
            </div>
            <div className='form-control'>
                <label>Task DeadLine</label>
                <input type="date" placeholder='Select Task Deadline' value={deadline} onChange={(e) => setDeadline(e.target.value)} required/>
            </div>
            <button className='st-btn'>Save</button>
        </form>
    </div>
  )
}

export default CreateTask
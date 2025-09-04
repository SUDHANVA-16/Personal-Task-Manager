import React, { useEffect, useState } from 'react'
import './TaskList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function TaskList() {
    const [taskList, setTaskList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getTaskList();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const getTaskList = async () => {
        try {
            const response = await axios.get("http://localhost:5000/task");
            console.log(response.data);
            setTaskList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskEdit = (taskId) => {
        navigate(`/edit-task/${taskId}`);
    };

    const handleTaskDelete = async (taskId) => {
        if (window.confirm("Are you sure want to delete this task?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/task/${taskId}`);
                alert(response.data);
                getTaskList();
            } catch (error) {
                alert(error);
            }
        }
    }
    return (
        <div className='tasks-cont'>
            <div className='tasks-header'>
                <h4>All Tasks</h4>
                <button onClick={() => handleNavigate("/create-task")}>
                    Create Task
                </button>
            </div>
            <div className='tasks-body'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.map((task) => {
                            return (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.deadline}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleTaskEdit(task._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleTaskDelete(task._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default TaskList
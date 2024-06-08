import './App.css';
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import Form from './components/Form';
import APIservice from './components/APIservice';


function App() {
    const [tasks, setTasks] = useState([]);
    const [updatedTask, setUpdatedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        fetch('http://localhost:5000', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(resp => setTasks(resp))
        .catch(error => console.log(error));
    };

    const updateTask = (task) => {
        setUpdatedTask(task);
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:5000/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => console.log(error));
    };

    const markAsCompleted = (id) => {
      // Fetch the task details to include all required fields
      const taskToUpdate = tasks.find(task => task.id === id);
  
      if (!taskToUpdate) {
          console.error("Task not found for ID:", id);
          return;
      }
  
      // Create the task data object with all required fields
      const taskData = {
          title: taskToUpdate.title,
          description: taskToUpdate.description,
          status: 'Completed' // Assuming 'status' is a required field
          // Include other required fields here if any
      };
  
      // Make the PUT request to update the task
      APIservice.updateTask(id, taskData)
          .then(updatedTask => {
              console.log("Task marked as completed:", updatedTask);
              updatedData(updatedTask);
          })
          .catch(error => {
              console.error("Error marking task as completed:", error);
          });
    };
  
  

    const updatedData = (task) => {
        const newTasks = tasks.map(t => (t.id === task.id ? task : t));
        setTasks(newTasks);
    };

    

    return (
        <div className="App">
            <h1>TASK MANAGER</h1>
            <Form updatedData={updatedData} task={updatedTask} setTasks={setTasks} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} markAsCompleted={markAsCompleted}/>
        </div>
    );
}

export default App;
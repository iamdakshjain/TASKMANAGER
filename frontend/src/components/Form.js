import React, { useState, useEffect } from "react";
import APIservice from "./APIservice";

function Form({ task, updatedData, setTasks }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (task) {
      // Update task
      APIservice.updateTask(task.id, { title, description })
        .then((updatedTask) => {
          updatedData(updatedTask);
          setTasks(prevTasks => {
            return prevTasks.map(prevTask => (prevTask.id === updatedTask.id ? updatedTask : prevTask));
          });
        })
        .catch((error) => console.log(error));
    } else {
      // Add new task
      APIservice.addTask(title, description)
        .then((newTask) => {
          setTasks(prevTasks => [...prevTasks, newTask]);
          setTitle(""); // Clear form after adding task
          setDescription("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="Title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          type="text"
          className="form-control"
          value={description}
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-success mt-3">
          {task ? "Update" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default Form;

import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask, markAsCompleted }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Title</th>
          <th style={{ width: '30%' }}>Description</th>
          <th style={{ width: '10%' }}>Date</th>
          <th>Status</th> 
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.date}</td>
            <td>{task.status}</td> {/* Display status */}
            <td>
              <button onClick={() => updateTask(task)} type="button" className="btn btn-outline-info md=1">Update</button>
              <button onClick={() => deleteTask(task.id)} type="button" className="btn btn-outline-danger">Delete</button>
              {task.status === 'Pending' && <button onClick={() => markAsCompleted(task.id)} type="button" className="btn btn-outline-success">Done</button>} 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
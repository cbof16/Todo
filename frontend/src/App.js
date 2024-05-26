import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { SlTrash } from 'react-icons/sl';
import { FaEdit } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/v1/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskName && dueDate) {
      try {
        const response = await axios.post('/api/v1/tasks', { name: taskName, dueDate });
        setTasks([...tasks, response.data.task]);
        setTaskName('');
        setDueDate('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async () => {
    if (taskName && dueDate) {
      try {
        const response = await axios.patch(`/api/v1/tasks/${currentTask._id}`, { name: taskName, dueDate });
        setTasks(tasks.map(task => (task._id === currentTask._id ? response.data.task : task)));
        setTaskName('');
        setDueDate('');
        setEditing(false);
        setCurrentTask({});
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const startEditing = (task) => {
    setEditing(true);
    setTaskName(task.name);
    setDueDate(task.dueDate.split('T')[0]);
    setCurrentTask(task);
  };

  return (
    <div className="App">
      <h1 className="app-title">Todo List</h1>
      <div className="Content">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="add-button" onClick={editing ? updateTask : addTask}>
            {editing ? 'Update' : <MdAdd size={21} />}
          </button>
        </div>
        <div className="input-list">
        <ul className="todo-list">
            {tasks && tasks.length > 0 ? (
              tasks.map(task => (
                <li className="todo" key={task._id}>
                  {task.name} (Due: {new Date(task.dueDate).toLocaleDateString()})
                  <button className="delete-button" onClick={() => deleteTask(task._id)}>
                    <SlTrash size={18} />
                  </button>
                  <button className="edit-button" onClick={() => startEditing(task)}>
                    <FaEdit size={18} />
                  </button>
                </li>
              ))
            ) : (
              <li>No tasks available</li>
            )}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default App;

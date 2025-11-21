import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ description: '', startDate: '', dueDate: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const setFeedbackMessage = (type, message) => {
    if (type === 'success') {
      setSuccessMessage(message);
      setErrorMessage('');
    } else {
      setErrorMessage(message);
      setSuccessMessage('');
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000);
  };

  const loadTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data);
      if (response.data.length === 0) {
        setFeedbackMessage('success', 'No hay tareas disponibles. ¡Crea una nueva!');
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
      setFeedbackMessage('error', `Error al cargar tareas: ${error.message}`);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const createOrUpdateTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await taskService.updateTask(editingTask.id, taskForm);
        setTasks(tasks.map(t => (t.id === editingTask.id ? response.data : t)));
        setFeedbackMessage('success', `Tarea "${response.data.description}" actualizada con éxito.`);
      } else {
        const response = await taskService.createTask(taskForm);
        setTasks([...tasks, response.data]);
        setFeedbackMessage('success', `Tarea "${response.data.description}" creada con éxito.`);
      }
      cancelEdit();
    } catch (error) {
      console.error('Failed to save task', error);
      setFeedbackMessage('error', `Error al guardar tarea: ${error.message}`);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTaskForm({ description: task.description, startDate: task.startDate, dueDate: task.dueDate });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTaskForm({ description: '', startDate: '', dueDate: '' });
  };

  const deleteTask = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
        if (editingTask?.id === id) {
          cancelEdit();
        }
        setFeedbackMessage('success', 'Tarea eliminada con éxito.');
      } catch (error) {
        console.error('Failed to delete task', error);
        setFeedbackMessage('error', `Error al eliminar tarea: ${error.message}`);
      }
    }
  };

  return (
    <div className="tasks-container">
      <div className="header">
        <h2>Tasks</h2>
        <div>
          <button onClick={() => navigate('/tasks-chart')}>Go to Chart</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {successMessage && <div className="feedback-message success">{successMessage}</div>}
      {errorMessage && <div className="feedback-message error">{errorMessage}</div>}

      <div className="task-form-container">
        <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
        <form onSubmit={createOrUpdateTask}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input id="description" type="text" name="description" value={taskForm.description} onChange={handleFormChange} placeholder="Task description" required />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input id="startDate" type="date" name="startDate" value={taskForm.startDate} onChange={handleFormChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input id="dueDate" type="date" name="dueDate" value={taskForm.dueDate} onChange={handleFormChange} required />
          </div>
          <button type="submit" disabled={!taskForm.description || !taskForm.startDate || !taskForm.dueDate}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && <button type="button" onClick={cancelEdit} className="cancel-button">Cancel Edit</button>}
        </form>
      </div>

      <p>Lista de tareas</p>
      {tasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{new Date(task.startDate).toLocaleDateString()}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => editTask(task)} className="edit-button">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;

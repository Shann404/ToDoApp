// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

function Home() {
  /**
   * Custom hook for managing tasks with localStorage persistence
   */
  const useLocalStorageTasks = () => {
    const [tasks, setTasks] = useState(() => {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text) => {
      if (text.trim()) {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    };

    const toggleTask = (id) => {
      setTasks(tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    };

    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    };

    return { tasks, addTask, toggleTask, deleteTask };
  };

  /**
   * TaskManager component (inner)
   */
  const TaskManager = () => {
    const { tasks,  toggleTask, deleteTask } = useLocalStorageTasks();
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });

    

    return (
      <>
        <h1 className="text-3xl font-bold mb-4">View Tasks Here</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

          

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {['all', 'active', 'completed'].map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          {/* Task list */}
          <ul className="space-y-2">
            {filteredTasks.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400 text-center py-4">
                No tasks found
              </li>
            ) : (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span
                      className={
                        task.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : ''
                      }
                    >
                      {task.text}
                    </span>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))
            )}
          </ul>

          {/* Stats */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>{tasks.filter((t) => !t.completed).length} tasks remaining</p>
          </div>
        </div>
      </>
    );
  };

  // ✅ Return TaskManager here
  return <TaskManager />;
}

export default Home;

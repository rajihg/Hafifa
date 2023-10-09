import React, { useState } from 'react';
import * as taskService from '../services/taskService';

export default function useTaskLogic() {

  const [tasks, setTasks] = useState(taskService.getAllTasks());
  const [openPopup, setOpenPopup] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState(null);
  const [edit, setEdit] = useState(false);

  const addOrEdit = (task) => {
    if (task.id == '0') {
      taskService.insertTask(task);
    }
    else {
      taskService.updateTask(task);
    }
    setTaskForEdit(null);
    setOpenPopup(false);
    setTasks(taskService.getAllTasks());
  };

  const deleteTask = (task) => {
    taskService.deleteTask(task);
    setTasks(taskService.getAllTasks());
  };

  const onCompleteChange = (toggoleComplete, task) => {
    task.isCompleted = toggoleComplete;
    taskService.updateTask(task);
    setTasks(taskService.getAllTasks());
  }

  const handleSearch = e => {
    if (e.target.value == '') {
      setTasks(taskService.getAllTasks());
      return;
    }
    else {
      setTasks(tasks.filter(task => task.taskName.includes(e.target.value)));
    }
  }

  const openInPopup = task => {
    setTaskForEdit(task)
    setOpenPopup(true);
    setEdit(true);
  }

  return {
    addOrEdit,
    deleteTask,
    onCompleteChange,
    handleSearch,
    openInPopup,
    tasks,
    setTasks,
    openPopup,
    setOpenPopup,
    taskForEdit,
    setTaskForEdit,
    edit,
    setEdit,
  }
};
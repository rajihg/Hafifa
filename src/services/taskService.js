import { v4 } from 'uuid';

const KEYS = {
    tasks: 'tasks',
}

export function insertTask(task) {
    let tasks = getAllTasks();
    task.id = v4();
    tasks.push(task);
    localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function updateTask(updateTask) {
    let tasks = getAllTasks();
    let index = tasks.findIndex(task => task.id == updateTask.id);
    tasks[index] = { ...updateTask };
    localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function deleteTask(deleteTask) {
    let tasks = getAllTasks();
    let updateTasks = tasks.filter(task => task.id != deleteTask.id);
    localStorage.setItem(KEYS.tasks, JSON.stringify(updateTasks));
}

export function getAllTasks() {
    if (localStorage.getItem(KEYS.tasks) == null) {
        localStorage.setItem(KEYS.tasks, JSON.stringify([]));
    }
    let tasks = JSON.parse(localStorage.getItem(KEYS.tasks));

    return tasks;
}
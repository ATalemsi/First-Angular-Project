import { Injectable } from '@angular/core';
import {TasksModel} from "../../models/tasks.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'tasks';

  constructor() { }

  getTasks(): TasksModel[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  addTask(task: TasksModel) {
    const tasks = this.getTasks();
    tasks.push(task)
    this.saveToLocalStorage(tasks);
  }
  updateTask(updateTask: TasksModel) {
    const tasks = this.getTasks().map((task) => task.id === updateTask.id ? updateTask : task);
    this.saveToLocalStorage(tasks);
  }

  deleteTask(deleteTask: TasksModel) {
    const tasks = this.getTasks().filter((task) => task.id !== deleteTask.id);
    this.saveToLocalStorage(tasks);
  }


  private saveToLocalStorage(tasks: TasksModel[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}

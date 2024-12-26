import { Injectable } from '@angular/core';
import {TasksModel} from "../../models/tasks.model";
import {Category} from "../../models/categories.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'tasks';

  constructor() { }


  getTasks(): TasksModel[] {
    const tasks: TasksModel[] = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
    return tasks.map(task => ({
      ...task,
      category: this.getCategoryForTask(task.categoryId),
    }));
  }


  getCategoryForTask(categoryId: number): Category {
    const categories: Category[] = JSON.parse(localStorage.getItem('categories') || '[]');
    const category = categories.find((category: Category) => category.id === categoryId);
    return category || { id: 0, name: 'No Category', tasks: [] };
  }



  addTask(task: TasksModel) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveToLocalStorage(tasks);
  }


  updateTask(updateTask: TasksModel) {
    const tasks = this.getTasks().map(task =>
      task.id === updateTask.id ? { ...task, ...updateTask } : task
    );
    this.saveToLocalStorage(tasks);
  }


  deleteTask(deleteTask: TasksModel) {
    const tasks = this.getTasks().filter(task => task.id !== deleteTask.id);
    this.saveToLocalStorage(tasks);
  }


  private saveToLocalStorage(tasks: TasksModel[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}

import {Component} from '@angular/core';
import {TasksModel} from "../models/tasks.model";
import {TaskService} from "../services/task/task.service";
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskFormComponent} from "./task-form/task-form.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskListComponent,
    TaskFormComponent,
    NgIf
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent  {
  tasks: TasksModel[] = [];
  showFormPopup = false;
  taskToEdit: TasksModel | null = null;

  constructor(private readonly taskService: TaskService) {
    this.fetchTasks()
  }


  fetchTasks() {
    this.tasks = this.taskService.getTasks()
  }


  addTask() {
    this.showFormPopup = true;
    this.taskToEdit = null; // Reset task for adding new one
  }

  // Opens the task form for editing an existing task
  editTask(task: TasksModel) {
    this.showFormPopup = true;
    this.taskToEdit = task; // Set the task to edit
  }

  // Deletes a task
  deleteTask(task: TasksModel) {
    if (confirm(`Are you sure you want to delete the category "${task.title}"?`)) {
      this.taskService.deleteTask(task)
      this.fetchTasks();
    }
  }
  // After the form is submitted, refresh or update the tasks
  handleFormSubmitted() {
    this.showFormPopup = false; // Close the form
    this.fetchTasks(); // Refresh the task list
  }

}

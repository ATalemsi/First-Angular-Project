import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TasksModel} from "../../models/tasks.model";
import {TaskService} from "../../services/task/task.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: TasksModel[] = [];
  @Output() editTaskEvent = new EventEmitter<TasksModel>();
  @Output() deleteTaskEvent = new EventEmitter<TasksModel>();

  constructor(private readonly taskService: TaskService) {}

  editTask(task: TasksModel) {
    this.editTaskEvent.emit(task);
  }

  deleteTask(task: TasksModel) {
    this.deleteTaskEvent.emit(task);
    this.taskService.deleteTask(task);
  }

}

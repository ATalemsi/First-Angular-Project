import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TasksModel} from "../../models/tasks.model";
import {TaskService} from "../../services/task/task.service";
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TaskSearchPipe} from "../../shared/task-filter.pipe";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    FormsModule,
    TaskSearchPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  @Input() tasks: TasksModel[] = [];
  @Output() editTaskEvent = new EventEmitter<TasksModel>();
  @Output() deleteTaskEvent = new EventEmitter<TasksModel>();

  searchText: string = '';
  constructor(private readonly taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks(); // Get tasks with categories
  }
  editTask(task: TasksModel) {
    this.editTaskEvent.emit(task);
  }

  deleteTask(task: TasksModel) {
    this.deleteTaskEvent.emit(task);
    this.taskService.deleteTask(task);
  }

}

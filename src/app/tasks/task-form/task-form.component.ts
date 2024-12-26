import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TasksModel} from "../../models/tasks.model";
import {TaskService} from "../../services/task/task.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Input() taskToEdit: TasksModel | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  title = '';
  description = '';
  dueDate = '';
  priority: 'high' | 'medium' | 'low' = 'medium';
  status: 'completed' | 'in-progress' | 'not-started' = 'not-started';
  categoryId = 0;
  submitted = false;
  taskExists = false;

  titleMaxLength = 100;
  descriptionMaxLength = 500;
  dateErrorMessage = '';

  constructor(private  readonly taskService: TaskService) {}

  onSubmit(): void {
    this.submitted = true;


    if (this.title.trim().length > this.titleMaxLength) {
      return;
    }


    if (this.description.trim().length > this.descriptionMaxLength) {
      return;
    }


    if (new Date(this.dueDate) < new Date()) {
      this.dateErrorMessage = 'La date d\'échéance ne peut pas être dans le passé!';
      return;
    } else {
      this.dateErrorMessage = '';
    }

    if (this.taskToEdit) {
      this.updateTask();
    } else {
      this.addTask();
    }

    this.resetForm();
    this.formSubmitted.emit();
  }

  private updateTask(): void {
    const updatedTask: TasksModel = {
      ...this.taskToEdit!,
      title: this.title.trim(),
      description: this.description.trim(),
      dueDate: this.dueDate.trim(),
      priority: this.priority,
      status: this.status,
      categoryId: this.categoryId,
    };
    this.taskService.updateTask(updatedTask);
  }

  private addTask(): void {
    const newTask: TasksModel = {
      id: this.generateUniqueId(),
      title: this.title.trim(),
      description: this.description.trim(),
      dueDate: this.dueDate.trim(),
      priority: this.priority,
      status: this.status,
      categoryId: this.categoryId,
    };
    this.taskService.addTask(newTask);
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.dueDate = '';
    this.priority = 'medium';
    this.status = 'not-started';
    this.categoryId = 0;
    this.submitted = false;
  }

  private generateUniqueId(): number {
    const tasks = this.taskService.getTasks();
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  }
}

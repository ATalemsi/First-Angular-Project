import { Component } from '@angular/core';
import {TasksModel} from "../models/tasks.model";
import {NgForOf} from "@angular/common";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: TasksModel[] = [];


  taskPriorities = [
    { name: 'High', value: 10 },
    { name: 'Medium', value: 20 },
    { name: 'Low', value: 5 }
  ];

  view: [number, number] = [700, 400];
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor() {}

  ngOnInit(): void {

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = tasks ;

    const highPriority = tasks.filter((task: TasksModel) => task.priority === 'high').length;
    const mediumPriority = tasks.filter((task: TasksModel) => task.priority === 'medium').length;
    const lowPriority = tasks.filter((task: TasksModel) => task.priority === 'low').length;


    this.taskPriorities = [
      { name: 'High', value: highPriority },
      { name: 'Medium', value: mediumPriority },
      { name: 'Low', value: lowPriority }
    ];
  }
}

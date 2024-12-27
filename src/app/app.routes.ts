import { Routes } from '@angular/router';
import {CategoryComponent} from "./categories/category.component";
import {TaskComponent} from "./tasks/task.component";

export const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'tasks', component: TaskComponent },
];

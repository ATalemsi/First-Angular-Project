import { Routes } from '@angular/router';
import {CategoryComponent} from "./categories/category.component";

export const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: '**', redirectTo: '/categories' },
];

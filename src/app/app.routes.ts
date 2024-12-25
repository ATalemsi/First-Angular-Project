import { Routes } from '@angular/router';
import {CategoryComponent} from "./categories/category.component";

export const routes: Routes = [
  { path: 'categories', component: CategoryComponent }, // Route for Categories
  { path: '', redirectTo: '/categories', pathMatch: 'full' }, // Redirect to Categories as default
  { path: '**', redirectTo: '/categories' }, // Wildcard route for 404
];

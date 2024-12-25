import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {CategoryComponent} from "./app/categories/category.component";

bootstrapApplication(CategoryComponent, appConfig)
  .catch((err) => console.error(err));

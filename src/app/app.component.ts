import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CategoryComponent} from "./categories/category.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CategoryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';
}

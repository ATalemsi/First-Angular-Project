import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../models/categories.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() editCategoryEvent = new EventEmitter<Category>();
  @Output() deleteCategoryEvent = new EventEmitter<Category>();

  editCategory(category: Category) {
    this.editCategoryEvent.emit(category);
  }

  deleteCategory(category: Category) {
    this.deleteCategoryEvent.emit(category);  // Emit the category to delete
  }
}

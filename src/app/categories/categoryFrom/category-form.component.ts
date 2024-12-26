import {Component, EventEmitter, OnInit, Output ,Input} from '@angular/core';
import {Category} from "../../models/categories.model";
import {CategoriesService} from "../../services/category/categories.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() categoryToEdit: Category | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  categoryName = '';
  submitted = false;
  categoryExists = false;

  constructor(private readonly categoryService: CategoriesService) {}

  ngOnInit(): void {
    if (this.categoryToEdit) {
      this.categoryName = this.categoryToEdit.name;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.categoryName.trim()) {
      // Reset duplicate validation if the input is empty
      this.categoryExists = false;
      return; // Stop execution for empty input
    }

    // Check for duplicate
    if (this.isCategoryDuplicate(this.categoryName)) {
      this.categoryExists = true;
      return; // Stop execution for duplicate input
    }

    // If validations pass, proceed with add or update
    this.categoryExists = false;

    if (this.categoryToEdit) {
      this.updateCategory();
    } else {
      this.addCategory();
    }

    // Reset form and emit event
    this.resetForm();
    this.formSubmitted.emit();
  }

  private updateCategory(): void {
    const updatedCategory: Category = {
      ...this.categoryToEdit!,
      name: this.categoryName.trim(),
    };
    this.categoryService.updateCategory(updatedCategory);
  }

  private addCategory(): void {
    const newCategory: Category = {
      id: this.generateUniqueId(),
      name: this.categoryName.trim(),
      tasks: []
    };
    this.categoryService.addCategory(newCategory);
  }

  private resetForm(): void {
    this.categoryName = '';
    this.categoryToEdit = null;
    this.submitted = false;
    this.categoryExists = false;
  }

  resetValidation(): void {
    this.categoryExists = false;
    this.submitted = false;
  }

  private isCategoryDuplicate(name: string): boolean {
    const categories = this.categoryService.getCategories();
    return categories.some(category => category.name.toLowerCase() === name.toLowerCase());
  }


  private generateUniqueId(): number {
    const categories = this.categoryService.getCategories();
    return categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
  }
}

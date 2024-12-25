import {Component, EventEmitter, OnInit, Output ,Input} from '@angular/core';
import {Category} from "../../models/categories.model";
import {CategoriesService} from "../../services/category/categories.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() categoryToEdit: Category | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  categoryName = '';

  constructor(private readonly categoryService: CategoriesService) {}

  ngOnInit(): void {
    if (this.categoryToEdit) {
      this.categoryName = this.categoryToEdit.name;
    }
  }

  onSubmit(): void {
    if (!this.categoryName.trim()) {
      alert('Category name cannot be empty!');
      return;
    }
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

  private resetForm(): void {
    this.categoryName = '';
    this.categoryToEdit = null;
  }

  private addCategory(): void {
    const newCategory: Category = {
      id: this.generateUniqueId(),
      name: this.categoryName.trim(),
    };
    this.categoryService.addCategory(newCategory);
  }

  private generateUniqueId(): number {
    const categories = this.categoryService.getCategories();
    return categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
  }
}


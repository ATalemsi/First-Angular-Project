import { Injectable } from '@angular/core';
import {Category} from "../../models/categories.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly storageKey ='categories';

  constructor() {}

  getCategories(): Category[] {
    const categories = localStorage.getItem(this.storageKey);
    return categories ? JSON.parse(categories) : [];
  }

  addCategory(category: Category) {
    const categories = this.getCategories();
    categories.push(category);
    this.saveToLocalStorage(categories);
  }

  updateCategory(updateCategory: Category) {
    const categories = this.getCategories().map(category =>
      category.id === updateCategory.id ? updateCategory : category
    );
    this.saveToLocalStorage(categories);
  }

  deleteCategory(id: number) {
    const categories = this.getCategories().filter(category => category.id !== id);
    this.saveToLocalStorage(categories);
  }

  private saveToLocalStorage(categories: Category[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }
}

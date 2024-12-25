import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  @Input() isOpen: boolean = true;

  constructor(private readonly router: Router) {}

  closeAside() {
    this.isOpen = false;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.closeAside();
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
}

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() toggleAside = new EventEmitter<void>();

  onToggleAside() {
    this.toggleAside.emit();
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="logo-section">
        <div class="logo">🎵</div>
        <span class="app-name">SerenityTunes</span>
      </div>
      <div class="nav-items">
        <a 
          *ngFor="let item of navItems" 
          [class.active]="activeView === item.view"
          (click)="setActiveView(item.view)">
          {{item.label}}
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #1a1a1a;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .logo {
      font-size: 2rem;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .app-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1db954;
      letter-spacing: 0.5px;
    }
    .nav-items {
      display: flex;
      gap: 2rem;
    }
    .nav-items a {
      color: #b3b3b3;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.3s;
      font-weight: 500;
    }
    .nav-items a:hover {
      color: #fff;
    }
    .nav-items a.active {
      color: #1db954;
    }
  `]
})
export class NavbarComponent {
  @Output() viewChange = new EventEmitter<string>();
  activeView: string = 'home';
  
  navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Artists', view: 'artists' },
    { label: 'Playlists', view: 'playlists' }
  ];

  setActiveView(view: string): void {
    this.activeView = view;
    this.viewChange.emit(view);
  }
}
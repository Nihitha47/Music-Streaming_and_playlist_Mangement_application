import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongPlayerComponent } from './components/song-player/song-player.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavbarComponent,
    SongListComponent,
    SongPlayerComponent,
    PlaylistManagerComponent,
    ArtistsListComponent
  ],
  template: `
    <div class="app">
      <app-navbar (viewChange)="currentView = $event"></app-navbar>
      
      <main class="content">
        <div *ngIf="currentView === 'home'">
          <app-song-list></app-song-list>
        </div>
        
        <div *ngIf="currentView === 'artists'">
          <app-artists-list></app-artists-list>
        </div>
        
        <div *ngIf="currentView === 'playlists'">
          <app-playlist-manager></app-playlist-manager>
        </div>
      </main>
      
      <app-song-player></app-song-player>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background: #121212;
      padding-bottom: 120px;
    }
    .content {
      max-width: 1200px;
      margin: 0 auto;
    }
    .now-playing-page {
      padding: 2rem;
    }
    .now-playing-page h2 {
      color: #fff;
      margin-bottom: 2rem;
    }
  `]
})
export class App {
  currentView: string = 'home';
}

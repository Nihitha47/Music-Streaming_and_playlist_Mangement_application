import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="playlist-manager">
      <h2>Playlists</h2>
      
      <div class="create-form" *ngIf="showCreateForm">
        <input 
          [(ngModel)]="newPlaylistName" 
          placeholder="Playlist name"
          (keyup.enter)="createPlaylist()">
        <input 
          [(ngModel)]="newPlaylistDesc" 
          placeholder="Description"
          (keyup.enter)="createPlaylist()">
        <button (click)="createPlaylist()">Create</button>
        <button (click)="showCreateForm = false">Cancel</button>
      </div>
      
      <button 
        *ngIf="!showCreateForm" 
        (click)="showCreateForm = true" 
        class="create-btn">
        + New Playlist
      </button>
      
      <div class="playlists">
        <div 
          *ngFor="let playlist of playlists" 
          class="playlist-item">
          <div 
            *ngIf="editingId !== playlist.id" 
            class="playlist-view">
            <div class="playlist-info">
              <span class="name">{{playlist.name}}</span>
              <span class="description">{{playlist.description}}</span>
              <span class="song-count">{{playlist.songCount}} songs</span>
            </div>
            <div class="playlist-actions">
              <button (click)="startEdit(playlist)">✏</button>
              <button (click)="deletePlaylist(playlist.id)">🗑</button>
            </div>
          </div>
          
          <div 
            *ngIf="editingId === playlist.id" 
            class="playlist-edit">
            <input [(ngModel)]="editName" placeholder="Name">
            <input [(ngModel)]="editDesc" placeholder="Description">
            <button (click)="saveEdit(playlist)">Save</button>
            <button (click)="cancelEdit()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .playlist-manager {
      padding: 2rem;
    }
    h2 {
      color: #fff;
      margin-bottom: 1rem;
    }
    .create-form, .playlist-edit {
      background: #282828;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      display: flex;
      gap: 0.5rem;
    }
    input {
      flex: 1;
      background: #3e3e3e;
      border: none;
      color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
    }
    button {
      background: #1db954;
      border: none;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: #1ed760;
    }
    .create-btn {
      margin-bottom: 1rem;
      width: 100%;
    }
    .playlists {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .playlist-item {
      background: #282828;
      border-radius: 4px;
    }
    .playlist-view {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .playlist-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .name {
      color: #fff;
      font-weight: 500;
    }
    .description {
      color: #b3b3b3;
      font-size: 0.875rem;
    }
    .song-count {
      color: #b3b3b3;
      font-size: 0.75rem;
    }
    .playlist-actions {
      display: flex;
      gap: 0.5rem;
    }
    .playlist-actions button {
      background: none;
      border: 1px solid #b3b3b3;
      color: #b3b3b3;
      padding: 0.5rem;
    }
  `]
})
export class PlaylistManagerComponent implements OnInit {
  playlists: PlaylistModel[] = [];

  showCreateForm: boolean = false;
  newPlaylistName: string = '';
  newPlaylistDesc: string = '';
  
  editingId: number | null = null;
  editName: string = '';
  editDesc: string = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.playlists$.subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  createPlaylist(): void {
    if (this.newPlaylistName.trim()) {
      this.playlistService.createPlaylist(this.newPlaylistName, this.newPlaylistDesc);
      this.newPlaylistName = '';
      this.newPlaylistDesc = '';
      this.showCreateForm = false;
    }
  }

  startEdit(playlist: PlaylistModel): void {
    this.editingId = playlist.id;
    this.editName = playlist.name;
    this.editDesc = playlist.description;
  }

  saveEdit(playlist: PlaylistModel): void {
    this.playlistService.updatePlaylist(playlist.id, this.editName, this.editDesc);
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editName = '';
    this.editDesc = '';
  }

  deletePlaylist(id: number): void {
    this.playlistService.deletePlaylist(id);
  }
}

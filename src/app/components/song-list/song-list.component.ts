import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongModel } from '../../models/song.model';
import { AudioService } from '../../services/audio.service';
import { MusicService } from '../../services/music.service';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistModel } from '../../models/playlist.model';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="song-list">
      <h2>Songs</h2>
      <div class="songs">
        <div 
          *ngFor="let song of songs" 
          class="song-item"
          [ngClass]="{'playing': currentSongId === song.id}">
          <div class="song-info">
            <span class="title">{{song.title}}</span>
            <span class="artist">{{getArtistName(song.artistId)}}</span>
            <span class="duration">{{song.getDurationFormatted()}}</span>
          </div>
          <div class="song-actions">
            <button (click)="playSong(song.id)">
              {{currentSongId === song.id ? '⏸' : '▶'}}
            </button>
            <button (click)="addToPlaylist(song.id)">+</button>
            <button 
              (click)="toggleFavorite(song)"
              [ngStyle]="{'color': song.isFavorite ? '#1db954' : '#b3b3b3'}">
              ♥
            </button>
          </div>
        </div>
      </div>

      <!-- Playlist Selection Modal -->
      <div class="modal" *ngIf="showPlaylistModal" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Add to Playlist</h3>
          <div class="playlist-options">
            <div 
              *ngFor="let playlist of availablePlaylists"
              class="playlist-option"
              (click)="addSongToSelectedPlaylist(playlist.id)">
              <span>{{playlist.name}}</span>
              <span class="song-count">{{playlist.songCount}} songs</span>
            </div>
          </div>
          <button class="close-btn" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .song-list {
      padding: 2rem;
    }
    h2 {
      color: #fff;
      margin-bottom: 1rem;
    }
    .songs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .song-item {
      background: #282828;
      padding: 1rem;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.3s;
    }
    .song-item:hover {
      background: #3e3e3e;
    }
    .song-item.playing {
      background: #1db954;
    }
    .song-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .title {
      color: #fff;
      font-weight: 500;
    }
    .artist {
      color: #b3b3b3;
      font-size: 0.875rem;
    }
    .duration {
      color: #b3b3b3;
      font-size: 0.875rem;
    }
    .song-actions {
      display: flex;
      gap: 0.5rem;
    }
    button {
      background: none;
      border: 1px solid #b3b3b3;
      color: #b3b3b3;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    button:hover {
      background: #fff;
      color: #000;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: #282828;
      padding: 2rem;
      border-radius: 8px;
      min-width: 400px;
      max-width: 500px;
    }
    .modal-content h3 {
      color: #fff;
      margin-bottom: 1.5rem;
    }
    .playlist-options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      max-height: 300px;
      overflow-y: auto;
    }
    .playlist-option {
      background: #3e3e3e;
      padding: 1rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      transition: background 0.3s;
    }
    .playlist-option:hover {
      background: #1db954;
    }
    .playlist-option span {
      color: #fff;
    }
    .song-count {
      color: #b3b3b3;
      font-size: 0.875rem;
    }
    .close-btn {
      width: 100%;
      background: #3e3e3e;
      color: #fff;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .close-btn:hover {
      background: #4e4e4e;
    }
  `]
})
export class SongListComponent implements OnInit {
  currentSongId: number | null = null;
  showPlaylistModal: boolean = false;
  selectedSongId: number | null = null;
  availablePlaylists: PlaylistModel[] = [];
  
  constructor(
    private audioService: AudioService,
    private musicService: MusicService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.musicService.setSongs(this.songs, this.artists);
    this.musicService.currentSongId$.subscribe(id => {
      this.currentSongId = id;
    });
    this.playlistService.playlists$.subscribe(playlists => {
      this.availablePlaylists = playlists;
    });
  }

  songs: SongModel[] = [
    new SongModel(1, 'Peaceful Morning', 200, 1, 1, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
    new SongModel(2, 'Calm Waters', 234, 2, 1, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'),
    new SongModel(3, 'Relaxing Breeze', 263, 2, 1, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'),
    new SongModel(4, 'Gentle Waves', 203, 3, 2, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'),
  ];

  artists = [
    { id: 1, name: 'Serenity Sounds' },
    { id: 2, name: 'Calm Vibes' },
    { id: 3, name: 'Peaceful Melodies' }
  ];

  getArtistName(artistId: number): string {
    return this.artists.find(a => a.id === artistId)?.name || 'Unknown Artist';
  }

  playSong(songId: number): void {
    this.musicService.playSong(songId);
  }

  addToPlaylist(songId: number): void {
    this.selectedSongId = songId;
    this.showPlaylistModal = true;
  }

  addSongToSelectedPlaylist(playlistId: number): void {
    if (this.selectedSongId !== null) {
      this.playlistService.addSongToPlaylist(playlistId, this.selectedSongId);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showPlaylistModal = false;
    this.selectedSongId = null;
  }

  toggleFavorite(song: SongModel): void {
    song.toggleFavorite();
  }
}

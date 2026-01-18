import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaylistModel } from '../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistsSubject = new BehaviorSubject<PlaylistModel[]>([
    new PlaylistModel(1, 'Relaxation Mix', 'Perfect for meditation and relaxation', [1, 2]),
    new PlaylistModel(2, 'Sleep Sounds', 'Calm music for better sleep', [3, 4]),
    new PlaylistModel(3, 'Morning Calm', 'Start your day peacefully', [1, 3]),
  ]);

  playlists$ = this.playlistsSubject.asObservable();

  getPlaylists(): PlaylistModel[] {
    return this.playlistsSubject.value;
  }

  addSongToPlaylist(playlistId: number, songId: number): void {
    const playlists = this.playlistsSubject.value;
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.addSong(songId);
      this.playlistsSubject.next([...playlists]);
    }
  }

  createPlaylist(name: string, description: string): void {
    const playlists = this.playlistsSubject.value;
    const newId = Math.max(...playlists.map(p => p.id), 0) + 1;
    playlists.push(new PlaylistModel(newId, name, description));
    this.playlistsSubject.next([...playlists]);
  }

  updatePlaylist(id: number, name: string, description: string): void {
    const playlists = this.playlistsSubject.value;
    const playlist = playlists.find(p => p.id === id);
    if (playlist) {
      playlist.name = name;
      playlist.description = description;
      this.playlistsSubject.next([...playlists]);
    }
  }

  deletePlaylist(id: number): void {
    const playlists = this.playlistsSubject.value.filter(p => p.id !== id);
    this.playlistsSubject.next(playlists);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SongModel } from '../models/song.model';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private songs: SongModel[] = [];
  private currentSongIndex: number = -1;
  private artists: { id: number; name: string }[] = [];
  private currentSongIdSubject = new BehaviorSubject<number | null>(null);
  
  currentSongId$ = this.currentSongIdSubject.asObservable();

  constructor(private audioService: AudioService) {}

  setSongs(songs: SongModel[], artists: { id: number; name: string }[]): void {
    this.songs = songs;
    this.artists = artists;
  }

  playSong(songId: number): void {
    const index = this.songs.findIndex(s => s.id === songId);
    if (index !== -1) {
      this.currentSongIndex = index;
      const song = this.songs[index];
      const artist = this.artists.find(a => a.id === song.artistId)?.name || 'Unknown';
      this.audioService.playSong(song.url, song.id, song.title, artist, song.duration);
      this.currentSongIdSubject.next(song.id);
    }
  }

  nextSong(): void {
    if (this.currentSongIndex < this.songs.length - 1) {
      this.currentSongIndex++;
      this.playSong(this.songs[this.currentSongIndex].id);
    }
  }

  previousSong(): void {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.playSong(this.songs[this.currentSongIndex].id);
    }
  }

  getCurrentSongId(): number | null {
    return this.currentSongIndex >= 0 ? this.songs[this.currentSongIndex]?.id : null;
  }
}

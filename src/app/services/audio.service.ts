import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentSongInfo {
  title: string;
  artist: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;
  private currentSongId: number | null = null;
  private currentSongSubject = new BehaviorSubject<CurrentSongInfo>({
    title: 'No song playing',
    artist: '',
    duration: 0
  });

  currentSong$: Observable<CurrentSongInfo> = this.currentSongSubject.asObservable();

  constructor() {
    this.audio = new Audio();
  }

  playSong(url: string, songId: number, title: string, artist: string, duration: number): void {
    if (this.currentSongId === songId && !this.audio.paused) {
      this.pause();
    } else {
      if (this.currentSongId !== songId) {
        this.audio.src = url;
        this.currentSongSubject.next({ title, artist, duration });
      }
      this.audio.play();
      this.currentSongId = songId;
    }
  }

  play(url: string, songId: number): void {
    this.playSong(url, songId, 'Unknown', 'Unknown', 0);
  }

  pause(): void {
    this.audio.pause();
  }

  resume(): void {
    if (this.audio.src) {
      this.audio.play();
    }
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.currentSongId = null;
  }

  getCurrentTime(): number {
    return Math.floor(this.audio.currentTime);
  }

  getDuration(): number {
    return Math.floor(this.audio.duration) || 0;
  }

  seek(time: number): void {
    this.audio.currentTime = time;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  getCurrentSongId(): number | null {
    return this.currentSongId;
  }
}

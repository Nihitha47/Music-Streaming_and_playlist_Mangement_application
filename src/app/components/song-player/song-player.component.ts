import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongStatus } from '../../models/song.model';
import { AudioService } from '../../services/audio.service';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-song-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="player" *ngIf="currentSong">
      <div class="song-details">
        <span class="song-title">{{currentSong.title}}</span>
        <span class="song-artist">{{currentSong.artist}}</span>
      </div>
      
      <div class="controls">
        <button (click)="previous()">⏮</button>
        <button (click)="togglePlay()" class="play-btn">
          {{status === songStatus.Playing ? '⏸' : '▶'}}
        </button>
        <button (click)="next()">⏭</button>
      </div>
      
      <div class="progress">
        <span class="time">{{formatTime(currentTime)}}</span>
        <div class="progress-bar" (click)="seek($event)">
          <div 
            class="progress-fill" 
            [ngStyle]="{'width': progressPercent + '%'}">
          </div>
        </div>
        <span class="time">{{formatTime(currentSong.duration)}}</span>
      </div>
    </div>
  `,
  styles: [`
    .player {
      background: #181818;
      padding: 1rem 2rem;
      border-top: 1px solid #282828;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .song-details {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    .song-title {
      color: #fff;
      font-weight: 500;
    }
    .song-artist {
      color: #b3b3b3;
      font-size: 0.875rem;
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    button {
      background: none;
      border: none;
      color: #b3b3b3;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s;
    }
    button:hover {
      color: #fff;
    }
    .play-btn {
      font-size: 2rem;
    }
    .progress {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .time {
      color: #b3b3b3;
      font-size: 0.75rem;
      min-width: 40px;
    }
    .progress-bar {
      flex: 1;
      height: 4px;
      background: #4d4d4d;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: #1db954;
      border-radius: 2px;
      transition: width 0.1s;
    }
  `]
})
export class SongPlayerComponent implements OnInit, OnDestroy {
  songStatus = SongStatus;
  status: SongStatus = SongStatus.Stopped;
  currentTime: number = 0;
  private interval: any;
  
  constructor(
    private audioService: AudioService,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    this.audioService.currentSong$.subscribe(song => {
      this.currentSong = song;
    });

    this.interval = setInterval(() => {
      this.currentTime = this.audioService.getCurrentTime();
      if (this.audioService.isPlaying()) {
        this.status = SongStatus.Playing;
      } else {
        this.status = SongStatus.Paused;
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // ADD YOUR CURRENT PLAYING SONG INFO HERE
  currentSong = {
    title: 'No song playing',
    artist: '',
    duration: 0
  };

  get progressPercent(): number {
    return (this.currentTime / this.currentSong.duration) * 100;
  }

  togglePlay(): void {
    if (this.audioService.isPlaying()) {
      this.audioService.pause();
      this.status = SongStatus.Paused;
    } else {
      this.audioService.resume();
      this.status = SongStatus.Playing;
    }
  }

  previous(): void {
    this.musicService.previousSong();
  }

  next(): void {
    this.musicService.nextSong();
  }

  seek(event: MouseEvent): void {
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * this.currentSong.duration);
    this.audioService.seek(newTime);
    this.currentTime = newTime;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

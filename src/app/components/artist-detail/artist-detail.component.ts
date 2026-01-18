import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistModel } from '../../models/artist.model';
import { SongModel } from '../../models/song.model';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="artist-detail" *ngIf="selectedArtist">
      <div class="artist-header">
        <img 
          *ngIf="selectedArtist.imageUrl" 
          [src]="selectedArtist.imageUrl" 
          [alt]="selectedArtist.name">
        <div 
          *ngIf="!selectedArtist.imageUrl" 
          class="placeholder-image">
          {{selectedArtist.name.charAt(0)}}
        </div>
        <h2>{{selectedArtist.name}}</h2>
      </div>
      
      <div class="artist-bio">
        <h3>Biography</h3>
        <p>{{selectedArtist.bio}}</p>
      </div>
      
      <div class="top-tracks">
        <h3>Top Tracks</h3>
        <div class="tracks">
          <div 
            *ngFor="let track of topTracks; let i = index" 
            class="track-item"
            [ngClass]="{'playing': playingTrackId === track.id}">
            <span class="track-number">{{i + 1}}</span>
            <div class="track-info">
              <span class="track-title">{{track.title}}</span>
              <span class="track-duration">{{track.getDurationFormatted()}}</span>
            </div>
            <button 
              (click)="playTrack(track.id)"
              [ngStyle]="{'color': playingTrackId === track.id ? '#1db954' : '#b3b3b3'}">
              {{playingTrackId === track.id ? '⏸' : '▶'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .artist-detail {
      padding: 2rem;
    }
    .artist-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    img, .placeholder-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
    .placeholder-image {
      background: #1db954;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: #fff;
      font-weight: bold;
    }
    h2 {
      color: #fff;
      font-size: 2rem;
    }
    h3 {
      color: #fff;
      margin-bottom: 1rem;
    }
    .artist-bio {
      margin-bottom: 2rem;
    }
    .artist-bio p {
      color: #b3b3b3;
      line-height: 1.6;
    }
    .tracks {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .track-item {
      background: #282828;
      padding: 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: background 0.3s;
    }
    .track-item:hover {
      background: #3e3e3e;
    }
    .track-item.playing {
      background: #1db954;
    }
    .track-number {
      color: #b3b3b3;
      font-size: 0.875rem;
      min-width: 20px;
    }
    .track-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
    .track-title {
      color: #fff;
      font-weight: 500;
    }
    .track-duration {
      color: #b3b3b3;
      font-size: 0.875rem;
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
  `]
})
export class ArtistDetailComponent {
  selectedArtist: ArtistModel | null = null;
  topTracks: SongModel[] = [];
  playingTrackId: number | null = null;

  constructor(private musicService: MusicService) {
    // ADD YOUR ARTIST INFO HERE
    this.selectedArtist = new ArtistModel(
      1,
      'Serenity Sounds',
      'A collective of musicians dedicated to creating peaceful and relaxing instrumental music. Known for their calming melodies that help listeners unwind and find inner peace.',
      ''
    );
    
    // ADD YOUR TOP TRACKS HERE
    this.topTracks = [
      new SongModel(1, 'Peaceful Morning', 200, 1, 1, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
      new SongModel(2, 'Calm Waters', 234, 2, 1, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'),
      new SongModel(3, 'Relaxing Breeze', 263, 2, 1, false, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'),
    ];
    
    this.selectedArtist.setTopTracks(this.topTracks.map(t => t.id));
  }

  playTrack(trackId: number): void {
    this.musicService.playSong(trackId);
    this.playingTrackId = trackId;
  }
}

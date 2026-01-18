import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="artists-list">
      <h2>Artists</h2>
      <div class="artists">
        <div 
          *ngFor="let artist of artists" 
          class="artist-card">
          <div class="artist-image" *ngIf="!artist.imageUrl">
            {{artist.name.charAt(0)}}
          </div>
          <img *ngIf="artist.imageUrl" [src]="artist.imageUrl" [alt]="artist.name">
          <div class="artist-info">
            <h3>{{artist.name}}</h3>
            <p class="genre">{{artist.genre}}</p>
            <p class="song-count">{{artist.songCount}} songs</p>
            <p class="bio">{{artist.bio}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .artists-list {
      padding: 2rem;
    }
    h2 {
      color: #fff;
      margin-bottom: 1.5rem;
    }
    .artists {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .artist-card {
      background: #282828;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      transition: background 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .artist-card:hover {
      background: #3e3e3e;
    }
    .artist-image, img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1db954;
      font-size: 2.5rem;
      color: #fff;
      font-weight: bold;
      flex-shrink: 0;
    }
    img {
      object-fit: cover;
    }
    h3 {
      color: #fff;
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
    }
    .genre {
      color: #1db954;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .song-count {
      color: #b3b3b3;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    .bio {
      color: #b3b3b3;
      font-size: 0.875rem;
      line-height: 1.5;
      text-align: left;
    }
  `]
})
export class ArtistsListComponent {
  artists = [
    { 
      id: 1, 
      name: 'Serenity Sounds', 
      imageUrl: '', 
      songCount: 1,
      bio: 'A collective of talented musicians who specialize in ambient and peaceful instrumental music. Founded in 2018, they have helped millions find tranquility through their soothing compositions. Known for their unique blend of natural sounds with gentle melodies.',
      genre: 'Ambient/Relaxation'
    },
    { 
      id: 2, 
      name: 'Calm Vibes', 
      imageUrl: '', 
      songCount: 2,
      bio: 'Award-winning producer and composer dedicated to creating music that promotes mental wellness and relaxation. With over 10 years of experience in sound therapy, Calm Vibes has released multiple albums focusing on stress relief and meditation.',
      genre: 'Meditation/Wellness'
    },
    { 
      id: 3, 
      name: 'Peaceful Melodies', 
      imageUrl: '', 
      songCount: 1,
      bio: 'An ensemble of classically trained musicians who blend traditional instruments with modern production techniques. Their music is characterized by flowing piano arrangements, soft strings, and ethereal soundscapes perfect for unwinding.',
      genre: 'Neo-Classical/Ambient'
    }
  ];
}

export enum SongStatus {
  Playing = 'PLAYING',
  Paused = 'PAUSED',
  Stopped = 'STOPPED'
}

export interface Song {
  id: number;
  title: string;
  duration: number;
  artistId: number;
  albumId: number;
  isFavorite: boolean;
  url: string;
}

export class SongModel implements Song {
  constructor(
    public id: number,
    public title: string,
    public duration: number,
    public artistId: number,
    public albumId: number,
    public isFavorite: boolean = false,
    public url: string = ''
  ) {}

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  getDurationFormatted(): string {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

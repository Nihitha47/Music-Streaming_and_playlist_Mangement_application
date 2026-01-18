export interface Album {
  id: number;
  title: string;
  artistId: number;
  releaseYear: number;
  coverUrl: string;
}

export class AlbumModel implements Album {
  private _songIds: number[] = [];

  constructor(
    public id: number,
    public title: string,
    public artistId: number,
    public releaseYear: number,
    public coverUrl: string = ''
  ) {}

  get songIds(): number[] {
    return this._songIds;
  }

  addSong(songId: number): void {
    if (!this._songIds.includes(songId)) {
      this._songIds.push(songId);
    }
  }
}

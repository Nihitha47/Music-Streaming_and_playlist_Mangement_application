export interface Artist {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
}

export class ArtistModel implements Artist {
  private _topTracks: number[] = [];

  constructor(
    public id: number,
    public name: string,
    public bio: string,
    public imageUrl: string = ''
  ) {}

  get topTracks(): number[] {
    return this._topTracks;
  }

  setTopTracks(trackIds: number[]): void {
    this._topTracks = trackIds;
  }
}

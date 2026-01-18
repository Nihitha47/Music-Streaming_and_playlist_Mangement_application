# Customization Guide

## Where to Add Your Data

### 1. Songs (song-list.component.ts)
**Location:** `src/app/components/song-list/song-list.component.ts`

```typescript
songs: SongModel[] = [
  new SongModel(1, 'Song Title 1', 210, 1, 1),  // Change song titles
  new SongModel(2, 'Song Title 2', 195, 1, 1),  // 210 = duration in seconds
];
```

### 2. Artist Info & Images (artist-detail.component.ts)
**Location:** `src/app/components/artist-detail/artist-detail.component.ts`

```typescript
this.selectedArtist = new ArtistModel(
  1,
  'Artist Name',                           // ADD NAME HERE
  'Artist biography text here...',         // ADD BIO HERE
  'https://example.com/image.jpg'          // ADD IMAGE URL HERE
);
```

**For Images:**
- Use online image URLs (e.g., from Imgur, your server)
- Or leave empty `''` to show letter placeholder
- Format: JPG, PNG, GIF

### 3. Top Tracks (artist-detail.component.ts)
**Location:** `src/app/components/artist-detail/artist-detail.component.ts`

```typescript
this.topTracks = [
  new SongModel(1, 'Track Name', 210, 1, 1),  // Change track names
];
```

### 4. Playlists (playlist-manager.component.ts)
**Location:** `src/app/components/playlist-manager/playlist-manager.component.ts`

```typescript
playlists: PlaylistModel[] = [
  new PlaylistModel(1, 'Playlist Name', 'Description', [1, 2]),
];
```

### 5. Current Playing Song (song-player.component.ts)
**Location:** `src/app/components/song-player/song-player.component.ts`

```typescript
currentSong = {
  title: 'Song Title',    // ADD SONG NAME
  artist: 'Artist Name',  // ADD ARTIST NAME
  duration: 240           // Duration in seconds
};
```

## Time Conversion
- 180 seconds = 3:00 minutes
- 210 seconds = 3:30 minutes
- 240 seconds = 4:00 minutes
- Formula: (minutes × 60) + seconds

## Model Parameters Explained

### SongModel(id, title, duration, artistId, albumId)
- id: Unique number for each song
- title: Song name
- duration: Length in seconds
- artistId: Which artist (1, 2, etc.)
- albumId: Which album (1, 2, etc.)

### ArtistModel(id, name, bio, imageUrl)
- id: Unique number
- name: Artist name
- bio: Biography text
- imageUrl: Image URL or empty string

### PlaylistModel(id, name, description, songIds)
- id: Unique number
- name: Playlist name
- description: Playlist description
- songIds: Array of song IDs [1, 2, 3]

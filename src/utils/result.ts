import { Mapper } from './mapper'

export type SongResult = {
    timestamp: number,
    album: {
        name: string,
        image: string,
        releaseDate: string,  
    },
    artist: {
        name: string
        externalUrl: string
    },
    title: string,
    previewUrl: string,
    externalUrl: string,
    trackLength: number,
    isPlaying: boolean
}

export class SongResultMap implements Mapper<SongResult> {

    public static parseSong(result: any): SongResult {
        const { item } = result

        return {
            timestamp: result.timestamp,
            title: item.name,
            album: {
                name: item.album.name,
                image: item.album.images[0].url,
                releaseDate: item.album.release_date,
            },
            artist: {
                name: item.artists[0].name,
                externalUrl: item.artists[0].external_urls.spotify
            },
            previewUrl: item.preview_url,
            externalUrl: item.external_urls.spotify,
            trackLength: item.duration_ms,
            isPlaying: result.is_playing
        }
      }
}
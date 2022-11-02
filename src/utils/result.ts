import { Mapper } from './mapper'
import { ResponseData, SongResult } from './types'

export class SongResultMap implements Mapper<SongResult> {
    public static parseSong(result: ResponseData): SongResult {
        const { item } = result

        return {
            progress: result.progress_ms,
            title: item.name,
            album: {
                name: item.album.name,
                image: item.album.images[0].url,
                release: item.album.release_date,
            },
            artists: {
                name: item.artists.map((x: any) => x.name) as any,
                url: item.artists.map((x: any) => x.external_urls.spotify) as any
            },
            url: item.external_urls.spotify,
            length: item.duration_ms,
            isPlaying: result.is_playing
        }
      }
}
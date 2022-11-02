export type ResponseData = {
    item: {
        name: string
        album: {
            name: string
            images: [{
                url: string
            }]
            release_date: string
        }
        artists: [{
            name: string
            external_urls: string
        }]
        external_urls: {
            spotify: string
        }
        duration_ms: number
    }
    progress_ms: number
    is_playing: boolean
}

export type SongResult = {
    progress: number
    album: {
        name: string
        image: string
        release: string
    },
    artists: {
        name: string
        url: string
    },
    url: string
    title: string
    length: number
    isPlaying: boolean
}
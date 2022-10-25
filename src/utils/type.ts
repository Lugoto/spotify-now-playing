export type SongResult = {
    timestamp: number,
    album: {
        name: string,
        image: string,
        release: string,  
    },
    artist: {
        name: string
        url: string
    },
    url: string,
    title: string,
    length: number,
    isPlaying: boolean
}
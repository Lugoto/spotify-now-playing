export type SongResult = {
    timestamp: number,
    album: {
        name: string,
        image: string,
        release: string,  
    },
    artists: {
        name: string
        url: string
    },
    url: string,
    title: string,
    length: number,
    isPlaying: boolean
}
import { SpotifyService } from 'spotify-now-playing'

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env

const App = async () => {
    const spotify = new SpotifyService(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)
    const song = await spotify.getCurrentSong()

    if(!song.isPlaying) {
        return console.log('not playing anything')
    }
    
    console.log(`Listening to **${song.title}** by ${song.artist.name}`)
}

App()


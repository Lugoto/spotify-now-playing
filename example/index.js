import { SpotifyService } from 'spotify-now-playing'

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env

const Example = async () => {
    const spotify = new SpotifyService(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)
    const song = await spotify.getCurrentSong()

    if(!song.isPlaying) {
        return console.log('not listening to anything')
    }
    
    console.log(`Listening to **${song.title}** by ${song.artist.name}`)

    console.log(`Progress: ${ toMinutes(song.progress )}`)
    console.log(`Time left: ${ toMinutes(song.trackLength - song.progress) }`)
}


function toMinutes(ms) {
    var min = Math.floor((ms / 1000 / 60) << 0)
    var sec = Math.floor((ms / 1000) % 60)

    return `${min}:${sec}`
}


Example()

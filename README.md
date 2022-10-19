🎧 lightweight libary to display your currently played song 🎵

## 🖊 Getting started

### ⏪ Prerequities

1. Create an application in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
    - Click on the `Edit settings` button
    - Set the `Redirect URIs` to a convenient location <sup>_(doesn't matter)_</sup>
    - Save the given `Client ID` along with the `Client Secret`
2. Retrieve the access code
    - Visit the following URL after replacing `$CLIENT_ID`, `$SCOPE`, and `$REDIRECT_URI` 
        ```url
          https://accounts.spotify.com/authorize?response_type=code&client_id=$CLIENT_ID&scope=$SCOPE&redirect_uri=$REDIRECT_URI 
        ```
    - You can choose scope(s) by visiting the [Spotify API docs](https://developer.spotify.com/documentation/general/guides/authorization/scopes/)
3. Note `code` from the URL you were redirected to
4. Acquire your refresh token
    - Run the following CURL command
      ```ps
        curl -X POST https://accounts.spotify.com/api/token -d "client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&grant_type=authorization_code&code=$CODE&redirect_uri=$REDIRECT_URI"
      ```
    - Either replace or export the variables in your shell (`$CILENT_ID`, `$CLIENT_SECRET`, `$CODE`, and `$REDIRECT_URI`)
5. Save `refresh_token` for later 

---

### 📚 Installation

##### npm 🐻

> `npm i spotify-now-playing --save-dev`

##### or yarn 🧶

> `yarn add spotify-now-playing --dev`

---

### 👨‍💻 Usage

```ts
import { SpotifyService } from 'spotify-now-playing'

const App = async () => {
    const spotify = new SpotifyService(CLIENT_ID!, CLIENT_SECRET!, REFRESH_TOKEN!)
    const song = await spotify.getCurrentSong()

    if(!song.isPlaying) {
        return console.log('not playing anything')
    }
    
    console.log(`Listening to **${song.title}** by ${song.artist.name}`)
}
```

<div align="center">  
    <img src="https://github.com/bigarmTomi/spotify-now-playing/blob/master/docs/spotify-1.png" />
    <img src="https://github.com/bigarmTomi/spotify-now-playing/blob/master/docs/spotify-2.png" />
    <img src="https://github.com/bigarmTomi/spotify-now-playing/blob/master/docs/spotify-3.png" />
</div>

---


![](https://img.shields.io/github/workflow/status/bigarmTomi/spotify-now-playing/CI)
![](https://img.shields.io/github/license/bigarmTomi/spotify-now-playing)
![](https://img.shields.io/github/package-json/v/bigarmTomi/spotify-now-playing)

A lightweight Spotify API wrapper that allows you to display the music you're currently listening to 🎸🎺

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

const Example = async () => {
    const spotify = new SpotifyService(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)
    const song = await spotify.getCurrentSong()

    if(!song.isPlaying) {
        return console.log('not listening to anything')
    }
    
    console.log(`Listening to **${song.title}** by ${song.artist.name}`)
}
```
The full example can be found by [clicking here](https://github.com/bigarmTomi/spotify-now-playing/tree/master/example)

---

#### Use can also use the library in frameworks such as Next or React 

`/api/spotify.ts`
```ts
import { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyService } from 'spotify-now-playing'

export default async function(req: NextApiRequest, res: NextApiResponse) {
    const spotify = new SpotifyService(CLIENT_ID!, CLIENT_SECRET!, REFRESH_TOKEN!)
    const song = await spotify.getCurrentSong()

    res.json(song)
}
```

`index.tsx`
```tsx
export default function() {
    var { data: song } = useSWR('/api/spotify', fetcher, {
        refreshInterval: 5 * 1000,
        fallbackData: 'loading',
    })

    if(song.title && !song.isPlaying) {
        return <p>Not listening to anything</p>
    }

    return(
        <div>
            <img src={ song.album?.image || 'https://cdn.albert.lol/964d7fc6' } width='150px' height='150px' />
            
            <p>Listening to <b>{ song.title }</b> by { song.artist?.name || 'unknown' }</p>

            <p>Album: { song.album?.name }</p>
            <p>Release: { song.album?.releaseDate }</p>
        </div>
    )
}
```

import { SongResult, SongResultMap } from './utils/result'

export class SpotifyService {
    private accessToken: string = ''
    
    private clientId: string
    private clientSecret: string
    private refreshToken: string

    constructor(clientId: string, clientSecret: string, refreshToken: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.refreshToken = refreshToken
    }

    private hasAccessToken(): boolean {
        return this.accessToken !== ''
    }

    private setAccessToken(token: string): void {
        this.accessToken = token
    }

    private async getAccessToken(): Promise<void> {
        let options = {
            method: 'POST',
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                refresh_token: this.refreshToken,
                grant_type: 'refresh_token',
            })
        }

        const { access_token } = await fetch('https://accounts.spotify.com/api/token', options).then((res) => res.json())

        if(!access_token) {
            throw new Error('Invalid credentials were given')
        }

        this.setAccessToken(access_token)
    }   

    public async getCurrentSong(): Promise<SongResult | unknown> {
        if(!this.hasAccessToken()) {
            await this.getAccessToken()
        }

        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            }
        }).then((res) => res.json())

        if(!response) {
            throw new Error('Couldn\'t acquire access token')
        }
        
        return SongResultMap.parseSong(response)
    }
}
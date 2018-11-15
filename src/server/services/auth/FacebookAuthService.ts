import { IAuthService, AuthResponse } from "./AuthService";
import queryString from 'querystring'
import fetch from 'isomorphic-fetch'
const redirect_uri = 'http://localhost:8080/auth/callback.facebook'

class AuthService implements IAuthService {
    constructor(private appId: number, private appSecret: string) {}

    getAuthorizeUrl = () => {
        return `https://www.facebook.com/v3.2/dialog/oauth?client_id=${this.appId}&redirect_uri=${queryString.escape(redirect_uri)}&scope=email`
    }

    getUserProfile = async (code: string) => {
        const response = await fetch(this.tokenURL(code))
        console.log(response)
        const result = await response.json()
        const token = result.access_token
        const stuff = `https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`
        const userResponse = await fetch(stuff)
 
        const { email, first_name: firstName, last_name: lastName } = await userResponse.json()
        return {
            email,
            firstName,
            lastName,
        } as AuthResponse
    }

    private tokenURL = (code: string) => `https://graph.facebook.com/v3.2/oauth/access_token?client_id=${this.appId}&redirect_uri=${redirect_uri}&client_secret=${this.appSecret}&code=${code}`
}

const appId = process.env.FACEBOOK_CLIENT_ID 
const appSecret = process.env.FACEBOOK_CLIENT_SECRET

const FacebookAuthService = new AuthService(appId, appSecret)

export default FacebookAuthService

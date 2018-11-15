import { IAuthService, AuthResponse } from "./AuthService";
import { google } from 'googleapis'

const redirect_uri = 'http://localhost:8080/auth/callback.google'


interface GoogleUserInfo {
    id: string;
    email: string;
    verifed_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
}
interface GoogleResponse {
    data: GoogleUserInfo
}

class AuthService implements IAuthService {
    private client: any;
    
    constructor(private appId: string, private appSecret: string) {

        this.client =  new google.auth.OAuth2(
            appId,
            appSecret,
            redirect_uri
          );
    }

    getAuthorizeUrl = () => {
        return this.client.generateAuthUrl({
            access_type: 'offline',
            scope: [
              'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/userinfo.email',
            ],
            prompt: 'consent',
          });
    }

    getUserProfile = async (code: string) => {
        const resposne = await this.client.getToken(code)
        this.client.setCredentials(resposne.tokens);

        const profile = await this.client.request({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo',
        }) as GoogleResponse;
        const {
            data: { email, given_name: firstName, family_name: lastName }
        } = profile

        return {
            email,
            firstName,
            lastName,
        }
    }

}

const appId = process.env.GOOGLE_CLIENT_ID
console.log(process.env)
const appSecret = process.env.GOOGLE_CLIENT_SECRET

const GoogleAuthService = new AuthService(appId, appSecret)

export default GoogleAuthService

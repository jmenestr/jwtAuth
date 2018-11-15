export interface AuthResponse {
    firstName: string;
    lastName: string;
    email: string;
}

export interface IAuthService {
    getAuthorizeUrl: () => string;
    getUserProfile: (code: string) => Promise<AuthResponse>
}

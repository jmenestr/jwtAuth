import * as React from 'react'
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';


const SocialMediaLoginButtons = ({ signup }: { signup: boolean}) =>
    <div>
        <a href='http://localhost:8080/auth/facebook'>
        <FacebookLoginButton >
            { signup ? 'Sign up with Facebook' : 'Login with Facebook' }
        </FacebookLoginButton>
        </a>
        <a href='http://localhost:8080/auth/google'>
            <GoogleLoginButton>
                { signup ? 'Sign up with Google' : 'Login with Google' }
            </GoogleLoginButton>
        </a>

    </div>

export default SocialMediaLoginButtons

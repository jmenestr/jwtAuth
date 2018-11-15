import GoogleAuthService from '../../services/auth/GoogleAuthService';
import createThirdPartAuthRoute from './baseAuth';


const googleAuthRouter = createThirdPartAuthRoute('google', GoogleAuthService)
export default googleAuthRouter

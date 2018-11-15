import express, { NextFunction, Request, Response} from 'express'
import { IAuthService } from '../../services/auth/AuthService';
import User from '../../models/user';

const createThirdPartAuthRoute = (serviceName: string, authService: IAuthService) => {
    const router = express.Router()
    router.get(`/${serviceName}`, (req: Request, res: Response, next: NextFunction) => {
        res.redirect(302, authService.getAuthorizeUrl())
        res.end()
    })
    
    
    router.get(`/callback.${serviceName}`, async (req, res, next) => {
        const code = req.query.code
        const { email, firstName, lastName } = await authService.getUserProfile(code)
        
        const [user] = await User.findOrCreate({
            where: {
            email,
            firstName,
            lastName,
            service: serviceName
        }})
        const accessToken = user.getJwtToken()
        const expires = new Date(Date.now() + 100000)
        res.cookie("accessToken", accessToken, { expires })
        res.redirect('/')
        res.end()
    })
    return router;
}

export default createThirdPartAuthRoute

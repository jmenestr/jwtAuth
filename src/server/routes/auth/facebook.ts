import createThirdPartAuthRoute from "./baseAuth";
import FacebookAuthService from "../../services/auth/FacebookAuthService";

const facebookAuthRouter = createThirdPartAuthRoute('facebook', FacebookAuthService)
export default facebookAuthRouter

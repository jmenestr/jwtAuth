import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import auth from './routes/usernameAndPassword'
import google from './routes/auth/google'
import facebook from './routes/auth/facebook'
import bodyParser from 'body-parser'
import dashboardRoutes from './routes/dashboard';
import cookieParser from 'cookie-parser'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(express.static("dist"));

app.use("/auth", auth)
app.use("/auth", google)
app.use('/auth', facebook)
app.use('/dashboard', dashboardRoutes)

app.listen(8080, () => console.log("Listening on port 8080!"));

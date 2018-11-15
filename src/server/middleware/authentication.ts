import JWT from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import express = require('express');
import User from '../models/user';
import HttpStatus from 'http-status-codes'

const dashboardRoutes = express.Router()

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        res.status(HttpStatus.NOT_FOUND).send({ error: 'No Access Token Sent'})

    }
    try {
        const token = JWT.decode(req.cookies.accessToken)
        req.token = token
    } catch (e) {
        res.status(HttpStatus.NOT_FOUND).send({ error: 'Token not decoded'})
        return;
    }

    const user = await User.findById(req.token.id)
    console.log(user)
    try {
        JWT.verify(req.cookies.accessToken, user.jwtSecret)
        req.user = user
        next()
    } catch (e) {
        res.status(HttpStatus.NOT_FOUND).send({ error: 'Token not valid'})
    }
}


export default authentication

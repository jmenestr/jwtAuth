import express from 'express'
import JWT from 'jsonwebtoken';
import User from '../models/user';
import authentication from '../middleware/authentication';

const dashboardRoutes = express.Router()

dashboardRoutes.get('/protectedRoute', authentication, async (req, res) => {
    res.send("Protected!")
})


export default dashboardRoutes

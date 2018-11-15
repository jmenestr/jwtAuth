import express from 'express'
import statusCodes from 'http-status-codes'
import bcrypt from 'bcrypt'
import User from '../models/user';

const router = express.Router()

const Rounds = 12
router.post('/signup', async (req, res) => {

    const { email, password } = req.body as { email: string, password: string }
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (user) {
        res.status(statusCodes.CONFLICT).send({ error: "This Email already exists"})
    } else {
        /*
            1. Hash the user password.
            2. Create a new user, and make sure you create user with a new, encrypted JWT key
            3. Create a new JWT with the user's id, and signed with the users JWT key
            4. Set back this JWT as an assess roken
        */
        const hashedPassword = await bcrypt.hash(password, Rounds)
        const [user] = await User.findOrCreate({
            where: {
            email,
            password: hashedPassword
        }})
        const accessToken = user.getJwtToken()
        const expires = new Date(Date.now() + 100000)
        res.cookie("accessToken", accessToken, { expires })
        return res.redirect("/")
        // res.end()
    }

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
            /*
            1. Hash the user password.
            2. Find the user based on their hashed password and email
            3. Create a new JWT with the user's id, and signed with the users JWT key
            4. Set back this JWT as an assess roken
        */
    console.log(`USER LOGGING IN with ${email}`)
    const hashedPassword = await bcrypt.hash(password, Rounds)
    const user = await User.findOne({
        where: {
        email,
    }})
    if (!user) {
        res.send('No User Exists')
    }
    const authed = bcrypt.compareSync(password, user.password)

    if (authed) {
        const accessToken = user.getJwtToken()
        const expires = new Date(Date.now() + 100000)
        res.cookie("accessToken", accessToken, { expires })
        res.end()
    } else {
        res.send('failed')
    }

})


export default router

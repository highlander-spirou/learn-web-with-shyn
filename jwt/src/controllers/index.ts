import { Request, Response } from "express"
import { createUser } from "../db/utils"
import { User } from "../db/schema"
import { createToken } from "../helpers/jwt"

export const signupPost = (req: Request, res: Response) => {
    const { email, password } = req.body
    createUser(email, password).then((newUser) => {
        const { token, maxAge } = createToken(newUser._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: newUser._id })
    }).catch((err) => {
        res.status(400).json({ error: err.message });
    })
}

export const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const { token, maxAge } = createToken(user._id)
        console.log('token', token)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(200).json({ user: user._id });

    } catch (err) {
        res.status(400).json({});
    }
}

import { Request, Response } from "express";
import { getUser } from "../helpers/users";
import { createAccessToken, createRefreshToken } from "../helpers/jwt";
import { createSession } from "../sessions";

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = getUser(email, password)
    if (user !== undefined) {

        const session = createSession(user.username, email)
        const accessToken = createAccessToken(session.payload)
        const refreshToken = createRefreshToken(session.id)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000 // 5 minutes
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 365 * 24 * 60 * 60 * 1000 // 365 days
        })
        res.json(session)
    } else {
        return res.status(406).json({
            message: 'Invalid credentials'
        });
    }
}

export const userView = (req: Request, res: Response) => {
    const user = req.user
    res.json(user)
}

// export const logout = (req: Request, res: Response) => {
//     res.cookie('accessToken', '', {
//         maxAge: 0,
//         httpOnly: true
//     })
//     res.cookie("refreshToken", "", {
//         maxAge: 0,
//         httpOnly: true,
//     });
//     const session = invalidateSession(req.user.sessionKey)
//     res.send({ message: `Log out ${session.email}` })
// }
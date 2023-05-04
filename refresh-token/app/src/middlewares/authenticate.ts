import { Request, Response, NextFunction } from "express";
import { createAccessToken, verifyAccessToken, verifyRefreshToken } from "../helpers/jwt";
import { getSession } from "../sessions";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const { accesstoken, refreshtoken } = req.headers as { accesstoken: string, refreshtoken: string }
    console.log('accessToken', accesstoken)
    console.log('refreshToken', refreshtoken)
    if (accesstoken && verifyAccessToken(accesstoken) !== null) {
        res.user = verifyAccessToken(accesstoken)?.payload
    }

    const decodedRefreshToken = verifyRefreshToken(refreshtoken)
    console.log('decodedRefreshToken', decodedRefreshToken)
    if (decodedRefreshToken) {
        const sessionId = decodedRefreshToken.payload.id
        const session = getSession(sessionId)
        if (!session) {
            res.status(403).send("Wrong authentication")
        } else {
            const newToken = createAccessToken(session.payload)
            res.cookie('accessToken', newToken, {
                httpOnly: true,
                maxAge: 5 * 60 * 1000 // 5 minutes
            })
            res.user = verifyAccessToken(newToken)?.payload
        }
    } else {
        res.status(403).send("Wrong authentication")
    }
    next()
}
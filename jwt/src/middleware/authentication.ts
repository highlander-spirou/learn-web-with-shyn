import { Request, Response, NextFunction } from "express";
import { User } from "../db/schema";
import { verifyToken } from "../helpers/jwt";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (token) {
        const decoded = verifyToken(token)
        if (decoded !== null) {
            next()
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (token) {
        const decoded = verifyToken(token) as null | { id: string }
        if (decoded !== null) {
            let user = await User.findById(decoded.id);
            res.locals.user = user;
        } else {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next()
}

export const authRedirect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (token) {
        res.redirect('/')
    } else {
        next()
    }
}
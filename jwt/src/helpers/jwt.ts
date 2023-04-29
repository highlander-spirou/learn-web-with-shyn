import jwt from 'jsonwebtoken'
import envVar from './env';

const secret = envVar.SECRET_KEY as string

// create json web token
const maxAge = () => 3 * 24 * 60 * 60;

const createToken = (id: any) => {
    const token = jwt.sign({ id }, secret, {
        expiresIn: maxAge()
    });
    return { token, maxAge: maxAge() }
};

const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        return null
    }
}

export { createToken, verifyToken }
import { Request, Response } from "express";
import { getUserByEmail } from "../../db/users"
import { authentication, random } from "../../helpers";

const loginCtrl = async (req: Request, res: Response) => {
    console.log('inside of login controllers')
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const userAuth = user.authentication as { password: string; salt: string; sessionToken: string }
        const expectedHash = authentication(userAuth.salt, password);

        if (userAuth.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        userAuth.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('AUTH', userAuth.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
export default loginCtrl
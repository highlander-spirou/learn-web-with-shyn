import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../db/users"
import { authentication, random } from "../../helpers";

const registerCtrl = async (req: Request, res: Response) => {
    console.log('inside of register controller')
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            res.sendStatus(400)
        }

        // Check if user existed
        const userExisted = await getUserByEmail(email)
        if (userExisted) {
            return res.sendStatus(400)
        }

        const salt = random()
        const user = await createUser({
            email, username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.sendStatus(200).end();

    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export default registerCtrl
import { User, handleSchemaError } from "./schema";

export const createUser = async (email: string, password: string) => {
    try {
        const user = await User.create({ email, password })
        return user
    } catch(err) {
        const errorClarify = handleSchemaError(err)
        console.log('new err', errorClarify)
        throw errorClarify
    }
}
import bcrypt from 'bcrypt'

export const generatePasswordHash = async (password: string) => {
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass
}

export const comparePasswordHash = async (pass1: string, pass2:string) => {
    const auth = await bcrypt.compare(pass1, pass2);
    return auth
}
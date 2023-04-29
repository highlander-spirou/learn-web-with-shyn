import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { generatePasswordHash, comparePasswordHash } from '../helpers/passwordHash'

interface IUser {
    email: string
    password: string
}

interface UserStatics extends mongoose.Model<IUser> {
    login(email: string, password: string): any
}

const userSchema = new mongoose.Schema<IUser, UserStatics>({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [3, 'Minimum password length is 3 characters'],
    }
});

userSchema.pre('save', async function (next) {
    const hashedPass = generatePasswordHash(this.password)
    this.password = await hashedPass
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await comparePasswordHash(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};



export const User = mongoose.model<IUser, UserStatics>('User', userSchema);

export const handleSchemaError = (err: any) => {
    if (err.message === 'incorrect email') {
        return new Error('That email is not registered')
    }
    // incorrect password
    if (err.message === 'incorrect password') {
        return new Error('That password is incorrect')
    }
    // duplicate email error
    if (err.code === 11000) {
        return new Error('That email is already registered')
    }
    return new Error('Validation error')
}
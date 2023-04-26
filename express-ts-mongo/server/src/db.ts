import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const { MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    MONGO_PORT, ENVIRONMENT } = process.env


const mongoPort = Number(27017 ?? MONGO_PORT)
const isDockerEnv = ENVIRONMENT === 'docker' ? 'mongodb' : 'localhost'
const mongooseURI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${isDockerEnv}:${mongoPort}/${MONGO_INITDB_DATABASE}?authSource=admin`

mongoose.set("strictQuery", false);

const profileSchema = new mongoose.Schema({
    height: { type: Number },
    weight: { type: Number },
    favDish: { type: String },
    Tweet: { type: Array }
}
)

interface IUser {
    name: string,
    email: string,
    password: string,
    gender?: boolean,
    avatar?: string,
    profile?: any,
    modifiedAt?: Date
}

interface UserStatics extends mongoose.Model<IUser> {
    findUserAuth(id: string): { email: string, password: string }
}

interface IQuery extends IUser {
    userInfo: string
}

const UserSchema = new mongoose.Schema<IUser, UserStatics>({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true, immutable: true },
    password: { type: String, required: true, select: false },
    gender: { type: Boolean },
    avatar: { type: Buffer },
    profile: profileSchema,
    modifiedAt: { type: Date, default: () => Date.now() }
})

UserSchema.statics.findUserAuth = function (id: string) {
    return this.findById(id).select({ email: 1, password: 1, _id: 0 })
}

UserSchema.virtual("userInfo").get(function () {
    return `account ${this.name} is ${this.gender ? 'male' : 'female'}`
})

const userModel = mongoose.model<IUser, UserStatics>('User', UserSchema)

async function run() {
    await mongoose.connect(mongooseURI)
    console.log('Connect to database')
    const q = await userModel.findById("64473ebf3d809e633fbaf76a") as IQuery
    console.log(q.userInfo)

}

run().catch((err) => console.log(err));
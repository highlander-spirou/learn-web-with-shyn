import mongoose from 'mongoose';
import envVar from '../helpers/env';
// import * as dotenv from 'dotenv'
// dotenv.config()

mongoose.Promise

const { MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    MONGO_PORT, ENVIRONMENT } = envVar


const mongoPort = Number(27017 ?? MONGO_PORT)
const isDockerEnv = ENVIRONMENT === 'docker' ? 'mongodb' : 'localhost'
const mongooseURI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${isDockerEnv}:${mongoPort}/${MONGO_INITDB_DATABASE}?authSource=admin`

const connectDb = () => {
    mongoose.connect(mongooseURI).then(
        () => { console.log('Connect to database') }
    ).catch(() => {
        console.log('Unable to connect to database')
    })
}

export default connectDb
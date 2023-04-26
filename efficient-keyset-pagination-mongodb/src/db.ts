import * as dotenv from 'dotenv'
import { MongoClient, Sort, FindCursor, ObjectId } from "mongodb";
import Pagination from './paginate';
// import data from '../data.json'

dotenv.config()
const { MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_PORT, ENVIRONMENT } = process.env


const mongoPort = Number(27017 ?? MONGO_PORT)
const isDockerEnv = ENVIRONMENT === 'docker' ? 'mongodb' : 'localhost'
const mongooseURI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${isDockerEnv}:${mongoPort}/?authSource=admin`

const client = new MongoClient(mongooseURI);


interface IUser {
    id: number,
    name: string,
    email: string,
    height: number,
    gender: "Male" | "Female"
}



async function run() {
    try {
        const database = client.db('maindb');
        const collectionRef = database.collection<IUser>('mocked');
        const query = {}
        const sort = {height: -1}
        // const { paginatedQuery, nextKeyFn } = generatePaginationQuery(query, sort);
        const pagination = new Pagination(collectionRef, 3, query, sort)

        const result1 = await pagination.next()
        console.log(result1)
        const result2 = await pagination.next()
        console.log(result2)

        
        

    } finally {
        await client.close();
    }
}

// async function run() {
//     const obj = JSON.parse(JSON.stringify(data));
//     const database = client.db('maindb');
//     const collectionRef = database.collection('mocked');
//     const result = await collectionRef.insertMany(obj)
//     console.log('done')
// }

// async function run() {
//     const database = client.db('maindb');
//     const collectionRef = database.collection('mocked');
//     const result = await collectionRef.createIndex({ _id: 1, height: 1 })
//     console.log('done')
// }

run().catch((err) => console.log(err));
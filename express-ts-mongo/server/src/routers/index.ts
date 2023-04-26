import { Router } from "express";
import auth from "./auth";

// root of all routes
const router = Router()

export default (): Router => {
    console.log('inside of routers/index.ts/protectedRoutes')
    auth(router)
    return router
}
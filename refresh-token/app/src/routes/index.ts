import { Router } from "express";
import { login, userView } from "../controllers";
import { authenticateToken } from "../middlewares/authenticate";



const router = Router()
router.post('/api/login', login)
router.get('/api/user', authenticateToken, userView)
export default router

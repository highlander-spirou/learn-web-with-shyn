import { Router } from "express";
import registerCtrl from "../controllers/auth/register";
import loginCtrl from "../controllers/auth/login";

// function này nhận object `router` trực tiếp từ index.ts
// và thêm vào nó các đường dẫn, như "auth/register", "auth/login"

export default (router:Router) => {
    console.log('inside of router/auth.ts')
    router.post('/auth/register', registerCtrl)
    router.post('/auth/login', loginCtrl)
}
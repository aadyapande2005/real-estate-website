import express, { Router } from "express"
import { verifyjwt } from "../middleware/verifyjwt.js"
 
const router = Router()

import {register, login, logout} from '../controllers/auth.controller.js'


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)



export default router
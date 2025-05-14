import { Router } from "express";
import { verifyjwt } from "../middleware/verifyjwt.js";

const router = Router()

import { updateUser, getUser } from "../controllers/user.controller.js";

router.get('/update', updateUser)
router.get('/get', verifyjwt, getUser)


export default router
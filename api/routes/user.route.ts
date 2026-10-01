import { Router } from "express";
import { verifyjwt } from "../middleware/verifyjwt.js";

const router = Router()

import { updateUser, getUser, getUsers, deleteUser } from "../controllers/user.controller.js";

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', verifyjwt, updateUser)
router.delete('/:id', verifyjwt, deleteUser)



export default router
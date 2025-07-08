import { Router } from "express";
import { verifyjwt } from "../middleware/verifyjwt.js";

const router = Router()

import { getChats, getChat, createChat, markAsRead } from "../controllers/chat.controller.js";

router.get('/', verifyjwt, getChats)
router.get('/:id', verifyjwt, getChat)
router.post('/:id', verifyjwt, createChat)
router.put('/read/:id', verifyjwt, markAsRead)

export default router
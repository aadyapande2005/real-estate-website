import { Router } from "express";
import { verifyjwt } from "../middleware/verifyjwt.js";

const router = Router()

import { getChats, getChat, sendMessage, markAsRead } from "../controllers/chat.controller.js";

router.get('/', verifyjwt, getChats)
router.get('/:id', verifyjwt, getChat)
router.post('/:id', verifyjwt, sendMessage)
router.get('/read/:id', verifyjwt, markAsRead)

export default router
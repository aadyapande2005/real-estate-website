import { Router } from "express";
import { verifyjwt } from "../middleware/verifyjwt.js";

const router = Router()

import { sendMessage } from "../controllers/chat.controller.js";

router.post('/:id', verifyjwt, sendMessage)

export default router
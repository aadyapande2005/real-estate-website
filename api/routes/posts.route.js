import express from 'express';
import { getPosts,getPost, createPost, updatePost, deletePost } from '../controllers/posts.controller.js';
import { verifyjwt } from '../middleware/verifyjwt.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyjwt, createPost);
router.put('/:id', verifyjwt, updatePost);
router.delete('/:id', verifyjwt, deletePost);

export default router;

import express from 'express';
import { getPosts,getPost, createPost, updatePost, deletePost, getMyPosts, toggleSavePost, getMySavedPosts } from '../controllers/posts.controller.js';
import { verifyjwt } from '../middleware/verifyjwt.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/myposts', verifyjwt, getMyPosts);
router.get('/savedposts', verifyjwt, getMySavedPosts);
router.get('/:id', getPost);
router.post('/', verifyjwt, createPost);
router.post('/savepost/:id', verifyjwt, toggleSavePost);
router.put('/:id', verifyjwt, updatePost);
router.delete('/:id', verifyjwt, deletePost);

export default router;

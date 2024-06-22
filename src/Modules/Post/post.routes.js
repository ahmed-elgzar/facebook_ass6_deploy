import { Router } from "express"; // Import Router from Express to create routes
const router = Router(); // Create a new Router instance

import * as postController from './post.controller.js'; // Import post controller methods

// Route to create a new post
router.post('/newpost', postController.createPost);

// Route to read all posts
router.get('/readposts', postController.readPosts);

// Route to update a post by its id
router.put('/updatepost/:id', postController.updatePost);

// Route to delete a post by its id
router.delete('/deletepost/:id', postController.deletePost);

// Route to get a specific post with its author by postId
router.get('/postwithauthor/:postId', postController.getPostWithAuthor);

export default router; // Export the router to be used in other parts of the application

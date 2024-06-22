import { Router } from "express"; // Import Router from Express to create routes
const router = Router(); // Create a new Router instance

import * as commentController from './comment.controller.js'; // Import comment controller methods

// Route to create a new comment
router.post('/newcomment', commentController.createComment);

// Route to read comments based on optional parameters
router.get('/readcomments', commentController.readComments);

// Route to update a comment by its id
router.put('/updatecomment/:id', commentController.updateComment);

// Route to delete a comment by its id
router.delete('/deletecomment/:id', commentController.deleteComment);

export default router; // Export the router to be used in other parts of the application

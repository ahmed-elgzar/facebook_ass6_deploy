import { Router } from "express"; // Import Router from Express to create routes
const router = Router(); // Create a new Router instance

import * as userController from './user.controller.js'; // Import user controller methods

// Route to handle user sign-up
router.post('/signup', userController.signUp);

// Route to handle user login
router.post('/login', userController.login);

// Route to get specific user data including a specific post and its comments
router.get('/user/:userId/post/:postId', userController.getSpecificData);

export default router; // Export the router to be used in other parts of the application

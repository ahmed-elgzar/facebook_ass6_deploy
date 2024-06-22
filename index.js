import express from 'express'; // Import Express framework
import { db_connection } from './DB/connection.js'; // Import database connection function
import userRouter from './src/Modules/User/user.routes.js'; // Import user routes
import postRouter from './src/Modules/Post/post.routes.js'; // Import post routes
import commentRouter from './src/Modules/Comment/comment.routes.js'; // Import comment routes

const app = express(); // Create an instance of Express application
const port = 8080; // Port number for the server

app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware to handle routes related to users
app.use(userRouter);

// Middleware to handle routes related to posts under '/posts' endpoint
app.use('/posts', postRouter);

// Middleware to handle routes related to comments under '/comment' endpoint
app.use('/comment', commentRouter);

// Establish database connection
db_connection();

// Route handler for the root endpoint
app.get('/', (req, res) => res.send('Hello World!'));

// Start the Express server and listen on specified port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

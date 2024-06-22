import User from "../../../DB/models/user.model.js"; // Import the User model
import Post from "../../../DB/models/post.model.js"; // Import the Post model
import Comment from "../../../DB/models/comment.model.js"; // Import the Comment model
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// Function to handle user sign-up
export const signUp = async (req, res) => {
    const { username, email, password } = req.body; // Extract username, email, and password from request body

    try {
        // Check if email already exists in the database
        const isEmailExist = await User.findOne({ where: { email } });

        if (isEmailExist) {
            return res.json({ message: "Email is already exist" });
        }

        // Hash the password using bcrypt
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user in the database
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Return success message and the created user
        res.json({ message: "User Created", user });
    } catch (error) {
        // Return server error message if any error occurs
        res.json({ message: "Server error", error: error.message });
    }
};

// Function to handle user login
export const login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    try {
        // Find user by email in the database
        const user = await User.findOne({ where: { email } });

        // If user not found, return an error message
        if (!user) {
            return res.json({ message: "Email or password is incorrect" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // If passwords do not match, return an error message
        if (!isPasswordValid) {
            return res.json({ message: "Email or password is incorrect" });
        }

        // Return success message and the logged-in user
        return res.json({ message: "Login successful", user });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

// Function to get specific user data including a specific post and its comments
export const getSpecificData = async (req, res) => {
    const { userId, postId } = req.params; // Extract userId and postId from request parameters

    try {
        // Find the user by userId and include the associated Post model with specific postId and its associated Comments
        const user = await User.findByPk(userId, {
            include: {
                model: Post,
                where: { id: postId },
                include: [Comment]
            }
        });

        // If user not found, return an error message
        if (!user) {
            return res.json({ message: "User not found" });
        }

        // Retrieve the first post associated with the user
        const post = user.Posts && user.Posts[0];

        // If post not found, return an error message
        if (!post) {
            return res.json({ message: "Post not found" });
        }

        // Return success message along with the retrieved user and post data
        return res.json({ message: "User, post and comments retrieved successfully", user, post });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

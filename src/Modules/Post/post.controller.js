import Post from "../../../DB/models/post.model.js"; // Import the Post model
import User from "../../../DB/models/user.model.js"; // Import the User model

// Function to create a new post
export const createPost = async (req, res) => {
    const { title, content, author } = req.body; // Extract title, content, and author from request body

    try {
        // Create a new post using Post.create()
        const newPost = await Post.create({
            title,
            content,
            author
        });

        // Return success message and the newly created post
        return res.json({ message: "Post created successfully", post: newPost });
    } catch(error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

// Function to retrieve all posts
export const readPosts = async (req, res) => {
    try {
        // Find all posts using Post.findAll()
        const posts = await Post.findAll();

        // Return success message and the retrieved posts
        res.json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
        // Return server error message if any error occurs
        res.json({ message: "Server error", error: error.message });
    }
};

// Function to update a post by its id
export const updatePost = async (req, res) => {
    const { id } = req.params; // Extract id from request parameters
    const { title, content } = req.body; // Extract updated title and content from request body

    try {
        // Find the post by id using Post.findByPk()
        const post = await Post.findByPk(id);

        // If post is not found, return an error message
        if (!post) {
            return res.json({ message: "Post not found" });
        }

        // Update the title and content of the post if provided
        post.title = title || post.title;
        post.content = content || post.content;

        // Save the updated post using post.save()
        await post.save();

        // Return success message and the updated post
        res.json({ message: "Post updated successfully", post });
    } catch (error) {
        // Return server error message if any error occurs
        res.json({ message: "Server error", error: error.message });
    }
};

// Function to delete a post by its id
export const deletePost = async (req, res) => {
    const { id } = req.params; // Extract id from request parameters
    
    try {
        // Find the post by id using Post.findByPk()
        const post = await Post.findByPk(id);

        // If post is not found, return an error message
        if (!post) {
            return res.json({ message: "Post not found" });
        }

        // Delete the post using post.destroy()
        await post.destroy();

        // Return success message
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        // Return server error message if any error occurs
        res.json({ message: "Server error", error: error.message });
    }
};

// Function to get a specific post with its author
export const getPostWithAuthor = async (req, res) => {
    const { postId } = req.params; // Extract postId from request parameters

    try {
        // Find the post by postId and include the associated User model to get author details
        const post = await Post.findByPk(postId, {
            include: {
                model: User, // Include the User model
                attributes: ['id', 'username', 'email'] // Specify attributes to include from User model
            }
        });

        // If post is not found, return an error message
        if (!post) {
            return res.json({ message: "Post not found" });
        }

        // Return success message and the retrieved post with author details
        return res.json({ message: "Post and author retrieved successfully", post });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

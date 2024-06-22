import Post from "../../../DB/models/post.model.js"; // Import the Post model
import User from "../../../DB/models/user.model.js"; // Import the User model
import Comment from '../../../DB/models/comment.model.js'; // Import the Comment model

// Function to create a new comment
export const createComment = async (req, res) => {
    const { content, UserId, PostId } = req.body; // Extract content, UserId, and PostId from request body

    try {
        // Find the user by UserId
        const user = await User.findByPk(UserId);
        // Find the post by PostId
        const post = await Post.findByPk(PostId);

        // If user or post is not found, return an error message
        if (!user) {
            return res.json({ message: "User not found" });
        }

        if (!post) {
            return res.json({ message: "Post not found" });
        }

        // Create a new comment with content, UserId, and PostId
        const newComment = await Comment.create({
            content,
            UserId,
            PostId
        });

        // Return success message and the newly created comment
        return res.json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

// Function to read comments based on optional PostId or UserId
export const readComments = async (req, res) => {
    const { PostId, UserId } = req.query; // Extract PostId and UserId from request query parameters

    try {
        let comments;

        // Depending on whether PostId or UserId is provided, fetch comments with associated user and/or post
        if (PostId) {
            comments = await Comment.findAll({ where: { PostId }, include: [User] });
        } else if (UserId) {
            comments = await Comment.findAll({ where: { UserId }, include: [Post] });
        } else {
            comments = await Comment.findAll({ include: [Post, User] });
        }

        // Return success message and the retrieved comments
        return res.json({ message: "Comments retrieved successfully", comments });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

// Function to update a comment by its id
export const updateComment = async (req, res) => {
    const { id } = req.params; // Extract id from request parameters
    const { content } = req.body; // Extract updated content from request body

    try {
        // Find the comment by id
        const comment = await Comment.findByPk(id);

        // If comment is not found, return an error message
        if (!comment) {
            return res.json({ message: "Comment not found" });
        }

        // Update the content of the comment if provided
        comment.content = content || comment.content;

        // Save the updated comment
        await comment.save();

        // Return success message and the updated comment
        return res.json({ message: "Comment updated successfully", comment });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};

// Function to delete a comment by its id
export const deleteComment = async (req, res) => {
    const { id } = req.params; // Extract id from request parameters

    try {
        // Find the comment by id
        const comment = await Comment.findByPk(id);

        // If comment is not found, return an error message
        if (!comment) {
            return res.json({ message: "Comment not found" });
        }

        // Delete the comment
        await comment.destroy();

        // Return success message
        return res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        // Return server error message if any error occurs
        return res.json({ message: "Server error", error: error.message });
    }
};
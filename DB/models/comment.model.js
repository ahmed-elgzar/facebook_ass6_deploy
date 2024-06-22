import { DataTypes } from "sequelize"; // Import DataTypes from Sequelize to define model attributes
import { sequelize } from "../connection.js"; // Import the sequelize instance from the connection module
import User from "./user.model.js"; // Import the User model
import Post from "./post.model.js"; // Import the Post model

// Define the Comment model
const Comment = sequelize.define("Comment", {
    content: {
        type: DataTypes.STRING(255), // Define content as a string with a maximum length of 255 characters
        allowNull: false, // Content field is required
    }
}, {
    timestamps: true // Enable automatic creation of createdAt and updatedAt timestamps
});

// Establish associations between User and Comment models
User.hasMany(Comment, {
    onDelete: "CASCADE", // Delete all associated comments if the user is deleted
    onUpdate: "CASCADE" // Update all associated comments if the user is updated
});
Comment.belongsTo(User); // Each comment belongs to a single user

// Establish associations between Post and Comment models
Post.hasMany(Comment, {
    onDelete: "CASCADE", // Delete all associated comments if the post is deleted
    onUpdate: "CASCADE" // Update all associated comments if the post is updated
});
Comment.belongsTo(Post); // Each comment belongs to a single post

export default Comment; // Export the Comment model for use in other parts of the application
import { DataTypes } from "sequelize"; // Import DataTypes from Sequelize to define model attributes
import { sequelize } from "../connection.js"; // Import the sequelize instance from the connection module
import User from "./user.model.js"; // Import the User model

// Define the Post model
const Post = sequelize.define("Post", {
    title: {
        type: DataTypes.STRING(55), // Define title as a string with a maximum length of 55 characters
        allowNull: false // Title field is required
    },
    content: {
        type: DataTypes.STRING, // Define content as a string
        allowNull: false, // Content field is required
    }
}, {
    timestamps: true // Enable automatic creation of createdAt and updatedAt timestamps
});

// Establish associations between User and Post models
User.hasMany(Post, {
    foreignKey: "author", // Define the foreign key in the Post model that references the User model
    onDelete: "CASCADE", // Delete all associated posts if the user is deleted
    onUpdate: "CASCADE" // Update all associated posts if the user is updated
});
Post.belongsTo(User, {
    foreignKey: 'author' // Define the foreign key in the Post model that references the User model
});

export default Post; // Export the Post model for use in other parts of the application

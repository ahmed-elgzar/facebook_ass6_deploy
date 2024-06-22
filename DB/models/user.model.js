import { DataTypes } from "sequelize"; // Import DataTypes from Sequelize to define model attributes
import { sequelize } from "../connection.js"; // Import the sequelize instance from the connection module

// Define the User model
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(55), // Define username as a string with a maximum length of 55 characters
        allowNull: false // Username field is required
    },
    email: {
        type: DataTypes.STRING, // Define email as a string
        allowNull: false, // Email field is required
        unique: true // Ensure that each email is unique
    },
    password: {
        type: DataTypes.STRING, // Define password as a string
        allowNull: false // Password field is required
    }
}, {
    timestamps: true // Enable automatic creation of createdAt and updatedAt timestamps
});

// Export the User model for use in other parts of the application
export default User;

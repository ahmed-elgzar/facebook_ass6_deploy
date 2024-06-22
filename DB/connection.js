
import { Sequelize } from "sequelize";

// Initialize Sequelize instance with database name, username, password, and configuration options
export const sequelize = new Sequelize('bnchbdniyxxuuwikmyy3', 'ufumsjffnvn9a1ky', 'CLnQFD7YmQyh3cRioeBa', {
    host: 'bnchbdniyxxuuwikmyy3-mysql.services.clever-cloud.com',
    dialect: 'mysql' // Specify the database dialect (MySQL)
})

// Function to establish the database connection and sync models
export const db_connection = async () => {
    try {
        // Sync all defined models to the database
        await sequelize.sync({ alter: true }); // alter: true will update the tables to match the models
        console.log("Connection has been established successfully");
    } catch (error) {
        // Log an error message if the connection fails
        console.error({ message: "Unable to connect to the database", error: error.message });
    }
}
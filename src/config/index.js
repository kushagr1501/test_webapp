import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config = {
    PORT: process.env.PORT || 8080,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    cloud_name: process.env.CLOUD_NAME, 
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET
};

export default config;
 
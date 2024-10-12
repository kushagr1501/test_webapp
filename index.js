// database connection 
import mongoose from "mongoose";
import config from "./src/config/index.js";
import app from "./src/app.js";

(async () => {
    try {
     
        console.log('MONGODB_URL:', config.MONGODB_URL); 

        // Attempt to connect to MongoDB
        await mongoose.connect(config.MONGODB_URL);
        console.log("Connected to MongoDB");

        app.on('error', (err) => {
            console.log("App error:", err);
            throw err;
        });

        app.listen(config.PORT, () => {
            console.log(`Listening on port ${config.PORT}`);
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message); 
        process.exit(1);  // Exit the process with failure
    }
})();

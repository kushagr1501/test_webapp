import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index.js';
import multer from 'multer';


cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.API_KEY, 
    api_secret: config.API_SECRET
});

// Configure multer for file storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Function to upload file to Cloudinary
 const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url); // The secure_url is the image URL
            }
        }).end(file.buffer); // file.buffer from multer.memoryStorage()
    });
};

export { upload, uploadToCloudinary };

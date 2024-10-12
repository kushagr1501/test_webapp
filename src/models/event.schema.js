import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [50, "Name shouldn't exceed 50 characters"]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, "Description shouldn't exceed 500 characters"] 
    },
    club: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date, // Changed to Date type
        required: true,
    },
    teamSize: {
        type: Number,
        required: true,
        min: 1, 
        max: 4 
    },
    rounds: [{
        roundName: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        }
    }],
    registrationLink: {
        type: String,
        required: true,
        trim: true,
    },
    entryFee: {
        type: Number, 
        required: true,
        min: 0, // Optional: prevent negative fees
    },
    contact: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String, 
            required: true, 
            trim: true,
        }
    }],
    imageUrl: { 
        type: String,
        required: false, 
        trim: true,
    }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;

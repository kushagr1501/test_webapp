import Event from "../models/event.schema.js";
import  asynchandler  from "../services/asynchandler.js";
import { upload, uploadToCloudinary } from '../services/cloudinary.js';

export const createEvent = asynchandler(async (req, res) => {
    // Use Multer to handle file upload
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
        }


        const { name, description, club, location, date, teamSize, rounds, registrationLink, entryFee, contact } = req.body;
        console.log(req.body  );

        try {
           
            const eventDate = new Date(date);
              console.log(eventDate)

            // Upload the image if provided
            let imageUrl = null;
            if (req.file) {
                imageUrl = await uploadToCloudinary(req.file);
            }

            // Create a new event using the provided data
            const event = new Event({
                name,
                description,
                club,
                location,
                date: eventDate,
                teamSize,
                rounds, 
                registrationLink,
                entryFee,
                contact 
            });

            await event.save();
            res.status(201).json({
                success: true,
                message: "Event created successfully",
                event
            });

        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    });
});

//get all events 
export const getAllEvents =asynchandler(async(req,res)=>{
    const events =await Event.find();
    if(!events) return res.status(404).json({message:"no evenets found"});

    res.status(200).json({
        message:"all events",
        success:true,
        events
    })
})

// Delete an event by ID
export const deleteEventById = asynchandler(async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// Get events by club
export const getEventsByClub = asynchandler(async (req, res) => {
    const { club } = req.params;

    try {
        const events = await Event.find({ club: club });

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No events found for club: ${club}`,
            });
        }

        res.status(200).json({
            success: true,
            message: `Events for club: ${club}`,
            events,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


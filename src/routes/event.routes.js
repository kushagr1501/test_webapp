import express from 'express';
import { createEvent, getAllEvents, deleteEventById, getEventsByClub } from '../controllers/event.controller.js';

const router = express.Router();


router.post('/', createEvent);
router.get('/', getAllEvents);
router.delete('/:id', deleteEventById);
router.get('/events/club/:club', getEventsByClub);

export default router;

import express from 'express';

import eventrouter from './event.routes.js';
const router = express.Router();

// Event routes
router.use('/event',eventrouter)

export default router; 

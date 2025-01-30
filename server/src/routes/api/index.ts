import { Router } from 'express';
import { movieRouter } from './movie-routes.js';

const router = Router();

// Routes for the movie app
router.use('/movies', movieRouter); // Handles all '/movies' routes


export default router;

import express from 'express';
import {getAllMovies } from '../../controllers/movie-controller.js';

const router = express.Router();

// GET /tickets - Get all tickets
router.get('/', getAllMovies);


export { router as movieRouter };

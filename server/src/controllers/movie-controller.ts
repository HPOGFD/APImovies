import { Request, Response } from 'express';
import Movie from '../models/movie-model.js';

export const getAllMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

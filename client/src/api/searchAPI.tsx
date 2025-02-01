import { FormEvent } from "react";
import { MovieData } from "../interfaces/movie.interface";


const searchMoviesAPI = async (movieTitle: string): Promise<MovieData> => {
  // Get the API key from the environment
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!API_KEY) {
    console.error("API key is missing. Please check your .env file.");
    throw new Error("API key is missing. Please check your .env file.");
  }

  // Construct the API URL
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`;
  console.log("Fetching data from URL:", url);

  try {
    // Fetch data from OMDB API
    const response = await fetch(url);
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();
    console.log("API response data:", data);

    if (data.Response === "False") {
      console.error("API error:", data.Error || "Failed to fetch movie data");
      throw new Error(data.Error || "Failed to fetch movie data");
    }

    // Format and return the movie data
    const movieData: MovieData = {
      id: data.imdbID || Date.now(), // Use IMDb ID or fallback to timestamp
      title: data.Title,
      genre: data.Genre,
      actors: data.Actors,
      description: data.Plot, // Corrected mapping for description
      releaseDate: data.Released, // Corrected mapping for release date
      poster: data.Poster,
    };

    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

 const searchForMovieByTitle = async (event: FormEvent, movieTitle: string) => {
    event.preventDefault();
    
    try {
      const data: MovieData = await searchMoviesAPI(movieTitle); // Fetch movie with streaming data
      console.log('Movie data retrieved:', data);
     
    } catch (error) {
      console.error('Error fetching movie data:', error);
    
    
    }
  };

export { searchMoviesAPI, searchForMovieByTitle };

import React, { useState, useEffect } from "react";
import { searchMoviesAPI } from "../api/searchAPI";
import { MovieData } from "../interfaces/movie.interface";
import MovieCard from "../../src/components/movieCard";

// List of popular movies to randomly select from
const popularMovies = [
  "The Shawshank Redemption",
  "The Godfather",
  "Pulp Fiction",
  "The Dark Knight",
  "Forrest Gump",
  "Inception",
  "The Matrix",
  "Goodfellas",
  "The Silence of the Lambs",
  "Star Wars",
  "Jurassic Park",
  "The Lion King",
  "Titanic",
  "Avatar",
  "The Avengers",
  "Fight Club",
  "Gladiator",
  "The Lord of the Rings",
  "Interstellar",
  "Back to the Future"
];

const MovieSearch: React.FC = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [searchedMovie, setSearchedMovie] = useState<MovieData | null>(null);
  const [randomMovies, setRandomMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to add movie to already seen list
  const addToMoviesAlreadySeen = async (movie: MovieData): Promise<void> => {
    // Implement the logic to add the movie to the already seen list
    console.log(`Added to already seen: ${movie.title}`);
  };

  // Function to add movie to watchlist
  const addToWatchlist = async (movie: MovieData): Promise<void> => {
    // Implement the logic to add the movie to the watchlist
    console.log(`Added to watchlist: ${movie.title}`);
  };

  // Function to get random movies
  const fetchRandomMovies = async () => {
    setLoading(true);
    setError(null);
    
    // Shuffle array and take first 5
    const shuffled = [...popularMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    try {
      const moviePromises = selected.map(title => searchMoviesAPI(title));
      const movies = await Promise.all(moviePromises);
      setRandomMovies(movies);
    } catch (err) {
      setError("Failed to fetch random movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch random movies on component mount
  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await searchMoviesAPI(movieTitle);
      setSearchedMovie(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movie data");
      setSearchedMovie(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Enter movie title..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !movieTitle.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Search Result */}
      {searchedMovie && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Result</h2>
          <div className="flex justify-center">
            <MovieCard 
              movie={searchedMovie}
              addToWatchlist={addToWatchlist}
              addToMoviesAlreadySeen={addToMoviesAlreadySeen}
            />
          </div>
        </div>
      )}

      {/* Random Movies */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Discover Movies</h2>
          <button
            onClick={fetchRandomMovies}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Refresh Movies
          </button>
        </div>
        
        {loading && !searchedMovie ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {randomMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToWatchlist={addToWatchlist}
                addToMoviesAlreadySeen={addToMoviesAlreadySeen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
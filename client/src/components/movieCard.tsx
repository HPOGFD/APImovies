import React from "react";
import { MovieData } from "../interfaces/movie.interface";
import { Calendar, Film, Info, Users, Plus, Check } from "lucide-react";

interface MovieCardProps {
  movie: MovieData;
  addToWatchlist: (movie: MovieData) => Promise<void>;
  addToMoviesAlreadySeen: (movie: MovieData) => Promise<void>;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  addToWatchlist, 
  addToMoviesAlreadySeen 
}) => {
  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(movie);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    }
  };

  const handleAddToSeen = async () => {
    try {
      await addToMoviesAlreadySeen(movie);
    } catch (error) {
      console.error('Failed to add to seen list:', error);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Poster Section */}
      <div className="relative">
        {movie.poster && (
          <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
            <img
              src={movie.poster}
              alt={`${movie.title} Poster`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Title Section */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {movie.title}
          </h3>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="p-4 pt-0 space-y-4">
        {/* Actors */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-2">{movie.actors}</span>
        </div>

        {/* Genre */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Film className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{movie.genre}</span>
        </div>

        {/* Release Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>{movie.releaseDate}</span>
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Info className="h-4 w-4 mt-1 flex-shrink-0" />
          <p className="line-clamp-3">{movie.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={handleAddToWatchlist}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Add to Watchlist
          </button>
          
          <button
            onClick={handleAddToSeen}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            <Check className="h-4 w-4" />
            Already Seen
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
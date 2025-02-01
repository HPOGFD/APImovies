import React from "react";
import { MovieData } from "../interfaces/movie.interface";
import { Calendar, Film, Info, Users, Plus, Check } from "lucide-react";
import "../css/movieCard-css.css"

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

<div className="movie-cards-container">
  {/* Column 1 */}
  <div className="column">
    <div className="card">
      {/* Poster Section */}
      <div className="poster-section">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={`${movie.title} Poster`}
            className="poster-image"
          />
        ) : (
          <div className="poster-fallback">No Image Available</div>
        )}
      </div>

      {/* Content Container */}
      <div className="details-section">
        {/* Title Section */}
        <div className="title-section">
          <div>
            <h3>{movie.title}</h3>
          </div>
        </div>

        {/* Movie Details Section */}
        <div>
          {/* Actors */}
          <div>
            <Users />
            <span>{movie.actors}</span>
          </div>

          {/* Genre */}
          <div>
            <Film />
            <span>{movie.genre}</span>
          </div>

          {/* Release Date */}
          <div>
            <Calendar />
            <span>{movie.releaseDate}</span>
          </div>

          {/* Description */}
          <div>
            <Info />
            <p>{movie.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <div>
            <button onClick={handleAddToWatchlist}>
              <Plus />
              Add to Watchlist
            </button>
            
            <button onClick={handleAddToSeen}>
              <Check />
              Already Seen
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Add more cards to this column */}
  </div>

  {/* Column 2 */}
  <div className="column">
    {/* Add cards here */}
  </div>

  {/* Column 3 */}
  <div className="column">
    {/* Add cards here */}
  </div>
</div>
);
};

export default MovieCard;
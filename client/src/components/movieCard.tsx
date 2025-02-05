import React from "react";
import { MovieData } from "../interfaces/movie.interface";
import { Calendar, Film, Info, Users, Plus, Check } from "lucide-react";
import "../css/movieCard-css.css";

interface MovieCardProps {
  movie: MovieData;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const addToLocalStorage = (key: string, movie: MovieData) => {
    const existingList = JSON.parse(localStorage.getItem(key) || "[]");

    const isDuplicate = existingList.some((item: MovieData) => item.id === movie.id);
    if (isDuplicate) {
      alert(`"${movie.title}" is already in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}!`);
      return;
    }

    existingList.push(movie);
    localStorage.setItem(key, JSON.stringify(existingList));
    alert(`"${movie.title}" added to ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}!`);
  };

  const handleAddToWatchlist = () => addToLocalStorage("watchlist", movie);
  const handleAddToSeen = () => addToLocalStorage("moviesAlreadySeen", movie);

  return (
    <div className="movie-cards-container">
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
            <div className="title-section">
              <h3>{movie.title}</h3>
            </div>

            <div>
              <div>
                <Users />
                <span>{movie.actors || "N/A"}</span>
              </div>

              <div>
                <Film />
                <span>{movie.genre || "N/A"}</span>
              </div>

              <div>
                <Calendar />
                <span>{movie.releaseDate || "N/A"}</span>
              </div>

              <div>
                <Info />
                <p>{movie.description || "No description available."}</p>
              </div>
            </div>

            {/* Action Buttons */}
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
    </div>
  );
};

export default MovieCard;

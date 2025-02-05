import React, { useEffect, useState } from "react";
import { MovieData } from "../interfaces/movie.interface"; // Assuming this exists

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<MovieData[]>([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  return (
    <div>
      <h1>My Watchlist</h1>
      <p>Here are the movies you've added to your watchlist:</p>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Start adding movies!</p>
      ) : (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>{movie.releaseDate}</p>
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  style={{ width: "150px", height: "auto" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;

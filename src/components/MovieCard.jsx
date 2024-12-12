import React from "react";
import { Link } from "react-router-dom";
import "../css/movieCard.css";
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
  addMovieToWatchlater,
  removeMovieFromWatchlater,
} from "../firebaseFunctions";

const MovieCard = ({
  movie,
  onMouseEnter,
  onMouseLeave,
  favorites = [],
  watchlater = [],
  setFavorites,
  setWatchlater,
  videos = {},
}) => {
  if (!movie || !movie.id || !movie.poster_path) {
    console.error("Invalid movie data passed to MovieCard.");
    return null;
  }

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const isWatchLater = watchlater.some((later) => later.id === movie.id);

  const handleAddToFavorites = async () => {
    await addMovieToFavorites(movie);
    setFavorites((prev) => [...prev, movie]);
  };

  const handleRemoveFromFavorites = async () => {
    await removeMovieFromFavorites(movie);
    setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
  };

  const handleAddToWatchLater = async () => {
    await addMovieToWatchlater(movie);
    setWatchlater((prev) => [...prev, movie]);
  };

  const handleRemoveFromWatchLater = async () => {
    await removeMovieFromWatchlater(movie);
    setWatchlater((prev) => prev.filter((later) => later.id !== movie.id));
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={(event) => onMouseEnter && onMouseEnter(movie, event)}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to="/watch-trailer"
        state={{
          videoId: videos[movie.id]?.[0]?.key || null,
          movieTitle: movie.title,
        }}
      >
        <div className="image-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
      </Link>
      <div className="hover-actions">
        {!isFavorite ? (
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        ) : (
          <button onClick={handleRemoveFromFavorites}>
            Remove from Favorites
          </button>
        )}
        {!isWatchLater ? (
          <button onClick={handleAddToWatchLater}>Add to Watch Later</button>
        ) : (
          <button onClick={handleRemoveFromWatchLater}>
            Remove from Watch Later
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/moviecard.css";
import MovieDialog from "./MovieDialog"; // Importing MovieDialog

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
  const [openDialog, setOpenDialog] = useState(false);

  if (!movie || !movie.id || !movie.poster_path) {
    console.error("Invalid movie data passed to MovieCard.");
    return null;
  }

  const handleMouseEnter = (event) => {
    onMouseEnter && onMouseEnter(movie, event);
    setOpenDialog(true);
  };

  const handleMouseLeave = () => {
    onMouseLeave && onMouseLeave();
    setOpenDialog(false);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <MovieDialog
        selectedMovie={movie}
        openDialog={openDialog}
        handleMouseLeave={handleMouseLeave}
        favorites={favorites}
        watchlater={watchlater}
        setFavorites={setFavorites}
        setWatchlater={setWatchlater}
      />
    </div>
  );
};

export default MovieCard;
